import { NextFunction } from 'express';
import { A_EXPRESS_TYPES__HealthControllerConfig } from '../types/A_EXPRESS_HealthRouter.types';
import { A_EXPRESS_Controller } from './A_EXPRESS_Controller.class';
import { A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
export declare class A_EXPRESS_HealthController extends A_EXPRESS_Controller {
    config: A_EXPRESS_TYPES__HealthControllerConfig;
    constructor(config: A_EXPRESS_TYPES__HealthControllerConfig);
    get(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: NextFunction): Promise<any>;
}
