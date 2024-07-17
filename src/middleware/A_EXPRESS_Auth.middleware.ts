import { A_SDK_App, A_SDK_User } from '@adaas/a-sdk';
import { Response, NextFunction } from 'express';
import { A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_AUTH_Authenticator, A_AUTH_ServerCommands } from '@adaas/a-auth'
import { A_EXPRESS_Context } from '../global/A_EXPRESS_Context.class';
import { A_SDK_CONSTANTS__ERROR_CODES, A_SDK_ServerError } from '@adaas/a-sdk-types';

export class A_EXPRESS_AuthMiddleware {

    static async validateToken(
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: NextFunction
    ) {

        if (!req.headers.authorization)
            return next(A_EXPRESS_Context.Errors.getError(A_SDK_CONSTANTS__ERROR_CODES.TOKEN_NOT_PROVIDED))

        try {
            const [bearer, receivedToken] = req.headers.authorization.split(' ');

            /**
             * This method should return details about the ADAAS Auth in case when APP credentials are not provided
             * Otherwise, it returns nothings
             */
            const { user, app, scope, roles } = await A_AUTH_ServerCommands.Token.verify({
                token: receivedToken
            });

            if (user)
                req.adaas.user = new A_SDK_User(user);

            /**
             * In case when API Credentials are used the APP is will be in request as well as roles
             * 
             */
            if (app)
                req.adaas.app = new A_SDK_App(app);
            if (scope)
                req.adaas.scope = scope;
            if (roles)
                req.adaas.roles = roles;


            return next();
        }
        catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }
}