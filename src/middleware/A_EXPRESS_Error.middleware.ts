import { A_SDK_ServerError } from '@adaas/a-sdk-types';
import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';


export class A_EXPRESS_ErrorsMiddleware {

    static async handleError(
        error: A_SDK_ServerError,
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
    ) {
        const serverError = new A_SDK_ServerError(error);

        req.adaas.context.Logger.error(serverError);

        return res.status(serverError.serverCode).send(serverError);
    }
}