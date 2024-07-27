import 'reflect-metadata';
import express from 'express';
import { A_EXPRESS_Controller } from '../global/A_EXPRESS_Controller.class';
import { A_EXPRESS_EntityController } from '../controllers/A_EXPRESS_EntityController.class';
import { A_EXPRESS_AuthMiddleware } from 'src/middleware/A_EXPRESS_Auth.middleware';
import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_EXPRESS_HealthController } from '../controllers/A_EXPRESS_HealthController.class';
import { A_EXPRESS_ServerCommandsController } from '../controllers/A_EXPRESS_ServerCommandsController.class';
import { A_EXPRESS_ServerDelegateController } from '../controllers/A_EXPRESS_ServerDelegateController.class';
import { A_EXPRESS_AppInteractionsController } from '../controllers/A_EXPRESS_AppInteractionsController.class';

const ROUTES_KEY = Symbol('routes');

interface RouteDefinition {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    middlewares: Array<(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction) => void>;
    config: Partial<A_EXPRESS_TYPES__IDecoratorRouteConfig>
    handlerName: string;
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



export type A_EXPRESS_TYPES__PossibleControllers = typeof A_EXPRESS_Controller |
    typeof A_EXPRESS_EntityController |
    typeof A_EXPRESS_HealthController |
    typeof A_EXPRESS_AppInteractionsController |
    typeof A_EXPRESS_ServerCommandsController |
    typeof A_EXPRESS_ServerDelegateController |
    A_EXPRESS_Controller |
    A_EXPRESS_EntityController |
    A_EXPRESS_HealthController |
    A_EXPRESS_AppInteractionsController |
    A_EXPRESS_ServerCommandsController |
    A_EXPRESS_ServerDelegateController;



export function A_EXPRESS_Routes(
    controllers: Array<A_EXPRESS_TYPES__PossibleControllers>
): express.Router;
export function A_EXPRESS_Routes(
    router: express.Router,
    controllers: Array<A_EXPRESS_TYPES__PossibleControllers>
): express.Router;
export function A_EXPRESS_Routes(
    arg1: express.Router | Array<A_EXPRESS_TYPES__PossibleControllers>,
    arg2?: Array<A_EXPRESS_TYPES__PossibleControllers>
): express.Router {
    let router: express.Router;
    let controllers: Array<A_EXPRESS_TYPES__PossibleControllers>;


    if (arg1 instanceof express.Router) {
        router = arg1 as express.Router;
        controllers = arg2!;
    } else {
        router = express.Router();
        controllers = arg1 as Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController | typeof A_EXPRESS_HealthController>;
    }

    controllers.forEach((controller) => {
        let instance: A_EXPRESS_Controller |
            A_EXPRESS_EntityController |
            A_EXPRESS_HealthController |
            A_EXPRESS_AppInteractionsController |
            A_EXPRESS_ServerCommandsController |
            A_EXPRESS_ServerDelegateController;

        if (
            controller instanceof A_EXPRESS_Controller ||
            controller instanceof A_EXPRESS_EntityController ||
            controller instanceof A_EXPRESS_HealthController ||
            controller instanceof A_EXPRESS_AppInteractionsController ||
            controller instanceof A_EXPRESS_ServerCommandsController ||
            controller instanceof A_EXPRESS_ServerDelegateController

        ) {
            instance = controller;
        }
        else {
            instance = new (controller as any)();
        }

        const routes: RouteDefinition[] = Reflect.getMetadata(ROUTES_KEY, controller) || [];

        routes.forEach((route) => {
            /**
             * If the method is not exposed or is ignored, skip the route
             */
            if (
                instance.Config.http.expose?.indexOf(route.method) === -1
                ||
                instance.Config.http.ignore?.indexOf(route.method) !== -1
            ) return;


            /**
             * Bind the handler=actual class method to the instance
             */
            const handler = instance[route.handlerName].bind(instance);


            let path = instance instanceof A_EXPRESS_ServerCommandsController
                ? '/-s-cmd-'
                : instance instanceof A_EXPRESS_ServerDelegateController
                    ? '/-s-dlg-'
                    : instance instanceof A_EXPRESS_AppInteractionsController
                        ? instance.Config.http.base || '/'
                        : instance.Config.http.base || '/';

            let targetMiddlewares: Array<(
                req: A_EXPRESS_TYPES__IRequest,
                res: A_EXPRESS_TYPES__IResponse,
                next: A_EXPRESS_TYPES__INextFunction
            ) => void> = [];

            const useAuth = (route.config.auth === true || route.config.auth === false)
                ? route.config.auth
                : instance.config.auth || false


            switch (true) {

                case instance instanceof A_EXPRESS_AppInteractionsController:
                    if (instance.Config.entity)
                        path = `${path}/${instance.Config.entity}`;

                    if (useAuth)
                        targetMiddlewares = [
                            A_EXPRESS_AuthMiddleware.AppInteractions_ValidateToken as any,
                            ...route.middlewares
                        ];

                    break;

                case instance instanceof A_EXPRESS_ServerCommandsController:
                    if (instance.Config.entity)
                        path = `${path}/${instance.Config.entity}`;

                    if (useAuth)
                        targetMiddlewares = [
                            A_EXPRESS_AuthMiddleware.ServerCommands_ValidateToken as any,
                            ...route.middlewares
                        ];

                    break;

                case instance instanceof A_EXPRESS_ServerDelegateController:
                    if (instance.Config.entity)
                        path = `${path}/${instance.Config.entity}`;

                    if (useAuth)
                        targetMiddlewares = [
                            A_EXPRESS_AuthMiddleware.ServerDelegate_ValidateToken as any,
                            ...route.middlewares
                        ];

                    break;

                default:
                    if (instance instanceof A_EXPRESS_EntityController && instance.Config.entity) {
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


            router[route.method](path, ...targetMiddlewares as any, handler);
        });
    });

    return router;
}
