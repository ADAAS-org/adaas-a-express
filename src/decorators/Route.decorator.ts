import 'reflect-metadata';
import express, { Request, Response, Router } from 'express';
import { A_EXPRESS_Controller } from '../global/A_EXPRESS_Controller.class';
import { A_EXPRESS_EntityController } from '../global/A_EXPRESS_EntityController.class';
import { AuthMiddleware } from 'src/middleware/A_EXPRESS_Auth.middleware';

const ROUTES_KEY = Symbol('routes');

interface RouteDefinition {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    middlewares: Array<(req: Request, res: Response, next: express.NextFunction) => void>;
    config: Partial<A_EXPRESS_TYPES__IDecoratorRouteConfig>
    handlerName: string;
}

export type A_EXPRESS_TYPES__IDecoratorRouteConfig = {
    identity: boolean,
    auth: boolean
}

export interface A_EXPRESS_TYPES__IDecoratorRouteParams {
    path: string,
    middlewares: Array<(req: Request, res: Response, next: express.NextFunction) => void>
    config: Partial<A_EXPRESS_TYPES__IDecoratorRouteConfig>
}

function Route(
    method: 'get' | 'post' | 'put' | 'delete',
    path: string,
    middlewares: Array<(req: Request, res: Response, next: express.NextFunction) => void> = [],
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
        auth: true,
    });
}

export function A_EXPRESS_Post(
    params: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams> = {}
) {
    return Route('post', params.path || '__default__', params.middlewares, {
        ...(params.config || {}),
        identity: true,
        auth: true,
    });
}

export function A_EXPRESS_Put(
    params: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams> = {}
) {
    return Route('put', params.path || '__default__', params.middlewares, {
        ...(params.config || {}),
        identity: true,
        auth: true,
    });
}

export function A_EXPRESS_Delete(
    params: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams> = {}
) {
    return Route('delete', params.path || '__default__', params.middlewares, {
        ...(params.config || {}),
        identity: true,
        auth: true,
    });
}




export function A_EXPRESS_Routes(
    controllers: Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController>
): express.Router;
export function A_EXPRESS_Routes(
    router: express.Router,
    controllers: Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController>
): express.Router;
export function A_EXPRESS_Routes(
    arg1: express.Router | Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController>,
    arg2?: Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController>
): express.Router {
    let router: express.Router;
    let controllers: Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController>;


    if (arg1 instanceof express.Router) {
        router = arg1 as express.Router;
        controllers = arg2!;
    } else {
        router = express.Router();
        controllers = arg1 as Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController>;
    }


    controllers.forEach((controller) => {
        const instance = new controller();
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

            console.log('path', path);

            const targetMiddlewares = route.config.auth ? [AuthMiddleware as any, ...route.middlewares] : route.middlewares;

            router[route.method](path, ...targetMiddlewares, handler);
        });
    });

    return router;
}
