// types/environment.d.ts
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            AUDIENCE: string;
            MONGODB_URI: string;
            ALGORITHM: string;
            ISSUER_BASE_URL: string;
            // Add other variables as needed
        }
    }
}
export {};
