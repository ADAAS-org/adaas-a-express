import 'reflect-metadata';
import express from 'express';
import { A_EXPRESS_Controller } from '../global/A_EXPRESS_Controller.class';
import { A_EXPRESS_EntityController } from '../global/A_EXPRESS_EntityController.class';
import { A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_EXPRESS_HealthController } from '../global/A_EXPRESS_HealthRouter.class';
export type A_EXPRESS_TYPES__IDecoratorRouteConfig = {
    identity: boolean;
    auth: boolean;
};
export interface A_EXPRESS_TYPES__IDecoratorRouteParams {
    path: string;
    middlewares: Array<(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: express.NextFunction) => void>;
    config: Partial<A_EXPRESS_TYPES__IDecoratorRouteConfig>;
}
export declare function A_EXPRESS_Get(params?: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams>): (target: any, propertyKey: string) => void;
export declare function A_EXPRESS_Post(params?: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams>): (target: any, propertyKey: string) => void;
export declare function A_EXPRESS_Put(params?: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams>): (target: any, propertyKey: string) => void;
export declare function A_EXPRESS_Delete(params?: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams>): (target: any, propertyKey: string) => void;
export declare function A_EXPRESS_Routes(controllers: Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController | typeof A_EXPRESS_HealthController | A_EXPRESS_Controller | A_EXPRESS_HealthController>): express.Router;
export declare function A_EXPRESS_Routes(router: express.Router, controllers: Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController | typeof A_EXPRESS_HealthController | A_EXPRESS_Controller | A_EXPRESS_HealthController>): express.Router;
