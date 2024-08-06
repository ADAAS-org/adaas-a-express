"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_Routes = A_EXPRESS_Routes;
const express_1 = __importDefault(require("express"));
const A_EXPRESS_Context_class_1 = require("../global/A_EXPRESS_Context.class");
const errors_constants_1 = require("../constants/errors.constants");
const A_EXPRESS_App_class_1 = require("../global/A_EXPRESS_App.class");
const A_EXPRESS_Decorators_storage_1 = require("../storage/A_EXPRESS_Decorators.storage");
const A_EXPRESS_CRUDController_class_1 = require("../global/A_EXPRESS_CRUDController.class");
const A_EXPRESS_Auth_middleware_1 = require("../middleware/A_EXPRESS_Auth.middleware");
function A_EXPRESS_Routes(arg1, arg2, arg3) {
    let router;
    let controllers;
    let app;
    switch (true) {
        /**
         * A_EXPRESS_Routes([])
         */
        case Array.isArray(arg1) && !arg2:
            router = express_1.default.Router();
            controllers = arg1;
            break;
        /**
         * A_EXPRESS_Routes(Router(), [])
         */
        case arg1 instanceof express_1.default.Router && Array.isArray(arg2):
            router = arg1;
            controllers = arg2;
            break;
        /**
         * A_EXPRESS_Routes([], App)
         */
        case Array.isArray(arg1) && arg2 instanceof A_EXPRESS_App_class_1.A_EXPRESS_App:
            router = express_1.default.Router();
            controllers = arg1;
            app = arg2;
            break;
        /**
         * A_EXPRESS_Routes(Router(), [], App)
         */
        case arg1 instanceof express_1.default.Router && Array.isArray(arg2) && arg3 instanceof A_EXPRESS_App_class_1.A_EXPRESS_App:
            router = arg1;
            controllers = arg2;
            app = arg3;
            break;
        default:
            A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.INVALID_ROUTE_DECORATOR_PARAMS);
    }
    controllers.forEach((controller) => {
        let routes;
        let config;
        let repository;
        let entity;
        let instance;
        if (controller instanceof Function) {
            const existedMeta = A_EXPRESS_Decorators_storage_1.A_EXPRESS_Storage.get(controller) || new Map();
            routes = existedMeta.get(A_EXPRESS_Decorators_storage_1.A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY) || [];
            config = existedMeta.get(A_EXPRESS_Decorators_storage_1.A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_CONFIG_KEY);
            repository = existedMeta.get(A_EXPRESS_Decorators_storage_1.A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_REPOSITORY_KEY);
            entity = existedMeta.get(A_EXPRESS_Decorators_storage_1.A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ENTITY_KEY);
            instance = new controller(app, config, repository);
        }
        else {
            instance = controller;
            const existedMeta = A_EXPRESS_Decorators_storage_1.A_EXPRESS_Storage.get(controller.constructor) || new Map();
            routes = existedMeta.get(A_EXPRESS_Decorators_storage_1.A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY) || [];
            config = existedMeta.get(A_EXPRESS_Decorators_storage_1.A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_CONFIG_KEY);
            repository = existedMeta.get(A_EXPRESS_Decorators_storage_1.A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_REPOSITORY_KEY);
            entity = existedMeta.get(A_EXPRESS_Decorators_storage_1.A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ENTITY_KEY);
        }
        routes.forEach((route) => {
            /**
             * If the method is not exposed or is ignored, skip the route
             */
            if ('list' in config
                && ((config.http.expose && config.http.expose.indexOf(route.method) === -1)
                    ||
                        (config.http.ignore && config.http.ignore.indexOf(route.method) !== -1))) {
                return;
            }
            /**
             * Bind the handler=actual class method to the instance
             */
            const handler = instance[route.handlerName].bind(instance);
            instance.context.Logger.log('Before Path', config.http.base);
            let path = config.http.base || '/';
            instance.context.Logger.log('After Path', path);
            path = /^\/$/.test(path) ? '' : path;
            instance.context.Logger.log('After Path 2', path);
            let targetMiddlewares = [];
            const useAuth = (route.config.auth === true || route.config.auth === false)
                ? route.config.auth
                : config.auth.enable || app.config.defaults.auth.enable;
            instance.context.Logger.log(`Route: ${route.method.toUpperCase()} ${path}/${entity}`);
            switch (true) {
                case 'alias' in config.http && !!config.http.alias && typeof config.http.alias === 'function':
                    instance.context.Logger.log('Alias is a function', config.http.alias(instance));
                    path = `${path}/${config.http.alias(instance)}`;
                    break;
                case 'alias' in config.http && !!config.http.alias && typeof config.http.alias === 'string':
                    instance.context.Logger.log('Alias is a string', config.http.alias);
                    path = `${path}/${config.http.alias}`;
                    break;
                default:
                    instance.context.Logger.log('No alias');
                    path = `${path}/${entity}`;
                    break;
            }
            instance.context.Logger.log(`Path: ${path}`);
            if (useAuth)
                targetMiddlewares = [
                    A_EXPRESS_Auth_middleware_1.A_EXPRESS_AuthMiddleware.AppInteractions_ValidateToken,
                    ...route.middlewares
                ];
            /**
             * The identity parameter for the entity controller is added to the path
             */
            if (route.config.identity)
                path = `${path}/:${config.id === 'ASEID' ? 'aseid' : 'id'}`;
            instance.context.Logger.log(`Path 2: ${path}`);
            if (instance instanceof A_EXPRESS_CRUDController_class_1.A_EXPRESS_CRUDController && instance.config.http.subPath) {
                instance.context.Logger.log(`SubPath: ${instance.config.http.subPath}`);
                path = `${path}/${instance.config.http.subPath}`;
            }
            /**
             * Extra custom path that can be added to the route
             */
            if (route.path !== '__default__')
                path = `${path}${route.path}`;
            instance.context.Logger.log(`Path 3: ${path}`);
            router[route.method](path, ...targetMiddlewares, handler);
        });
    });
    return router;
}
//# sourceMappingURL=A_EXPRESS_Routes.decorator.js.map