import { NextFunction } from 'express';
import { A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
export declare class A_EXPRESS_AuthMiddleware {
    static validateToken(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: NextFunction): Promise<void>;
}
