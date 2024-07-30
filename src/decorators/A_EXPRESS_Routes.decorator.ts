import express from 'express';
import {
    A_EXPRESS_TYPES__IController,
    A_EXPRESS_TYPES__IControllerConfig,
    A_EXPRESS_TYPES__INextFunction,
    A_EXPRESS_TYPES__IRequest,
    A_EXPRESS_TYPES__IResponse,
} from '../types/A_EXPRESS_Controller.types';
import { A_EXPRESS_Context } from '../global/A_EXPRESS_Context.class';
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from '../constants/errors.constants';
import { A_EXPRESS_TYPES__RouteDefinition } from './A_EXPRESS_Methods.decorator';
import { A_EXPRESS_App } from '../global/A_EXPRESS_App.class';
import {
    A_EXPRESS_Storage,
    A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_CONFIG_KEY,
    A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ENTITY_KEY,
    A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_REPOSITORY_KEY,
    A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY
} from '../storage/A_EXPRESS_Decorators.storage';
import {
    A_EXPRESS_TYPES__ICRUDController,
    A_EXPRESS_TYPES__ICRUDControllerConfig,
    A_EXPRESS_TYPES__ICRUDControllerRepository
} from '../types/A_EXPRESS_CRUDController.types';
import { A_EXPRESS_CRUDController } from '../global/A_EXPRESS_CRUDController.class';
import { A_EXPRESS_AuthMiddleware } from '../middleware/A_EXPRESS_Auth.middleware';

type Constructor<T = {}> = new (...args: any[]) => T;


export type A_EXPRESS_TYPES__PossibleControllers<T> = Constructor<T>
    | T
    | { new(...args: any) }
    | { new(...args: any): A_EXPRESS_TYPES__ICRUDController }
    | { new(...args: any): A_EXPRESS_TYPES__IController }
    | typeof A_EXPRESS_CRUDController;



export function A_EXPRESS_Routes<T extends object>(
    controllers: Array<A_EXPRESS_TYPES__PossibleControllers<T>>
): express.Router;
export function A_EXPRESS_Routes<T extends object>(
    controllers: Array<A_EXPRESS_TYPES__PossibleControllers<T>>,
    app: A_EXPRESS_App
): express.Router;
export function A_EXPRESS_Routes<T extends object>(
    router: express.Router,
    controllers: Array<A_EXPRESS_TYPES__PossibleControllers<T>>
): express.Router;
export function A_EXPRESS_Routes<T extends object>(
    router: express.Router,
    controllers: Array<A_EXPRESS_TYPES__PossibleControllers<T>>,
    app: A_EXPRESS_App
): express.Router;
export function A_EXPRESS_Routes<T extends object>(
    arg1: express.Router | Array<A_EXPRESS_TYPES__PossibleControllers<T>>,
    arg2?: Array<A_EXPRESS_TYPES__PossibleControllers<T>> | A_EXPRESS_App,
    arg3?: A_EXPRESS_App
): express.Router {
    let router!: express.Router;
    let controllers!: Array<A_EXPRESS_TYPES__PossibleControllers<T>>;
    let app: A_EXPRESS_App;


    switch (true) {

        /**
         * A_EXPRESS_Routes([])
         */
        case Array.isArray(arg1) && !arg2:
            router = express.Router();
            controllers = arg1!;
            break;

        /**
         * A_EXPRESS_Routes(Router(), [])
         */
        case arg1 instanceof express.Router && Array.isArray(arg2):
            router = arg1 as express.Router;
            controllers = arg2;
            break;


        /**
         * A_EXPRESS_Routes([], App)
         */
        case Array.isArray(arg1) && arg2 instanceof A_EXPRESS_App:
            router = express.Router();
            controllers = arg1;
            app = arg2;
            break;

        /**
         * A_EXPRESS_Routes(Router(), [], App)
         */
        case arg1 instanceof express.Router && Array.isArray(arg2) && arg3 instanceof A_EXPRESS_App:
            router = arg1 as express.Router;
            controllers = arg2;
            app = arg3;
            break;

        default:
            A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.INVALID_ROUTE_DECORATOR_PARAMS);
    }


    controllers.forEach((controller) => {


        let routes: Array<A_EXPRESS_TYPES__RouteDefinition>;
        let config: A_EXPRESS_TYPES__IControllerConfig | A_EXPRESS_TYPES__ICRUDControllerConfig;
        let repository: A_EXPRESS_TYPES__ICRUDControllerRepository<any>;
        let entity: string;


        let instance: A_EXPRESS_TYPES__IController | A_EXPRESS_TYPES__ICRUDController

        if (controller instanceof Function) {
            const existedMeta = A_EXPRESS_Storage.get(controller) || new Map();
            routes = existedMeta.get(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY) || [];
            config = existedMeta.get(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_CONFIG_KEY);
            repository = existedMeta.get(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_REPOSITORY_KEY);
            entity = existedMeta.get(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ENTITY_KEY);

            instance = new controller(app, config, repository);

        } else {
            instance = controller as A_EXPRESS_TYPES__IController;
            const existedMeta = A_EXPRESS_Storage.get(controller.constructor) || new Map();
            routes = existedMeta.get(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY) || [];
            config = existedMeta.get(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_CONFIG_KEY);
            repository = existedMeta.get(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_REPOSITORY_KEY);
            entity = existedMeta.get(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ENTITY_KEY);

        }

        routes.forEach((route) => {
            /**
             * If the method is not exposed or is ignored, skip the route
             */
            if (
                'list' in config
                && (
                    (config.http.expose && config.http.expose.indexOf(route.method) === -1)
                    ||
                    (config.http.ignore && config.http.ignore.indexOf(route.method) !== -1)
                )
            ) {
                return;
            }

            /**
             * Bind the handler=actual class method to the instance
             */
            const handler = instance[route.handlerName].bind(instance);


            let path = config.http.base || '/';

            path = /^\/$/.test(path) ? '' : path;


            let targetMiddlewares: Array<(
                req: A_EXPRESS_TYPES__IRequest,
                res: A_EXPRESS_TYPES__IResponse,
                next: A_EXPRESS_TYPES__INextFunction
            ) => void> = [];

            const useAuth = (route.config.auth === true || route.config.auth === false)
                ? route.config.auth
                : config.auth.enable || app.config.defaults.auth.enable

            if (entity)
                path = `${path}/${entity}`;


            if (useAuth)
                targetMiddlewares = [
                    A_EXPRESS_AuthMiddleware.AppInteractions_ValidateToken as any,
                    ...route.middlewares
                ];



            /**
             * The identity parameter for the entity controller is added to the path
             */
            if (route.config.identity)
                path = `${path}/:${config.id === 'ASEID' ? 'aseid' : 'id'}`;



            /**
             * Extra custom path that can be added to the route
             */
            if (route.path !== '__default__')
                path = `${path}${route.path}`;


            router[route.method](path, ...targetMiddlewares as any, handler);
        });
    });

    return router;
}
