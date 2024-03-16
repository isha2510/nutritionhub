import { Request, Response, NextFunction, Router } from 'express';
import recipes from '../../utils/recipeMock.json';

const router = Router();

type JWTPayload = {
    permissions: string[];
    [key: string]: string[];
};

router.get('/', hasRole('user'), (req: Request, res: Response) => {
    res.send(recipes);
});

router.get('/:id', hasRole('user'), (req: Request, res: Response) => {
    const id = req.params.id;
    // Add your logic to handle the recipe by id
});

router.delete('/:id', hasRole('admin'), (req: Request, res: Response) => {
    console.log('under delete recipe method');
});

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
            res.status(403).send(errRes);
        }
    }
}

export default router;