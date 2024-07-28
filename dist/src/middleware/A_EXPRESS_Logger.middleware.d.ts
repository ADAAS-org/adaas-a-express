import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
export declare class A_EXPRESS_LoggerMiddleware {
    static logRequest(config: {
        ignore: Array<string>;
    }): (req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction) => Promise<void>;
}
