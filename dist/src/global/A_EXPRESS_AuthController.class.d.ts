import { Response, NextFunction } from 'express';
import { A_EXPRESS_TYPES__IRequest } from '../types/A_EXPRESS_Controller.types';
import { A_EXPRESS_Controller } from './A_EXPRESS_Controller.class';
import { A_AUTH_SERVER_COMMANDS_TYPES__GetUserAccessTokenRequest, A_AUTH_SERVER_COMMANDS_TYPES__RefreshTokenRequest, A_AUTH_SERVER_COMMANDS_TYPES__VerifyTokenRequest } from '@adaas/a-auth';
export declare class A_EXPRESS_AuthController extends A_EXPRESS_Controller {
    protected CONFIG_REDIRECT_URL: string;
    getSSOUrl(req: A_EXPRESS_TYPES__IRequest, res: Response, next: NextFunction): Promise<any>;
    getToken(req: A_EXPRESS_TYPES__IRequest<A_AUTH_SERVER_COMMANDS_TYPES__GetUserAccessTokenRequest>, res: Response, next: NextFunction): Promise<any>;
    verifyToken(req: A_EXPRESS_TYPES__IRequest<A_AUTH_SERVER_COMMANDS_TYPES__VerifyTokenRequest>, res: Response, next: NextFunction): Promise<any>;
    refreshToken(req: A_EXPRESS_TYPES__IRequest<A_AUTH_SERVER_COMMANDS_TYPES__RefreshTokenRequest>, res: Response, next: NextFunction): Promise<any>;
}
