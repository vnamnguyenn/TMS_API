import * as dotenv from 'dotenv';
import {NextFunction, Request, Response} from 'express';
import {auth, claimCheck, InsufficientScopeError,AuthResult} from 'express-oauth2-jwt-bearer';

dotenv.config();
export const validAccessToken = auth({
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
    audience: process.env.AUTH0_AUDIENCE,
});

export const checkRequiredPermissions = (requiredPermissions: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const permissionCheck = claimCheck((payload) => {
            const permissions = payload.permissions as string[];
            const hasPermissions = requiredPermissions.every((requiredPermission) =>
                permissions.includes(requiredPermission),
            );
            if (!hasPermissions) {
                throw new InsufficientScopeError();
            }
            return hasPermissions;
        });
        permissionCheck(req, res, next);
    };
};
export const checkRequiredRoles = (requiredRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const roleCheck = claimCheck((payload) => {
            let hasRoles: boolean = false;
            (payload?.user_roles as string[])?.map(role => {
                    hasRoles = requiredRoles.includes(role.toLowerCase());
                },
            );

            if (!hasRoles) {
                throw new InsufficientScopeError();
            }
            return hasRoles;
        });
        roleCheck(req, res, next);
    };
};

