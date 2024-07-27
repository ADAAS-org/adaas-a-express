import 'reflect-metadata';
import express from 'express';
import { A_EXPRESS_Controller } from '../global/A_EXPRESS_Controller.class';
import { A_EXPRESS_EntityController } from '../controllers/A_EXPRESS_EntityController.class';
import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_EXPRESS_HealthController } from '../controllers/A_EXPRESS_HealthController.class';
import { A_EXPRESS_ServerCommandsController } from '../controllers/A_EXPRESS_ServerCommandsController.class';
import { A_EXPRESS_ServerDelegateController } from '../controllers/A_EXPRESS_ServerDelegateController.class';
import { A_EXPRESS_AppInteractionsController } from '../controllers/A_EXPRESS_AppInteractionsController.class';
export type A_EXPRESS_TYPES__IDecoratorRouteConfig = {
    identity: boolean;
    auth: boolean;
};
export interface A_EXPRESS_TYPES__IDecoratorRouteParams {
    path: string;
    middlewares: Array<(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction) => void>;
    config: Partial<A_EXPRESS_TYPES__IDecoratorRouteConfig>;
}
export declare function A_EXPRESS_Get(params?: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams>): (target: any, propertyKey: string) => void;
export declare function A_EXPRESS_Post(params?: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams>): (target: any, propertyKey: string) => void;
export declare function A_EXPRESS_Put(params?: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams>): (target: any, propertyKey: string) => void;
export declare function A_EXPRESS_Delete(params?: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams>): (target: any, propertyKey: string) => void;
export type A_EXPRESS_TYPES__PossibleControllers = typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController | typeof A_EXPRESS_HealthController | typeof A_EXPRESS_AppInteractionsController | typeof A_EXPRESS_ServerCommandsController | typeof A_EXPRESS_ServerDelegateController | A_EXPRESS_Controller | A_EXPRESS_EntityController | A_EXPRESS_HealthController | A_EXPRESS_AppInteractionsController | A_EXPRESS_ServerCommandsController | A_EXPRESS_ServerDelegateController;
export declare function A_EXPRESS_Routes(controllers: Array<A_EXPRESS_TYPES__PossibleControllers>): express.Router;
export declare function A_EXPRESS_Routes(router: express.Router, controllers: Array<A_EXPRESS_TYPES__PossibleControllers>): express.Router;
