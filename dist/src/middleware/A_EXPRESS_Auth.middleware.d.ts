import { NextFunction } from 'express';
import { A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_EXPRESS_TYPES__APP_INTERACTIONS_IRequest } from '../types/A_EXPRESS_AppInteractionsController.types';
import { A_EXPRESS_TYPES__SERVER_COMMANDS_IRequest } from '../types/A_EXPRESS_ServerCommandsController.types';
import { A_EXPRESS_TYPES__SERVER_DELEGATE_IRequest } from '../types/A_EXPRESS_ServerDelegateController.types';
export declare class A_EXPRESS_AuthMiddleware {
    static validateToken(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: NextFunction): Promise<void>;
    static AppInteractions_ValidateToken(req: A_EXPRESS_TYPES__APP_INTERACTIONS_IRequest, res: A_EXPRESS_TYPES__IResponse, next: NextFunction): Promise<void>;
    static ServerCommands_ValidateToken(req: A_EXPRESS_TYPES__SERVER_COMMANDS_IRequest, res: A_EXPRESS_TYPES__IResponse, next: NextFunction): Promise<void>;
    static ServerDelegate_ValidateToken(req: A_EXPRESS_TYPES__SERVER_DELEGATE_IRequest, res: A_EXPRESS_TYPES__IResponse, next: NextFunction): Promise<void>;
}
