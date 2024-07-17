import { Response, NextFunction } from 'express';
import { A_EXPRESS_TYPES__IRequest } from '../types/A_EXPRESS_Controller.types';
export declare class A_EXPRESS_AuthMiddleware {
    static validateToken(req: A_EXPRESS_TYPES__IRequest, res: Response, next: NextFunction): Promise<void>;
}
