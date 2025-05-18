import { NextFunction, Request, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { JWTPayload } from '../types/JWTPayload';
import HttpStatus from 'http-status-codes';
import axios from "axios";
import MUser, { IUser, TUser } from '../model/User';
import MReceipe, { IRecipe, TRecipe } from '../model/Recipe';

// Token cache structure
interface TokenCacheEntry {
  user: IUser;
  expires: number; // Timestamp when this cache entry expires
}

// Cache for user info to reduce Auth0 API calls
const userCache = new Map<string, TokenCacheEntry>();

// Rate limiting state
let isRateLimited = false;
let rateLimitResetTime = 0;
let backoffTime = 1000; // Start with 1 second
const USER_CACHE_TTL = 15 * 60 * 1000; // Cache user info for 15 minutes

export interface CustomRequest extends Request {
    user?: IUser;
}

function jwtCheck() {
    return auth({
        audience: process.env.AUDIENCE,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        tokenSigningAlg: process.env.ALGORITHM
    });
};

// Original implementation of userCheck - populate user if token exists but don't block access
async function userCheck(req: CustomRequest, res: Response, next: NextFunction) {
    if (req.headers && req.headers.authorization) {
        try {
            const user = await getCachedUserInfo(req.headers.authorization);
            req.user = user;
            next();
        } catch (error) {
            console.error("Error authenticating user:", error);
            next();
        }
    } else {
        next();
    }
}

// New middleware that requires authentication - use this for protected routes
async function requireAuth(req: CustomRequest, res: Response, next: NextFunction) {
    if (req.headers && req.headers.authorization) {
        try {
            const user = await getCachedUserInfo(req.headers.authorization);
            req.user = user;
            next();
        } catch (error) {
            console.error("Error authenticating user:", error);
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Authentication failed" });
        }
    } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Authorization header missing" });
    }
}

// Function to get cached user info or fetch it if needed
async function getCachedUserInfo(accessToken: string): Promise<IUser> {
    // Extract token without "Bearer " prefix for cache key
    const tokenValue = accessToken.replace('Bearer ', '');
    
    // Check if we're currently rate limited
    if (isRateLimited) {
        const now = Date.now();
        if (now < rateLimitResetTime) {
            // We're still rate limited - check if we have a cached entry
            const cachedEntry = userCache.get(tokenValue);
            if (cachedEntry) {
                console.log(`Rate limited - using cached user info for ${backoffTime/1000}s more`);
                return cachedEntry.user;
            }
            throw new Error("Rate limited by Auth0 and no cached data available");
        } else {
            // Rate limit period has passed
            isRateLimited = false;
            // Reset backoff time after successfully coming out of rate limiting
            backoffTime = 1000;
        }
    }
    
    // Check if token is in the cache and not expired
    const cachedEntry = userCache.get(tokenValue);
    if (cachedEntry && Date.now() < cachedEntry.expires) {
        return cachedEntry.user;
    }
    
    // Not in cache or expired, fetch from Auth0
    try {
        const user = await getUserInfo(accessToken);
        
        // Cache the result
        userCache.set(tokenValue, {
            user,
            expires: Date.now() + USER_CACHE_TTL
        });
        
        return user;
    } catch (error: any) {
        // Handle rate limiting
        if (error.response && error.response.status === 429) {
            isRateLimited = true;
            
            // Get retry-after header or use exponential backoff
            const retryAfter = error.response.headers['retry-after'];
            const retryMs = retryAfter ? parseInt(retryAfter) * 1000 : backoffTime;
            
            // Set when we can retry
            rateLimitResetTime = Date.now() + retryMs;
            
            // Double the backoff time for next failure (exponential backoff)
            backoffTime = Math.min(backoffTime * 2, 60000); // Cap at 1 minute
            
            console.warn(`Auth0 rate limit hit. Backing off for ${retryMs/1000}s. Next backoff: ${backoffTime/1000}s`);
            
            // Check if we have a cached entry we can still use
            if (cachedEntry) {
                // Use the cached entry even if it's expired during rate limiting
                console.log("Using expired cache entry during rate limiting");
                return cachedEntry.user;
            }
            
            throw new Error("Rate limited by Auth0 and no cached data available");
        }
        
        // For other errors, just rethrow
        throw error;
    }
}

async function getUserInfo(accessToken: string): Promise<IUser> {
    try {
        const response = await axios.get(process.env.ISSUER_BASE_URL + 'userinfo', {
            headers: {
                Authorization: accessToken
            }
        });
        const authUser = response.data as TUser;
        if (authUser) {
            let user = await MUser.findOne({ email: authUser.email });
            if (!user) {
                user = await MUser.create(authUser);
            }
            return user;
        }
        throw new Error("User info not found in response");
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error; // Pass the original error to allow proper handling of rate limits
    }
}

function hasRole(...allowedRoles: string[]) {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const payload = req.auth!.payload as JWTPayload;
        const roles = payload['https://www.nutritionhub.com/roles'];
        console.log(roles);

        const isHavingRole = roles.some(role => allowedRoles.includes(role));
        if (isHavingRole) {
            next();
        } else {
            const errRes = { message: 'Insufficient Permission', allowedRoles: allowedRoles }
            res.status(HttpStatus.FORBIDDEN).send(errRes);
        }
    }
}

// Add a function to clear the cache if needed
function clearUserCache(): void {
    userCache.clear();
    console.log("User cache cleared");
}

export { jwtCheck, hasRole, userCheck, requireAuth, clearUserCache };