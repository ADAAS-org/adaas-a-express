"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_TYPES__ROUTES_KEY = void 0;
exports.A_EXPRESS_Get = A_EXPRESS_Get;
exports.A_EXPRESS_Post = A_EXPRESS_Post;
exports.A_EXPRESS_Put = A_EXPRESS_Put;
exports.A_EXPRESS_Delete = A_EXPRESS_Delete;
require("reflect-metadata");
exports.A_EXPRESS_TYPES__ROUTES_KEY = Symbol('a-express-routes');
function Route(method, path, middlewares = [], config = {}) {
    return function (target, propertyKey) {
        const routes = Reflect.getMetadata(exports.A_EXPRESS_TYPES__ROUTES_KEY, target.constructor) || [];
        routes.push({
            method,
            path,
            middlewares,
            handlerName: propertyKey,
            config
        });
        Reflect.defineMetadata(exports.A_EXPRESS_TYPES__ROUTES_KEY, routes, target.constructor);
    };
}
function A_EXPRESS_Get(params = {}) {
    return Route('get', params.path || '__default__', params.middlewares, Object.assign({ identity: true }, (params.config || {})));
}
function A_EXPRESS_Post(params = {}) {
    return Route('post', params.path || '__default__', params.middlewares, Object.assign({ identity: true }, (params.config || {})));
}
function A_EXPRESS_Put(params = {}) {
    return Route('put', params.path || '__default__', params.middlewares, Object.assign({ identity: true }, (params.config || {})));
}
function A_EXPRESS_Delete(params = {}) {
    return Route('delete', params.path || '__default__', params.middlewares, Object.assign({ identity: true }, (params.config || {})));
}
//# sourceMappingURL=Methods.decorator.js.map