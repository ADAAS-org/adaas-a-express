import { A_SDK_TYPES__DeepPartial } from '@adaas/a-sdk-types';
import { A_EXPRESS_TYPES__ControllerConfig, A_EXPRESS_TYPES__IController, A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_EXPRESS_App } from './A_EXPRESS_App.class';
export declare class A_EXPRESS_Controller implements A_EXPRESS_TYPES__IController {
    logAlias: string;
    context: A_EXPRESS_App;
    protected CUSTOM_CONFIG: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ControllerConfig>;
    protected _compiledConfig?: A_EXPRESS_TYPES__ControllerConfig;
    protected _constructorConfig?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ControllerConfig>;
    constructor(context: A_EXPRESS_App, config?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ControllerConfig>);
    get config(): A_EXPRESS_TYPES__ControllerConfig;
    get(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    post(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    put(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    delete(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    list(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
}
