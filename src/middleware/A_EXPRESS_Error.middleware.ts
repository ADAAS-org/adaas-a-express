import { A_SDK_ServerError } from '@adaas/a-sdk';
import { Request, Response, NextFunction } from 'express';
import { A_EXPRESS_Context } from '../global/A_EXPRESS_Context.class';


export class ErrorsMiddleware {

    static async handleError(error: A_SDK_ServerError, req: Request, res: Response, next: NextFunction) {

        A_EXPRESS_Context.Logger.error(error);

        return res.status(error.serverCode || 500).send(error);
    }
}