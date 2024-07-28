import { A_SDK_TYPES__DeepPartial } from '@adaas/a-sdk-types';
import { A_EXPRESS_TYPES__ControllerConfig, A_EXPRESS_TYPES__IController, A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
export declare class A_EXPRESS_Controller implements A_EXPRESS_TYPES__IController {
    logAlias: string;
    protected CUSTOM_CONFIG: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ControllerConfig>;
    protected _compiledConfig?: A_EXPRESS_TYPES__ControllerConfig;
    protected _constructorConfig?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ControllerConfig>;
    constructor(config?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ControllerConfig>);
    get config(): A_EXPRESS_TYPES__ControllerConfig;
    get(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    post(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    put(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    delete(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    list(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
}
