
import { NextFunction, Request, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { JWTPayload } from '../types/JWTPayload';
import HttpStatus from 'http-status-codes';
import axios from "axios";
import MUser, { TUser } from '../model/User';
import MReceipe, { IRecipe, TRecipe } from '../model/Recipe';

interface CustomRequest extends Request {
    user?: TUser;
}

function jwtCheck() {
    return auth({
        audience: process.env.AUDIENCE,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        tokenSigningAlg: process.env.ALGORITHM
    });
};

async function userCheck(req: CustomRequest, res: Response, next: NextFunction) {
    if (req.headers && req.headers.authorization) {
        const user = await getUserInfo(req.headers.authorization);
        req.user = user;
        next();
    } else {
        next();
    }
}

async function getUserInfo(accessToken: string): Promise<TUser> {

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
    throw new Error("user is null");
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


export { jwtCheck, hasRole, userCheck };