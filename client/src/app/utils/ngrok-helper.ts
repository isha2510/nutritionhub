/**
 * NgrokHelper - Utility for configuring ngrok URLs at runtime
 */

// This will store the ngrok URL if set
let ngrokApiUrl: string | null = null;

/**
 * Set the ngrok URL for API calls
 * @param url The full ngrok URL (e.g., "https://a1b2c3d4.ngrok.io")
 */
export const setNgrokUrl = (url: string): void => {
  // Ensure URL ends with /api
  if (!url.endsWith('/api')) {
    url = url.endsWith('/') ? `${url}api` : `${url}/api`;
  }
  ngrokApiUrl = url;
  console.log(`API URL set to: ${ngrokApiUrl}`);
};

/**
 * Get the current API base URL 
 * Uses ngrok URL if set, otherwise falls back to default URL logic
 */
export const getApiBaseUrl = (): string => {
  if (ngrokApiUrl) {
    return ngrokApiUrl;
  }
  
  // Default URL logic
  return window.location.origin.includes("netlify")
    ? "https://nutritionhub-api.netlify.app/api"
    : "http://localhost:3001/api";
};

// Add a global method for easy console access
declare global {
  interface Window {
    setNgrokUrl: (url: string) => void;
  }
}

// Expose the method to the global scope for easy access in browser console
if (typeof window !== 'undefined') {
  window.setNgrokUrl = setNgrokUrl;
} 