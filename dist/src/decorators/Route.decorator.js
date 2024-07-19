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
const A_EXPRESS_EntityController_class_1 = require("../global/A_EXPRESS_EntityController.class");
const A_EXPRESS_Auth_middleware_1 = require("src/middleware/A_EXPRESS_Auth.middleware");
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
function A_EXPRESS_Routes(arg1, arg2) {
    let router;
    let controllers;
    if (arg1 instanceof express_1.default.Router) {
        router = arg1;
        controllers = arg2;
    }
    else {
        router = express_1.default.Router();
        controllers = arg1;
    }
    controllers.forEach((controller) => {
        const instance = new controller();
        const routes = Reflect.getMetadata(ROUTES_KEY, controller) || [];
        routes.forEach((route) => {
            const handler = instance[route.handlerName].bind(instance);
            let path = route.path;
            if (path === '__default__' && controller instanceof A_EXPRESS_EntityController_class_1.A_EXPRESS_EntityController) {
                path = `/${controller.config.entity}`;
            }
            if (controller instanceof A_EXPRESS_EntityController_class_1.A_EXPRESS_EntityController) {
                switch (controller.config.type) {
                    case 'ServerCommands':
                        path = `/-s-cmd-${path}`;
                        break;
                    case 'ServerDelegate':
                        path = `/-s-dlg-${path}`;
                        break;
                    default:
                        break;
                }
                if (route.config.identity && ['post', 'put', 'delete'].includes(route.method)) {
                    path = `${path}/:${controller.config.identifierType === 'ASEID' ? 'aseid' : 'id'}`;
                }
            }
            if (controller instanceof A_EXPRESS_Controller_class_1.A_EXPRESS_Controller) {
                switch (controller.config.type) {
                    case 'ServerCommands':
                        path = `/-s-cmd-${path}`;
                        break;
                    case 'ServerDelegate':
                        path = `/-s-dlg-${path}`;
                        break;
                    default:
                        break;
                }
                if (route.config.identity && ['post', 'put', 'delete'].includes(route.method)) {
                    path = `${path}/:${controller.config.identifierType === 'ASEID' ? 'aseid' : 'id'}`;
                }
            }
            const targetMiddlewares = ((route.config.auth === true || route.config.auth === false)
                ? route.config.auth
                : (controller instanceof A_EXPRESS_Controller_class_1.A_EXPRESS_Controller
                    ? controller.config.auth
                    : controller instanceof A_EXPRESS_EntityController_class_1.A_EXPRESS_EntityController
                        ? controller.config.auth
                        : false))
                ? [A_EXPRESS_Auth_middleware_1.A_EXPRESS_AuthMiddleware, ...route.middlewares]
                : route.middlewares;
            router[route.method](path, ...targetMiddlewares, handler);
        });
    });
    return router;
}
//# sourceMappingURL=Route.decorator.js.map