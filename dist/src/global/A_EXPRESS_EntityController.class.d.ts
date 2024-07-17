import { NextFunction } from "express";
import { A_SDK_TYPES__Dictionary, A_SDK_TYPES__Required } from "@adaas/a-sdk-types";
import { A_EXPRESS_TYPES__IControllerRepository, A_EXPRESS_TYPES__EntityControllerConfig, A_EXPRESS_TYPES__EntityController_GetConfig, A_EXPRESS_TYPES__EntityController_ListConfig } from "../types/A_EXPRESS_EntityController.types";
import { A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from "../types/A_EXPRESS_Controller.types";
import { A_EXPRESS_Controller } from "./A_EXPRESS_Controller.class";
/**
 *
 * This class exists ONLY to simplify development. It might be used to simplify access to DB via external operations
 *
 * So basically it's applicable ONLY for TypeORM provider and NOT for others
 *
 * Yes, it's possible to override properties and use it anyway. so....
 *
 *
 * TODO: If any better way would be found -> override or DELETE the class
 *
 *
 */
export declare class A_EXPRESS_EntityController<_RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _DBEntityType extends A_SDK_TYPES__Dictionary<any> = A_SDK_TYPES__Dictionary<any>, _RepositoryType extends A_EXPRESS_TYPES__IControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__IControllerRepository<_DBEntityType>> extends A_EXPRESS_Controller {
    config: A_SDK_TYPES__Required<Partial<A_EXPRESS_TYPES__EntityControllerConfig<_DBEntityType>>, [
        'entity'
    ]>;
    protected repository?: _RepositoryType;
    protected get getConfig(): A_EXPRESS_TYPES__EntityController_GetConfig<_DBEntityType>;
    protected get listConfig(): A_EXPRESS_TYPES__EntityController_ListConfig<_DBEntityType>;
    list(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next?: NextFunction): Promise<any>;
    post(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: NextFunction): Promise<any>;
    put(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: NextFunction): Promise<any>;
    get(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: NextFunction): Promise<any>;
    delete(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: NextFunction): Promise<any>;
}
