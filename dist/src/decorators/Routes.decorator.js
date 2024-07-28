"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_Routes = A_EXPRESS_Routes;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const A_EXPRESS_Controller_class_1 = require("../global/A_EXPRESS_Controller.class");
const A_EXPRESS_EntityController_class_1 = require("../controllers/A_EXPRESS_EntityController.class");
const A_EXPRESS_HealthController_class_1 = require("../controllers/A_EXPRESS_HealthController.class");
const A_EXPRESS_ServerCommandsController_class_1 = require("../controllers/A_EXPRESS_ServerCommandsController.class");
const A_EXPRESS_ServerDelegateController_class_1 = require("../controllers/A_EXPRESS_ServerDelegateController.class");
const A_EXPRESS_AppInteractionsController_class_1 = require("../controllers/A_EXPRESS_AppInteractionsController.class");
const A_EXPRESS_App_class_1 = require("../global/A_EXPRESS_App.class");
const A_EXPRESS_Context_class_1 = require("../global/A_EXPRESS_Context.class");
const errors_constants_1 = require("../constants/errors.constants");
const A_EXPRESS_Auth_middleware_1 = require("../middleware/A_EXPRESS_Auth.middleware");
const Methods_decorator_1 = require("./Methods.decorator");
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
        const routes1 = Reflect.getMetadata(Methods_decorator_1.A_EXPRESS_TYPES__ROUTES_KEY, controller.constructor) || [];
        const routes2 = Reflect.getMetadata(Methods_decorator_1.A_EXPRESS_TYPES__ROUTES_KEY, controller) || [];
        const routes = [
            ...routes1,
            ...routes2
        ];
        routes.forEach((route) => {
            var _a, _b, _c;
            /**
             * If the method is not exposed or is ignored, skip the route
             */
            if (!((_b = (_a = instance.config) === null || _a === void 0 ? void 0 : _a.http) === null || _b === void 0 ? void 0 : _b.expose)
                ||
                    instance.config.http.expose.indexOf(route.method) === -1
                ||
                    (instance.config.http.ignore
                        &&
                            ((_c = instance.config.http.ignore) === null || _c === void 0 ? void 0 : _c.indexOf(route.method)) !== -1))
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
                        ? instance.config.http.base || '/'
                        : instance.config.http.base || '/';
            path = /\//.test(path) ? '' : path;
            let targetMiddlewares = [];
            const useAuth = (route.config.auth === true || route.config.auth === false)
                ? route.config.auth
                : instance.config.auth.enable || false;
            switch (true) {
                case instance instanceof A_EXPRESS_AppInteractionsController_class_1.A_EXPRESS_AppInteractionsController:
                    if (instance.config.entity)
                        path = `${path}/${instance.config.entity}`;
                    if (useAuth)
                        targetMiddlewares = [
                            A_EXPRESS_Auth_middleware_1.A_EXPRESS_AuthMiddleware.AppInteractions_ValidateToken,
                            ...route.middlewares
                        ];
                    break;
                case instance instanceof A_EXPRESS_ServerCommandsController_class_1.A_EXPRESS_ServerCommandsController:
                    if (instance.config.entity)
                        path = `${path}/${instance.config.entity}`;
                    if (useAuth)
                        targetMiddlewares = [
                            A_EXPRESS_Auth_middleware_1.A_EXPRESS_AuthMiddleware.ServerCommands_ValidateToken,
                            ...route.middlewares
                        ];
                    break;
                case instance instanceof A_EXPRESS_ServerDelegateController_class_1.A_EXPRESS_ServerDelegateController:
                    if (instance.config.entity)
                        path = `${path}/${instance.config.entity}`;
                    if (useAuth)
                        targetMiddlewares = [
                            A_EXPRESS_Auth_middleware_1.A_EXPRESS_AuthMiddleware.ServerDelegate_ValidateToken,
                            ...route.middlewares
                        ];
                    break;
                default:
                    if (instance instanceof A_EXPRESS_EntityController_class_1.A_EXPRESS_EntityController && instance.config.entity) {
                        path = `${path}/${instance.config.entity}`;
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
                path = `${path}${route.path}`;
            router[route.method](path, ...targetMiddlewares, handler);
        });
    });
    return router;
}
//# sourceMappingURL=Routes.decorator.js.map