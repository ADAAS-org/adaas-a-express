import express from 'express';
import { A_EXPRESS_TYPES__IController } from '../types/A_EXPRESS_Controller.types';
import { A_EXPRESS_App } from '../global/A_EXPRESS_App.class';
import { A_EXPRESS_TYPES__ICRUDController } from '../types/A_EXPRESS_CRUDController.types';
import { A_EXPRESS_CRUDController } from '../global/A_EXPRESS_CRUDController.class';
type Constructor<T = {}> = new (...args: any[]) => T;
export type A_EXPRESS_TYPES__PossibleControllers<T> = Constructor<T> | T | {
    new (...args: any): any;
} | {
    new (...args: any): A_EXPRESS_TYPES__ICRUDController;
} | {
    new (...args: any): A_EXPRESS_TYPES__IController;
} | typeof A_EXPRESS_CRUDController;
export declare function A_EXPRESS_Routes<T extends object>(controllers: Array<A_EXPRESS_TYPES__PossibleControllers<T>>): express.Router;
export declare function A_EXPRESS_Routes<T extends object>(controllers: Array<A_EXPRESS_TYPES__PossibleControllers<T>>, app: A_EXPRESS_App): express.Router;
export declare function A_EXPRESS_Routes<T extends object>(router: express.Router, controllers: Array<A_EXPRESS_TYPES__PossibleControllers<T>>): express.Router;
export declare function A_EXPRESS_Routes<T extends object>(router: express.Router, controllers: Array<A_EXPRESS_TYPES__PossibleControllers<T>>, app: A_EXPRESS_App): express.Router;
export {};
