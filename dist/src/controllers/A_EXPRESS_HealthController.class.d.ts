import { A_EXPRESS_TYPES__HealthControllerConfig } from '../types/A_EXPRESS_HealthController.types';
import { A_EXPRESS_Controller } from '../global/A_EXPRESS_Controller.class';
import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_SDK_TYPES__DeepPartial, A_SDK_TYPES__Required } from '@adaas/a-sdk-types';
export declare class A_EXPRESS_HealthController extends A_EXPRESS_Controller {
    protected CUSTOM_CONFIG: Partial<A_EXPRESS_TYPES__HealthControllerConfig>;
    protected _compiledConfig?: A_EXPRESS_TYPES__HealthControllerConfig;
    constructor(config?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__HealthControllerConfig>);
    get config(): A_SDK_TYPES__Required<A_EXPRESS_TYPES__HealthControllerConfig, ['versionPath']>;
    get(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
}
