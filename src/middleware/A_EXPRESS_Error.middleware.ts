import { NextFunction } from 'express';
import { A_EXPRESS_Context } from '../global/A_EXPRESS_Context.class';
import { A_SDK_ServerError } from '@adaas/a-sdk-types';
import { A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';


export class A_EXPRESS_ErrorsMiddleware {

    static async handleError(
        error: A_SDK_ServerError,
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: NextFunction
    ) {

        A_EXPRESS_Context.Logger.error(error);

        return res.status(error.serverCode || 500).send(error);
    }
}