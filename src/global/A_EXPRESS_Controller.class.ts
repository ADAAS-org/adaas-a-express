import { A_SDK_CommonHelper, A_SDK_CONSTANTS__ERROR_CODES, A_SDK_TYPES__DeepPartial } from '@adaas/a-sdk-types';
import { A_EXPRESS_TYPES__ControllerConfig, A_EXPRESS_TYPES__IController, A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_EXPRESS_DEFAULTS__CONTROLLER_CONFIG } from '../defaults/A_EXPRESS_Controller.defaults';
import { A_EXPRESS_App } from './A_EXPRESS_App.class';



export class A_EXPRESS_Controller implements A_EXPRESS_TYPES__IController {

    logAlias = "a-express@abstract-controller"
    context: A_EXPRESS_App

    protected CUSTOM_CONFIG: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ControllerConfig> = {}

    protected _compiledConfig?: A_EXPRESS_TYPES__ControllerConfig
    protected _constructorConfig?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ControllerConfig>


    constructor(
        context: A_EXPRESS_App,
        config?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ControllerConfig>
    ) {
        this._constructorConfig = config;
        this.context = context;
    }

    get config(): A_EXPRESS_TYPES__ControllerConfig {
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


    async get(
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
    ): Promise<any> {

        return next(this.context.Errors
            .getError(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED)
        );
    }

    async post(
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction): Promise<any> {

        return next(this.context.Errors
            .getError(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED)
        );
    }

    async put(
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction): Promise<any> {
        return next(this.context.Errors
            .getError(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED)
        );
    }


    async delete(
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction): Promise<any> {
        return next(this.context.Errors
            .getError(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED)
        );
    }

    async list(
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction): Promise<any> {
        return next(this.context.Errors
            .getError(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED)
        );
    }

}