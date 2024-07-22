import 'reflect-metadata';
import express, { Request, Response, Router } from 'express';
import { A_EXPRESS_Controller } from '../global/A_EXPRESS_Controller.class';
import { A_EXPRESS_EntityController } from '../global/A_EXPRESS_EntityController.class';
import { A_EXPRESS_AuthMiddleware } from 'src/middleware/A_EXPRESS_Auth.middleware';
import { A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_EXPRESS_HealthController } from '../global/A_EXPRESS_HealthRouter.class';

const ROUTES_KEY = Symbol('routes');

interface RouteDefinition {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    middlewares: Array<(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: express.NextFunction) => void>;
    config: Partial<A_EXPRESS_TYPES__IDecoratorRouteConfig>
    handlerName: string;
}

export type A_EXPRESS_TYPES__IDecoratorRouteConfig = {
    identity: boolean,
    auth: boolean
}

export interface A_EXPRESS_TYPES__IDecoratorRouteParams {
    path: string,
    middlewares: Array<(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: express.NextFunction) => void>
    config: Partial<A_EXPRESS_TYPES__IDecoratorRouteConfig>
}

function Route(
    method: 'get' | 'post' | 'put' | 'delete',
    path: string,
    middlewares: Array<(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: express.NextFunction) => void> = [],
    config: Partial<A_EXPRESS_TYPES__IDecoratorRouteConfig> = {}
) {

    return function (target: any, propertyKey: string) {
        const routes: RouteDefinition[] = Reflect.getMetadata(ROUTES_KEY, target.constructor) || [];
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



export function A_EXPRESS_Get(
    params: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams> = {}
) {
    return Route('get', params.path || '__default__', params.middlewares, {
        ...(params.config || {}),
        identity: true,
    });
}

export function A_EXPRESS_Post(
    params: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams> = {}
) {
    return Route('post', params.path || '__default__', params.middlewares, {
        ...(params.config || {}),
        identity: true,
    });
}

export function A_EXPRESS_Put(
    params: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams> = {}
) {
    return Route('put', params.path || '__default__', params.middlewares, {
        ...(params.config || {}),
        identity: true,
    });
}

export function A_EXPRESS_Delete(
    params: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams> = {}
) {
    return Route('delete', params.path || '__default__', params.middlewares, {
        ...(params.config || {}),
        identity: true,
    });
}




export function A_EXPRESS_Routes(
    controllers: Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController | typeof A_EXPRESS_HealthController | A_EXPRESS_Controller | A_EXPRESS_HealthController>
): express.Router;
export function A_EXPRESS_Routes(
    router: express.Router,
    controllers: Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController | typeof A_EXPRESS_HealthController | A_EXPRESS_Controller | A_EXPRESS_HealthController>
): express.Router;
export function A_EXPRESS_Routes(
    arg1: express.Router | Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController | typeof A_EXPRESS_HealthController | A_EXPRESS_Controller | A_EXPRESS_HealthController>,
    arg2?: Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController | typeof A_EXPRESS_HealthController | A_EXPRESS_Controller | A_EXPRESS_HealthController>
): express.Router {
    let router: express.Router;
    let controllers: Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController | typeof A_EXPRESS_HealthController | A_EXPRESS_Controller | A_EXPRESS_HealthController>;


    if (arg1 instanceof express.Router) {
        router = arg1 as express.Router;
        controllers = arg2!;
    } else {
        router = express.Router();
        controllers = arg1 as Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController | typeof A_EXPRESS_HealthController>;
    }


    controllers.forEach((controller) => {
        const instance = controller instanceof A_EXPRESS_Controller ? controller : new controller();
        const routes: RouteDefinition[] = Reflect.getMetadata(ROUTES_KEY, controller) || [];

        routes.forEach((route) => {
            const handler = instance[route.handlerName].bind(instance);

            let path = route.path;
            if (path === '__default__' && controller instanceof A_EXPRESS_EntityController) {
                path = `/${controller.config.entity}`;
            }

            if (controller instanceof A_EXPRESS_EntityController) {
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

            if (controller instanceof A_EXPRESS_Controller) {
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

            const targetMiddlewares = (
                (route.config.auth === true || route.config.auth === false)
                    ? route.config.auth
                    : (
                        controller instanceof A_EXPRESS_Controller
                            ? controller.config.auth
                            : controller instanceof A_EXPRESS_EntityController
                                ? controller.config.auth
                                : false
                    ))
                ? [A_EXPRESS_AuthMiddleware as any, ...route.middlewares]
                : route.middlewares;

            router[route.method](path, ...targetMiddlewares, handler);
        });
    });

    return router;
}
