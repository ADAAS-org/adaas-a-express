import {
    A_EXPRESS_TYPES__INextFunction,
    A_EXPRESS_TYPES__IRequest,
    A_EXPRESS_TYPES__IResponse
} from '../types/A_EXPRESS_Controller.types';
import {
    A_EXPRESS_Storage,
    A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY
} from '../storage/A_EXPRESS_Decorators.storage';



export type A_EXPRESS_TYPES__RouteDefinition = {
    handlerName: string;
} & A_EXPRESS_TYPES__IDecoratorRouteParam

export type A_EXPRESS_TYPES__IDecoratorRouteParam = {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    middlewares: Array<(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction) => void>;
    config: Partial<A_EXPRESS_TYPES__IDecoratorRouteConfig>
}

export type A_EXPRESS_TYPES__IDecoratorRouteConfig = {
    identity: boolean,
    auth: boolean
}

export interface A_EXPRESS_TYPES__IDecoratorRouteParams {
    path: string,
    middlewares: Array<(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction) => void>
    config: Partial<A_EXPRESS_TYPES__IDecoratorRouteConfig>
}


function Route(
    method: 'get' | 'post' | 'put' | 'delete',
    path: string,
    middlewares: Array<(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction) => void> = [],
    config: Partial<A_EXPRESS_TYPES__IDecoratorRouteConfig> = {}
) {

    return function (target: any, propertyKey: string) {

        const existedMeta = A_EXPRESS_Storage.get(target.constructor) || new Map();
        const inheritMeta = A_EXPRESS_Storage.get(Object.getPrototypeOf(target.constructor)) || new Map();

        const routes = existedMeta.get(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY) || [];
        const inheritRoutes = inheritMeta.get(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY) || [];


        existedMeta.set(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY, [
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


        A_EXPRESS_Storage.set(target.constructor, existedMeta);
    };
}



export function A_EXPRESS_Get(
    params: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams> = {}
) {

    return Route('get', params.path || '__default__', params.middlewares, {
        identity: true,
        ...(params.config || {}),
    });
}

export function A_EXPRESS_Post(
    params: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams> = {}
) {
    return Route('post', params.path || '__default__', params.middlewares, {
        identity: true,
        ...(params.config || {}),
    });
}

export function A_EXPRESS_Put(
    params: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams> = {}
) {
    return Route('put', params.path || '__default__', params.middlewares, {
        identity: true,
        ...(params.config || {}),
    });
}

export function A_EXPRESS_Delete(
    params: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams> = {}
) {
    return Route('delete', params.path || '__default__', params.middlewares, {
        identity: true,
        ...(params.config || {}),
    });
}