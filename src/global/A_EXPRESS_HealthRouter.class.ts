import { NextFunction } from 'express';
import { A_EXPRESS_TYPES__HealthControllerConfig } from '../types/A_EXPRESS_HealthRouter.types';
import { A_EXPRESS_Context } from './A_EXPRESS_Context.class';
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from '../constants/errors.constants';
import { A_EXPRESS_Controller } from './A_EXPRESS_Controller.class';
import { A_EXPRESS_Get } from '../decorators/Route.decorator';
import { A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';



export class A_EXPRESS_HealthController extends A_EXPRESS_Controller {

    config!: A_EXPRESS_TYPES__HealthControllerConfig


    constructor(config?: A_EXPRESS_TYPES__HealthControllerConfig) {
        super();
        this.config = config || {} as A_EXPRESS_TYPES__HealthControllerConfig;
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
        next: NextFunction
    ): Promise<any> {
        try {
            const version = await import(this.config.versionPath);

            return res.status(200).send(version)
        } catch (error) {
            return next(A_EXPRESS_Context.Errors.getError(A_EXPRESS_CONSTANTS__ERROR_CODES.INCORRECT_VERSION_PATH_FOR_HEALTH_CONTROLLER));
        }
    }

}