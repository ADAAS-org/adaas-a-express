import { Response, NextFunction } from 'express';
import { A_EXPRESS_TYPES__IRequest } from '../types/A_EXPRESS_Controller.types';
import { A_EXPRESS_Controller } from './A_EXPRESS_Controller.class';
import { A_SDK_ServerError } from '@adaas/a-sdk-types';
import {
    A_AUTH_SERVER_COMMANDS_TYPES__GetUserAccessTokenRequest,
    A_AUTH_SERVER_COMMANDS_TYPES__RefreshTokenRequest,
    A_AUTH_SERVER_COMMANDS_TYPES__VerifyTokenRequest,
    A_AUTH_ServerCommands
} from '@adaas/a-auth';
import { A_EXPRESS_Post } from '../decorators/Route.decorator';


export class A_EXPRESS_AuthController extends A_EXPRESS_Controller {

    protected CONFIG_REDIRECT_URL!: string;


    @A_EXPRESS_Post({
        path: '/adaas/url',
        config: {
            identity: false,
            auth: false
        }
    })
    async getSSOUrl(
        req: A_EXPRESS_TYPES__IRequest,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const url = await A_AUTH_ServerCommands.SSO.getSignInUrl({
                redirectURL: this.CONFIG_REDIRECT_URL
            });

            return res.status(200).send(url)
        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }



    @A_EXPRESS_Post({
        path: '/token',
        config: {
            identity: false,
            auth: false
        }
    })
    async getToken(
        req: A_EXPRESS_TYPES__IRequest<A_AUTH_SERVER_COMMANDS_TYPES__GetUserAccessTokenRequest>,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const authData = await A_AUTH_ServerCommands.Token.getAccessToken({
                code: req.body.code
            });

            return res.status(200).send(authData)
        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }



    @A_EXPRESS_Post({
        path: '/token/verify',
        config: {
            identity: false,
            auth: false
        }
    })
    async verifyToken(
        req: A_EXPRESS_TYPES__IRequest<A_AUTH_SERVER_COMMANDS_TYPES__VerifyTokenRequest>,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            await A_AUTH_ServerCommands.Token.verify({
                token: req.body.token
            });

            return res.status(200).send({
                status: 'OK',
            })
        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }



    @A_EXPRESS_Post({
        path: '/token/refresh',
        config: {
            identity: false,
            auth: false
        }
    })
    async refreshToken(
        req: A_EXPRESS_TYPES__IRequest<A_AUTH_SERVER_COMMANDS_TYPES__RefreshTokenRequest>,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const authData = await A_AUTH_ServerCommands.Token.refresh({
                refreshToken: req.body.refreshToken
            });

            return res.status(200).send(authData)
        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }
}