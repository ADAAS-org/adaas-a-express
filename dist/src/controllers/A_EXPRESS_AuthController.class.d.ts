import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_AUTH_SERVER_COMMANDS_TYPES__GetUserAccessTokenRequest, A_AUTH_SERVER_COMMANDS_TYPES__RefreshTokenRequest, A_AUTH_SERVER_COMMANDS_TYPES__VerifyTokenRequest } from '@adaas/a-auth';
import { A_EXPRESS_TYPES__IAuthControllerConfig } from '../types/A_EXPRESS_AuthController.types';
import { A_EXPRESS_App } from '../global/A_EXPRESS_App.class';
export declare class A_EXPRESS_AuthController {
    protected context: A_EXPRESS_App;
    protected config: A_EXPRESS_TYPES__IAuthControllerConfig;
    constructor(context: A_EXPRESS_App, config: A_EXPRESS_TYPES__IAuthControllerConfig);
    getSSOUrl(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    getToken(req: A_EXPRESS_TYPES__IRequest<A_AUTH_SERVER_COMMANDS_TYPES__GetUserAccessTokenRequest>, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    verifyToken(req: A_EXPRESS_TYPES__IRequest<A_AUTH_SERVER_COMMANDS_TYPES__VerifyTokenRequest>, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    refreshToken(req: A_EXPRESS_TYPES__IRequest<A_AUTH_SERVER_COMMANDS_TYPES__RefreshTokenRequest>, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
}
