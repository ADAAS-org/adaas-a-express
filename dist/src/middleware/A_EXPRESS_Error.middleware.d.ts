import { NextFunction } from 'express';
import { A_SDK_ServerError } from '@adaas/a-sdk-types';
import { A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
export declare class A_EXPRESS_ErrorsMiddleware {
    static handleError(error: A_SDK_ServerError, req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: NextFunction): Promise<A_EXPRESS_TYPES__IResponse<any>>;
}
