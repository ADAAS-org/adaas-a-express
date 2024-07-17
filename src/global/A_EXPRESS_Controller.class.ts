import { Response, NextFunction } from 'express';
import { A_SDK_CONSTANTS__ERROR_CODES } from '@adaas/a-sdk-types';
import { A_EXPRESS_TYPES__IController, A_EXPRESS_TYPES__IRequest } from '../types/A_EXPRESS_Controller.types';
import { A_EXPRESS_Context } from './A_EXPRESS_Context.class';



export class A_EXPRESS_Controller implements A_EXPRESS_TYPES__IController {

    logAlias = "a-express@abstract-controller"

    constructor() {
    }


    async get(req: A_EXPRESS_TYPES__IRequest<any, any>, res: Response, next: NextFunction): Promise<any> {

        return next(A_EXPRESS_Context.Errors
            .getError(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED)
        );
    }

    async post(req: A_EXPRESS_TYPES__IRequest<any, any>, res: Response, next: NextFunction): Promise<any> {

        return next(A_EXPRESS_Context.Errors
            .getError(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED)
        );
    }

    async put(req: A_EXPRESS_TYPES__IRequest<any, any>, res: Response, next: NextFunction): Promise<any> {
        return next(A_EXPRESS_Context.Errors
            .getError(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED)
        );
    }


    async delete(req: A_EXPRESS_TYPES__IRequest<any, any>, res: Response, next: NextFunction): Promise<any> {
        return next(A_EXPRESS_Context.Errors
            .getError(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED)
        );
    }

    async list(req: A_EXPRESS_TYPES__IRequest<any, any>, res: Response, next: NextFunction): Promise<any> {
        return next(A_EXPRESS_Context.Errors
            .getError(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED)
        );
    }

}