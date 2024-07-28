import 'reflect-metadata';
import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
export declare const A_EXPRESS_TYPES__ROUTES_KEY: unique symbol;
export type A_EXPRESS_TYPES__RouteDefinition = {
    handlerName: string;
} & A_EXPRESS_TYPES__IDecoratorRouteParam;
export type A_EXPRESS_TYPES__IDecoratorRouteParam = {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    middlewares: Array<(req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction) => void>;
    config: Partial<A_EXPRESS_TYPES__IDecoratorRouteConfig>;
};
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
