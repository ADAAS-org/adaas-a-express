"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_Get = A_EXPRESS_Get;
exports.A_EXPRESS_Post = A_EXPRESS_Post;
exports.A_EXPRESS_Put = A_EXPRESS_Put;
exports.A_EXPRESS_Delete = A_EXPRESS_Delete;
const A_EXPRESS_Decorators_storage_1 = require("../storage/A_EXPRESS_Decorators.storage");
function Route(method, path, middlewares = [], config = {}) {
    return function (target, propertyKey) {
        const existedMeta = A_EXPRESS_Decorators_storage_1.A_EXPRESS_Storage.get(target.constructor) || new Map();
        const inheritMeta = A_EXPRESS_Decorators_storage_1.A_EXPRESS_Storage.get(Object.getPrototypeOf(target.constructor)) || new Map();
        const routes = existedMeta.get(A_EXPRESS_Decorators_storage_1.A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY) || [];
        const inheritRoutes = inheritMeta.get(A_EXPRESS_Decorators_storage_1.A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY) || [];
        existedMeta.set(A_EXPRESS_Decorators_storage_1.A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY, [
            ...inheritRoutes,
            ...routes,
            {
                handlerName: propertyKey,
                path,
                method,
                middlewares,
                config
            }
        ]);
        A_EXPRESS_Decorators_storage_1.A_EXPRESS_Storage.set(target.constructor, existedMeta);
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
//# sourceMappingURL=A_EXPRESS_Methods.decorator.js.map