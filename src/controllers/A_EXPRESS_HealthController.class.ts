import { A_EXPRESS_TYPES__HealthControllerConfig } from '../types/A_EXPRESS_HealthController.types';
import { A_EXPRESS_Context } from '../global/A_EXPRESS_Context.class';
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from '../constants/errors.constants';
import { A_EXPRESS_Controller } from '../global/A_EXPRESS_Controller.class';
import { A_EXPRESS_Get } from '../decorators/Route.decorator';
import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_SDK_TYPES__DeepPartial, A_SDK_TYPES__Required } from '@adaas/a-sdk-types';



export class A_EXPRESS_HealthController extends A_EXPRESS_Controller {

    config!: Partial<A_EXPRESS_TYPES__HealthControllerConfig>

    Config!: A_EXPRESS_TYPES__HealthControllerConfig;


    constructor(config?:
        A_SDK_TYPES__Required<A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__HealthControllerConfig>, ['versionPath']>
    ) {
        super(config);

        if (!this.Config.versionPath) {
            return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.INCORRECT_VERSION_PATH_FOR_HEALTH_CONTROLLER);
        }
    }

    @A_EXPRESS_Get({
        path: '/',
        config: {
            auth: false,
            identity: false
        }
    })
    async get(
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
    ): Promise<any> {
        try {
            const version = await import(this.config.versionPath!);

            return res.status(200).send(version)
        } catch (error) {
            return next(A_EXPRESS_Context.Errors.getError(A_EXPRESS_CONSTANTS__ERROR_CODES.INCORRECT_VERSION_PATH_FOR_HEALTH_CONTROLLER));
        }
    }

}