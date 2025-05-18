import { Auth0Client } from '@auth0/auth0-spa-js';

// Auth0 configuration
const auth0Config = {
  domain: "dev-j8r4za1686l0mkr7.uk.auth0.com", // Get from env or config
  clientId: "CERpYJbACTex2vjYNRYmX85eRKmvpHXO", // Get from env or config
  audience: "https://www.nutritionhub.com", // Get from env or config
  scope: "openid profile email offline_access",
  useRefreshTokens: true,
  cacheLocation: "localstorage"
};

// Create a singleton instance of the Auth0 client
let auth0Client: Auth0Client | null = null;

// Token cache implementation
interface TokenCache {
  token: string;
  expiresAt: number; // timestamp when token expires
}

let tokenCache: TokenCache | null = null;
let tokenRefreshPromise: Promise<string> | null = null;
let lastRateLimitHit: number | null = null;
let retryAfterMs: number = 0;
const TOKEN_EXPIRY_BUFFER = 60 * 1000; // 1 minute buffer before expiration

/**
 * Returns an instance of the Auth0 client
 */
export const getAuth0Client = async (): Promise<Auth0Client> => {
  if (!auth0Client) {
    // Lazy-load Auth0 client to reduce initial bundle size
    const { Auth0Client } = await import('@auth0/auth0-spa-js');
    
    auth0Client = new Auth0Client({
      domain: auth0Config.domain,
      clientId: auth0Config.clientId,
      authorizationParams: {
        audience: auth0Config.audience,
        scope: auth0Config.scope,
      },
      useRefreshTokens: auth0Config.useRefreshTokens,
      cacheLocation: auth0Config.cacheLocation as 'localstorage' | 'memory',
    });
    
    // Check if we're already authenticated
    const isAuthenticated = await auth0Client.isAuthenticated();
    
    if (!isAuthenticated) {
      // We won't auto-login the user, just return the client
      console.log("User not authenticated with Auth0");
    }
  }
  
  return auth0Client;
};

/**
 * Gets a cached token or retrieves a fresh one if needed
 * Implements caching, throttling and rate limit handling
 */
export const getAccessToken = async (): Promise<string | null> => {
  const now = Date.now();
  
  // Check for rate limiting - back off if we recently hit rate limits
  if (lastRateLimitHit && now < lastRateLimitHit + retryAfterMs) {
    console.log(`Auth0 rate limited. Waiting for ${Math.ceil((lastRateLimitHit + retryAfterMs - now)/1000)}s`);
    return tokenCache?.token || null;
  }
  
  // Use cached token if it's still valid
  if (tokenCache && now < tokenCache.expiresAt - TOKEN_EXPIRY_BUFFER) {
    return tokenCache.token;
  }
  
  // If a token refresh is already in progress, wait for it instead of making duplicate calls
  if (tokenRefreshPromise) {
    try {
      return await tokenRefreshPromise;
    } catch (error) {
      console.error("Error while waiting for token refresh:", error);
      return null;
    }
  }
  
  // Otherwise, refresh the token
  tokenRefreshPromise = refreshToken();
  try {
    const token = await tokenRefreshPromise;
    return token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  } finally {
    tokenRefreshPromise = null;
  }
};

/**
 * Refresh the token and update the cache
 * Handles rate limiting with exponential backoff
 */
const refreshToken = async (): Promise<string> => {
  try {
    const auth0 = await getAuth0Client();
    
    if (!(await auth0.isAuthenticated())) {
      throw new Error("User not authenticated");
    }
    
         const token = await auth0.getTokenSilently({
       cacheMode: 'off' // Force a fresh token
     });
    
    // Parse token to get expiration time
    const payload = parseJwt(token);
    const expiresAt = payload.exp * 1000; // convert from seconds to milliseconds
    
    // Update cache
    tokenCache = {
      token,
      expiresAt
    };
    
    // Reset rate limiting state
    lastRateLimitHit = null;
    retryAfterMs = 0;
    
    return token;
  } catch (error: any) {
    // Handle rate limiting errors
    if (error.error === 'access_denied' && error.error_description === 'Too Many Requests') {
      lastRateLimitHit = Date.now();
      
      // Get retry after value or use exponential backoff
      const retryAfter = error.response?.headers?.['retry-after'];
      retryAfterMs = retryAfter ? parseInt(retryAfter) * 1000 : (retryAfterMs || 1000) * 2;
      
      console.warn(`Auth0 rate limit hit. Backing off for ${retryAfterMs/1000}s`);
    }
    
    throw error;
  }
};

/**
 * Parse JWT token to get payload
 */
const parseJwt = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
  } catch (e) {
    return { exp: 0 }; // Default expiry
  }
};

/**
 * Explicitly clear the token cache, useful for logout or error cases
 */
export const clearTokenCache = (): void => {
  tokenCache = null;
}; 