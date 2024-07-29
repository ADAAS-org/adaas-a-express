import { A_SDK_ApiCredentials, A_SDK_App, A_SDK_User } from '@adaas/a-sdk';
import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_AUTH_ServerCommands, A_AUTH_Context, A_AUTH_ServerDelegateAuthenticator } from '@adaas/a-auth'
import { A_SDK_CONSTANTS__ERROR_CODES, A_SDK_ServerError } from '@adaas/a-sdk-types';
import { A_EXPRESS_TYPES__APP_INTERACTIONS_IRequest, A_EXPRESS_TYPES__APP_INTERACTIONS_IRequestParams } from '../types/A_EXPRESS_AppInteractionsController.types';
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from '../constants/errors.constants';
import { A_EXPRESS_TYPES__SERVER_COMMANDS_IRequest, A_EXPRESS_TYPES__SERVER_COMMANDS_IRequestParams } from '../types/A_EXPRESS_ServerCommandsController.types';
import { A_EXPRESS_TYPES__SERVER_DELEGATE_IRequest } from '../types/A_EXPRESS_ServerDelegateController.types';

export class A_EXPRESS_AuthMiddleware {

    static async validateToken(
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
    ) {

        if (!req.headers.authorization)
            return next(req.adaas.context.Errors.getError(A_SDK_CONSTANTS__ERROR_CODES.TOKEN_NOT_PROVIDED))

        try {
            const [bearer, receivedToken] = req.headers.authorization.split(' ');

            /**
             * This method should return details about the ADAAS Auth in case when APP credentials are not provided
             * Otherwise, it returns nothings
             */
            await A_AUTH_ServerCommands.Token.verify({
                token: receivedToken
            });


            return next();
        }
        catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }



    static async AppInteractions_ValidateToken(
        req: A_EXPRESS_TYPES__APP_INTERACTIONS_IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
    ) {

        if (!req.headers.authorization)
            return next(req.adaas.context.Errors.getError(A_SDK_CONSTANTS__ERROR_CODES.TOKEN_NOT_PROVIDED))

        try {
            const [bearer, receivedToken] = req.headers.authorization.split(' ');

            /**
             * This method should return details about the ADAAS Auth in case when APP credentials are not provided
             * Otherwise, it returns nothings
             */
            const {
                user,
                app,
                scope,
                roles
            } = await A_AUTH_ServerCommands.Token.verify({
                token: receivedToken
            });

            if (!user)
                return next(req.adaas.context.Errors.getError(A_EXPRESS_CONSTANTS__ERROR_CODES.INVALID_TOKEN_TYPE_FOR_APP_INTERACTION))

            req.adaas.user = new A_SDK_User(user);

            /**
             * In case when API Credentials are used the APP is will be in request as well as roles
             * 
             */

            req.adaas.scope = scope;
            req.adaas.roles = roles;


            return next();
        }
        catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }



    static async ServerCommands_ValidateToken(
        req: A_EXPRESS_TYPES__SERVER_COMMANDS_IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
    ) {

        if (!req.headers.authorization)
            return next(req.adaas.context.Errors.getError(A_SDK_CONSTANTS__ERROR_CODES.TOKEN_NOT_PROVIDED))

        try {
            const [bearer, receivedToken] = req.headers.authorization.split(' ');

            /**
             * This method should return details about the ADAAS Auth in case when APP credentials are not provided
             * Otherwise, it returns nothings
             */
            const {
                api,
                app,
                scope,
                roles
            } = await A_AUTH_ServerCommands.Token.verify({
                token: receivedToken
            });

            if (!app || !api)
                return next(req.adaas.context.Errors.getError(A_EXPRESS_CONSTANTS__ERROR_CODES.INVALID_TOKEN_TYPE_FOR_SERVER_COMMANDS))

            req.adaas.app = new A_SDK_App(app);
            req.adaas.api = new A_SDK_ApiCredentials(api);
            req.adaas.scope = scope;
            req.adaas.roles = roles;


            return next();
        }
        catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }





    static async ServerDelegate_ValidateToken(
        req: A_EXPRESS_TYPES__SERVER_DELEGATE_IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
    ) {

        if (!req.headers.authorization)
            return next(req.adaas.context.Errors.getError(A_SDK_CONSTANTS__ERROR_CODES.TOKEN_NOT_PROVIDED))

        try {
            const [bearer, receivedToken] = req.headers.authorization.split(' ');

            /**
             * This method should return details about the ADAAS Auth in case when APP credentials are not provided
             * Otherwise, it returns nothings
             */
            const {
                api,
                app,
                user,
                scope,
                roles
            } = await A_AUTH_ServerCommands.Token.verify({
                token: receivedToken
            });

            if (!app || !api || !user)
                return next(req.adaas.context.Errors.getError(A_EXPRESS_CONSTANTS__ERROR_CODES.INVALID_TOKEN_TYPE_FOR_SERVER_DELEGATE))

            req.adaas.app = new A_SDK_App(app);
            req.adaas.api = new A_SDK_ApiCredentials(api);
            req.adaas.user = new A_SDK_User(user);
            req.adaas.scope = scope;
            req.adaas.roles = roles;

            req.adaas.authenticator = A_AUTH_Context.getAuthenticator(
                user,
                scope
            ) as A_AUTH_ServerDelegateAuthenticator;


            return next();
        }
        catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }
}