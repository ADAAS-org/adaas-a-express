import { A_SDK_TYPES__Dictionary } from "@adaas/a-sdk-types";
import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from "../types/A_EXPRESS_Controller.types";
import { A_EXPRESS_TYPES__ICRUDController, A_EXPRESS_TYPES__ICRUDControllerConfig, A_EXPRESS_TYPES__ICRUDControllerRepository } from '../types/A_EXPRESS_CRUDController.types';
import { A_EXPRESS_App } from "./A_EXPRESS_App.class";
/**
 *
 * This class exists ONLY to simplify development. It might be used to simplify access to DB via external operations
 *
 */
export declare class A_EXPRESS_CRUDController<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = A_SDK_TYPES__Dictionary<any>, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _RepositoryType extends A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType>> implements A_EXPRESS_TYPES__ICRUDController<_DBEntityType, _RequestType> {
    context: A_EXPRESS_App;
    config: A_EXPRESS_TYPES__ICRUDControllerConfig<_DBEntityType, _RequestType>;
    repository: _RepositoryType;
    constructor(context: A_EXPRESS_App, config: A_EXPRESS_TYPES__ICRUDControllerConfig<_DBEntityType, _RequestType>, repository: _RepositoryType);
    get entity(): string;
    list(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    post(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    put(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    get(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    delete(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
}
