import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_SDK_CommonHelper, A_SDK_ServerError, A_SDK_TYPES__DeepPartial, A_SDK_TYPES__Required } from '@adaas/a-sdk-types';
import {
    A_AUTH_SERVER_COMMANDS_TYPES__GetUserAccessTokenRequest,
    A_AUTH_SERVER_COMMANDS_TYPES__RefreshTokenRequest,
    A_AUTH_SERVER_COMMANDS_TYPES__VerifyTokenRequest,
    A_AUTH_ServerCommands
} from '@adaas/a-auth';
import { A_EXPRESS_Post } from '../decorators/A_EXPRESS_Methods.decorator';
import { A_EXPRESS_TYPES__IAuthControllerConfig } from '../types/A_EXPRESS_AuthController.types';
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from '../constants/errors.constants';
import { A_EXPRESS_App } from '../global/A_EXPRESS_App.class';
import { A_EXPRESS_Controller } from '../decorators/A_EXPRESS_Controller.decorator';


@A_EXPRESS_Controller({
    http: {
        base: '/auth/sso'
    }
})
export class A_EXPRESS_AuthController {


    constructor(
        protected context: A_EXPRESS_App,
        protected config: A_EXPRESS_TYPES__IAuthControllerConfig
    ) { }


    @A_EXPRESS_Post({
        path: '/adaas/url',
        config: {
            identity: false,
            auth: false
        }
    })
    async getSSOUrl(
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
    ): Promise<any> {
        try {
            const url = await A_AUTH_ServerCommands.SSO.getSignInUrl({
                redirectURL: this.config.redirectUrl
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
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
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
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
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
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
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