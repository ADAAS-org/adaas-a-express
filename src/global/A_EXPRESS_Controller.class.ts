import { A_SDK_CommonHelper, A_SDK_CONSTANTS__ERROR_CODES, A_SDK_TYPES__DeepPartial } from '@adaas/a-sdk-types';
import { A_EXPRESS_TYPES__ControllerConfig, A_EXPRESS_TYPES__IController, A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_EXPRESS_Context } from './A_EXPRESS_Context.class';
import { A_EXPRESS_DEFAULTS__CONTROLLER_CONFIG } from 'src/defaults/A_EXPRESS_Controller.defaults';



export class A_EXPRESS_Controller implements A_EXPRESS_TYPES__IController {

    logAlias = "a-express@abstract-controller"

    config!: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ControllerConfig>

    Config!: A_EXPRESS_TYPES__ControllerConfig


    constructor(
        config?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ControllerConfig>
    ) {
        this.Config = A_SDK_CommonHelper.deepMerge(
            this.config, A_SDK_CommonHelper.deepMerge(
                {
                    ...A_EXPRESS_DEFAULTS__CONTROLLER_CONFIG
                },
                config || {}
            )
        );
    }


    async get(
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
    ): Promise<any> {

        return next(A_EXPRESS_Context.Errors
            .getError(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED)
        );
    }

    async post(
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction): Promise<any> {

        return next(A_EXPRESS_Context.Errors
            .getError(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED)
        );
    }

    async put(
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction): Promise<any> {
        return next(A_EXPRESS_Context.Errors
            .getError(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED)
        );
    }


    async delete(
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction): Promise<any> {
        return next(A_EXPRESS_Context.Errors
            .getError(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED)
        );
    }

    async list(
        req: A_EXPRESS_TYPES__IRequest,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction): Promise<any> {
        return next(A_EXPRESS_Context.Errors
            .getError(A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED)
        );
    }

}