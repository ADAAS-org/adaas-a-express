import { A_EXPRESS_TYPES__IHealthControllerConfig } from '../types/A_EXPRESS_HealthController.types';
import { A_EXPRESS_App } from '../global/A_EXPRESS_App.class';
import { A_EXPRESS_TYPES__IController, A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
export declare class A_EXPRESS_HealthController implements A_EXPRESS_TYPES__IController {
    context: A_EXPRESS_App;
    config: A_EXPRESS_TYPES__IHealthControllerConfig;
    constructor(context: A_EXPRESS_App, config: A_EXPRESS_TYPES__IHealthControllerConfig);
    get(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
}
