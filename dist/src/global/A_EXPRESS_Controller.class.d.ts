import 'reflect-metadata';
import { A_SDK_TYPES__DeepPartial, A_SDK_TYPES__Dictionary } from "@adaas/a-sdk-types";
import { A_EXPRESS_TYPES__IController, A_EXPRESS_TYPES__IControllerRepository, A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from "../types/A_EXPRESS_Controller.types";
import { A_EXPRESS_App } from "./A_EXPRESS_App.class";
import { A_EXPRESS_TYPES__IControllerConfig } from '../types/A_EXPRESS_ControllerConfig.types';
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
export declare class A_EXPRESS_BaseController<_RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _DBEntityType extends A_SDK_TYPES__Dictionary<any> = A_SDK_TYPES__Dictionary<any>, _RepositoryType extends A_EXPRESS_TYPES__IControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__IControllerRepository<_DBEntityType>> implements A_EXPRESS_TYPES__IController {
    protected context: A_EXPRESS_App;
    protected repository: _RepositoryType;
    protected config: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__IControllerConfig<_DBEntityType, _RequestType>>;
    constructor(context: A_EXPRESS_App, repository: _RepositoryType, config: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__IControllerConfig<_DBEntityType, _RequestType>>);
    list(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    post(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    put(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    get(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
    delete(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): Promise<any>;
}
