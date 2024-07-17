import { Request, Response, NextFunction } from 'express';
import { A_SDK_ServerError } from '@adaas/a-sdk-types';
export declare class A_EXPRESS_ErrorsMiddleware {
    static handleError(error: A_SDK_ServerError, req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
