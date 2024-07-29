import { A_EXPRESS_TYPES__HealthControllerConfig } from '../types/A_EXPRESS_HealthController.types';
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from '../constants/errors.constants';
import { A_EXPRESS_Controller } from '../global/A_EXPRESS_Controller.class';
import { A_EXPRESS_Get } from '../decorators/Methods.decorator';
import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_SDK_CommonHelper, A_SDK_TYPES__DeepPartial, A_SDK_TYPES__Required } from '@adaas/a-sdk-types';
import { A_EXPRESS_DEFAULTS__CONTROLLER_CONFIG } from '../defaults/A_EXPRESS_Controller.defaults';
import { A_EXPRESS_App } from '../global/A_EXPRESS_App.class';



export class A_EXPRESS_HealthController extends A_EXPRESS_Controller {

    protected CUSTOM_CONFIG: Partial<A_EXPRESS_TYPES__HealthControllerConfig> = {
    }


    protected _compiledConfig?: A_EXPRESS_TYPES__HealthControllerConfig


    constructor(
        context: A_EXPRESS_App,
        config?:
            A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__HealthControllerConfig>
    ) {
        super(context, config);
    }


    get config(): A_SDK_TYPES__Required<A_EXPRESS_TYPES__HealthControllerConfig, ['versionPath']> {
        if (!this._compiledConfig)
            this._compiledConfig = A_SDK_CommonHelper.deepMerge(
                A_SDK_CommonHelper.deepMerge(
                    {
                        ...A_EXPRESS_DEFAULTS__CONTROLLER_CONFIG
                    },
                    this._constructorConfig || {}
                ),
                this.CUSTOM_CONFIG
            );

        return this._compiledConfig;
    }


    @A_EXPRESS_Get({
        path: '/health',
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
            const packageJSON = await import(this.config.versionPath!);

            // then extract properties defined in config
            return res.status(200).send(
                this.config.exposedProperties?.reduce((acc, prop) => {
                    acc[prop] = packageJSON[prop];
                    return acc;
                }, {})
            )
        } catch (error) {
            return next(this.context.Errors.getError(A_EXPRESS_CONSTANTS__ERROR_CODES.INCORRECT_VERSION_PATH_FOR_HEALTH_CONTROLLER));
        }
    }

}