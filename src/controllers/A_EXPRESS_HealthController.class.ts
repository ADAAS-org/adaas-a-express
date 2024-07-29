import { A_EXPRESS_TYPES__IHealthControllerConfig } from '../types/A_EXPRESS_HealthController.types';
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from '../constants/errors.constants';
import { A_EXPRESS_Get } from '../decorators/A_EXPRESS_Methods.decorator';
import { A_EXPRESS_App } from '../global/A_EXPRESS_App.class';
import { A_EXPRESS_Controller } from '../decorators/A_EXPRESS_Controller.decorator';
import {
    A_EXPRESS_TYPES__IController,
    A_EXPRESS_TYPES__INextFunction,
    A_EXPRESS_TYPES__IRequest,
    A_EXPRESS_TYPES__IResponse
} from '../types/A_EXPRESS_Controller.types';



@A_EXPRESS_Controller()
export class A_EXPRESS_HealthController
    implements A_EXPRESS_TYPES__IController {


    constructor(
        public context: A_EXPRESS_App,
        public config: A_EXPRESS_TYPES__IHealthControllerConfig
    ) {
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