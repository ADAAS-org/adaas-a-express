// =========== A-EXPRESS CONTEXT
export { A_EXPRESS_Context } from './src/global/A_EXPRESS_Context.class'


// =========== DECORATORS EXPORT 
export { A_EXPRESS_AvailableResources } from './src/decorators/AvailableResources.decorator';
export { A_EXPRESS_ValidateAccess } from './src/decorators/ValidateAccess.decorator';
export {
    A_EXPRESS_Delete,
    A_EXPRESS_Get,
    A_EXPRESS_Post,
    A_EXPRESS_Put,
    A_EXPRESS_Routes,
} from './src/decorators/Route.decorator';


// =========== TYPES EXPORT
export {
    A_EXPRESS_TYPES__IDecoratorRouteConfig,
    A_EXPRESS_TYPES__IDecoratorRouteParams
} from './src/decorators/Route.decorator';

export {
    A_EXPRESS_TYPES__IController,
    A_EXPRESS_TYPES__IRequest,
    A_EXPRESS_TYPES__IRequestParams,
    A_EXPRESS_TYPES__IRequestQueryParams,
    A_EXPRESS_TYPES__IResponse
} from './src/types/A_EXPRESS_Controller.types';

export {
    A_EXPRESS_TYPES__EntityControllerConfig,
    A_EXPRESS_TYPES__EntityController_GetConfig,
    A_EXPRESS_TYPES__EntityController_ListConfig,
    A_EXPRESS_TYPES__GetPageOptions,
    A_EXPRESS_TYPES__IControllerRepository,
    A_EXPRESS_TYPES__SearchOptions
} from './src/types/A_EXPRESS_EntityController.types';

export {
    A_EXPRESS_TYPES__HealthControllerConfig
} from './src/types/A_EXPRESS_HealthRouter.types'


// =========== DEFAULT ENTITIES EXPORT
export { A_EXPRESS_AuthController } from './src/global/A_EXPRESS_AuthController.class';
export { A_EXPRESS_Controller } from './src/global/A_EXPRESS_Controller.class';
export { A_EXPRESS_EntityController } from './src/global/A_EXPRESS_EntityController.class';
export { A_EXPRESS_HealthController } from './src/global/A_EXPRESS_HealthRouter.class';

// =========== MIDDLEWARES EXPORT
export { A_EXPRESS_AuthMiddleware } from './src/middleware/A_EXPRESS_Auth.middleware';
export { A_EXPRESS_ErrorsMiddleware } from './src/middleware/A_EXPRESS_Error.middleware'