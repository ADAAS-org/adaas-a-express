"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_Get = A_EXPRESS_Get;
exports.A_EXPRESS_Post = A_EXPRESS_Post;
exports.A_EXPRESS_Put = A_EXPRESS_Put;
exports.A_EXPRESS_Delete = A_EXPRESS_Delete;
exports.A_EXPRESS_Routes = A_EXPRESS_Routes;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const A_EXPRESS_Controller_class_1 = require("../global/A_EXPRESS_Controller.class");
const A_EXPRESS_EntityController_class_1 = require("../controllers/A_EXPRESS_EntityController.class");
const A_EXPRESS_Auth_middleware_1 = require("src/middleware/A_EXPRESS_Auth.middleware");
const A_EXPRESS_HealthController_class_1 = require("../controllers/A_EXPRESS_HealthController.class");
const A_EXPRESS_ServerCommandsController_class_1 = require("../controllers/A_EXPRESS_ServerCommandsController.class");
const A_EXPRESS_ServerDelegateController_class_1 = require("../controllers/A_EXPRESS_ServerDelegateController.class");
const A_EXPRESS_AppInteractionsController_class_1 = require("../controllers/A_EXPRESS_AppInteractionsController.class");
const A_EXPRESS_App_class_1 = require("../global/A_EXPRESS_App.class");
const A_EXPRESS_Context_class_1 = require("../global/A_EXPRESS_Context.class");
const errors_constants_1 = require("../constants/errors.constants");
const ROUTES_KEY = Symbol('routes');
function Route(method, path, middlewares = [], config = {}) {
    return function (target, propertyKey) {
        const routes = Reflect.getMetadata(ROUTES_KEY, target.constructor) || [];
        routes.push({
            method,
            path,
            middlewares,
            handlerName: propertyKey,
            config
        });
        Reflect.defineMetadata(ROUTES_KEY, routes, target.constructor);
    };
}
function A_EXPRESS_Get(params = {}) {
    return Route('get', params.path || '__default__', params.middlewares, Object.assign(Object.assign({}, (params.config || {})), { identity: true }));
}
function A_EXPRESS_Post(params = {}) {
    return Route('post', params.path || '__default__', params.middlewares, Object.assign(Object.assign({}, (params.config || {})), { identity: true }));
}
function A_EXPRESS_Put(params = {}) {
    return Route('put', params.path || '__default__', params.middlewares, Object.assign(Object.assign({}, (params.config || {})), { identity: true }));
}
function A_EXPRESS_Delete(params = {}) {
    return Route('delete', params.path || '__default__', params.middlewares, Object.assign(Object.assign({}, (params.config || {})), { identity: true }));
}
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
        case arg1 instanceof express_1.default.Router && Array.isArray(arg2) && !arg3:
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
        let instance;
        if (controller instanceof A_EXPRESS_Controller_class_1.A_EXPRESS_Controller ||
            controller instanceof A_EXPRESS_EntityController_class_1.A_EXPRESS_EntityController ||
            controller instanceof A_EXPRESS_HealthController_class_1.A_EXPRESS_HealthController ||
            controller instanceof A_EXPRESS_AppInteractionsController_class_1.A_EXPRESS_AppInteractionsController ||
            controller instanceof A_EXPRESS_ServerCommandsController_class_1.A_EXPRESS_ServerCommandsController ||
            controller instanceof A_EXPRESS_ServerDelegateController_class_1.A_EXPRESS_ServerDelegateController) {
            instance = controller;
        }
        else {
            instance = new controller({
                arc: {
                    enable: app ? app.config.defaults.arc.enable : true
                },
                auth: {
                    enable: app ? app.config.defaults.auth.enable : false
                }
            });
        }
        const routes = Reflect.getMetadata(ROUTES_KEY, controller) || [];
        routes.forEach((route) => {
            var _a;
            /**
             * If the method is not exposed or is ignored, skip the route
             */
            if (!(instance.Config.http.expose)
                ||
                    instance.Config.http.expose.indexOf(route.method) === -1
                ||
                    (instance.Config.http.ignore
                        &&
                            ((_a = instance.Config.http.ignore) === null || _a === void 0 ? void 0 : _a.indexOf(route.method)) !== -1))
                return;
            /**
             * Bind the handler=actual class method to the instance
             */
            const handler = instance[route.handlerName].bind(instance);
            let path = instance instanceof A_EXPRESS_ServerCommandsController_class_1.A_EXPRESS_ServerCommandsController
                ? '/-s-cmd-'
                : instance instanceof A_EXPRESS_ServerDelegateController_class_1.A_EXPRESS_ServerDelegateController
                    ? '/-s-dlg-'
                    : instance instanceof A_EXPRESS_AppInteractionsController_class_1.A_EXPRESS_AppInteractionsController
                        ? instance.Config.http.base || '/'
                        : instance.Config.http.base || '/';
            let targetMiddlewares = [];
            const useAuth = (route.config.auth === true || route.config.auth === false)
                ? route.config.auth
                : instance.config.auth || false;
            switch (true) {
                case instance instanceof A_EXPRESS_AppInteractionsController_class_1.A_EXPRESS_AppInteractionsController:
                    if (instance.Config.entity)
                        path = `${path}/${instance.Config.entity}`;
                    if (useAuth)
                        targetMiddlewares = [
                            A_EXPRESS_Auth_middleware_1.A_EXPRESS_AuthMiddleware.AppInteractions_ValidateToken,
                            ...route.middlewares
                        ];
                    break;
                case instance instanceof A_EXPRESS_ServerCommandsController_class_1.A_EXPRESS_ServerCommandsController:
                    if (instance.Config.entity)
                        path = `${path}/${instance.Config.entity}`;
                    if (useAuth)
                        targetMiddlewares = [
                            A_EXPRESS_Auth_middleware_1.A_EXPRESS_AuthMiddleware.ServerCommands_ValidateToken,
                            ...route.middlewares
                        ];
                    break;
                case instance instanceof A_EXPRESS_ServerDelegateController_class_1.A_EXPRESS_ServerDelegateController:
                    if (instance.Config.entity)
                        path = `${path}/${instance.Config.entity}`;
                    if (useAuth)
                        targetMiddlewares = [
                            A_EXPRESS_Auth_middleware_1.A_EXPRESS_AuthMiddleware.ServerDelegate_ValidateToken,
                            ...route.middlewares
                        ];
                    break;
                default:
                    if (instance instanceof A_EXPRESS_EntityController_class_1.A_EXPRESS_EntityController && instance.Config.entity) {
                        path = `${path}/${instance.Config.entity}`;
                    }
                    break;
            }
            /**
             * The identity parameter for the entity controller is added to the path
             */
            if (route.config.identity)
                path = `${path}/:${instance.config.id === 'ASEID' ? 'aseid' : 'id'}`;
            /**
             * Extra custom path that can be added to the route
             */
            if (route.path !== '__default__')
                path = `${path}/${route.path}`;
            router[route.method](path, ...targetMiddlewares, handler);
        });
    });
    return router;
}
//# sourceMappingURL=Route.decorator.js.map