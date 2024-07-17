import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { A_EXPRESS_Controller } from '../global/A_EXPRESS_Controller.class';
import { A_EXPRESS_EntityController } from '../global/A_EXPRESS_EntityController.class';
export type A_EXPRESS_TYPES__IDecoratorRouteConfig = {
    identity: boolean;
    auth: boolean;
};
export interface A_EXPRESS_TYPES__IDecoratorRouteParams {
    path: string;
    middlewares: Array<(req: Request, res: Response, next: express.NextFunction) => void>;
    config: Partial<A_EXPRESS_TYPES__IDecoratorRouteConfig>;
}
export declare function A_EXPRESS_Get(params?: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams>): (target: any, propertyKey: string) => void;
export declare function A_EXPRESS_Post(params?: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams>): (target: any, propertyKey: string) => void;
export declare function A_EXPRESS_Put(params?: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams>): (target: any, propertyKey: string) => void;
export declare function A_EXPRESS_Delete(params?: Partial<A_EXPRESS_TYPES__IDecoratorRouteParams>): (target: any, propertyKey: string) => void;
export declare function A_EXPRESS_Routes(controllers: Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController>): express.Router;
export declare function A_EXPRESS_Routes(router: express.Router, controllers: Array<typeof A_EXPRESS_Controller | typeof A_EXPRESS_EntityController>): express.Router;
