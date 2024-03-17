
import { NextFunction, Request, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { JWTPayload } from '../types/JWTPayload';
import HttpStatus from 'http-status-codes';

function jwtCheck() {
    return auth({
        audience: process.env.AUDIENCE,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        tokenSigningAlg: process.env.ALGORITHM
    });
};

function hasRole(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const payload = req.auth!.payload as JWTPayload;
        console.log(payload.permissions);
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


export { jwtCheck, hasRole };