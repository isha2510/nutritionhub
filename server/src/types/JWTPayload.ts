export type JWTPayload = {
    permissions: string[];
    [key: string]: string[];
};