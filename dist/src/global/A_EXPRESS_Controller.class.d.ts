import { Response, NextFunction } from 'express';
import { A_SDK_TYPES__DeepPartial } from '@adaas/a-sdk-types';
import { A_EXPRESS_TYPES__ControllerConfig, A_EXPRESS_TYPES__IController, A_EXPRESS_TYPES__IRequest } from '../types/A_EXPRESS_Controller.types';
export declare class A_EXPRESS_Controller implements A_EXPRESS_TYPES__IController {
    logAlias: string;
    config: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ControllerConfig>;
    compiledConfig: A_EXPRESS_TYPES__ControllerConfig;
    constructor(config?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ControllerConfig>);
    get(req: A_EXPRESS_TYPES__IRequest, res: Response, next: NextFunction): Promise<any>;
    post(req: A_EXPRESS_TYPES__IRequest, res: Response, next: NextFunction): Promise<any>;
    put(req: A_EXPRESS_TYPES__IRequest, res: Response, next: NextFunction): Promise<any>;
    delete(req: A_EXPRESS_TYPES__IRequest, res: Response, next: NextFunction): Promise<any>;
    list(req: A_EXPRESS_TYPES__IRequest, res: Response, next: NextFunction): Promise<any>;
}
