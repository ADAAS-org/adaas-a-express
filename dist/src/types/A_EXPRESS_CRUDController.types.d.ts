import { A_SDK_TYPES__DeepPartial, A_SDK_TYPES__Dictionary, A_SDK_TYPES__IDefaultPagination, A_SDK_TYPES__IRequestPagination, A_SDK_TYPES__ObjectKeyEnum, A_SDK_TYPES__Paths } from "@adaas/a-sdk-types";
import { A_EXPRESS_TYPES__IController, A_EXPRESS_TYPES__IControllerConfig, A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from "./A_EXPRESS_Controller.types";
import { A_ARC_MaskQueryBuilder, A_ARC_Permission } from "@adaas/a-arc";
import { A_EXPRESS_CRUDController } from "../global/A_EXPRESS_CRUDController.class";
export interface A_EXPRESS_TYPES__ICRUDController<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _ContextType extends A_EXPRESS_CRUDController<_DBEntityType, _RequestType> = any> extends A_EXPRESS_TYPES__IController {
    config: A_EXPRESS_TYPES__ICRUDControllerConfig<_DBEntityType, _RequestType, _ContextType>;
    get(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): void;
    post(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): void;
    put(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): void;
    delete(req: _RequestType, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction): void;
}
export interface A_EXPRESS_TYPES__ISearchOptions {
    pattern: string | undefined;
    include: string[];
}
export interface A_EXPRESS_TYPES__IGetPageOptions {
    pagination?: Partial<A_SDK_TYPES__IRequestPagination>;
    search?: A_EXPRESS_TYPES__ISearchOptions;
}
export interface A_EXPRESS_TYPES__IARCRequestParam<_ContextType extends A_EXPRESS_CRUDController<any, _RequestType>, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest> {
    resources?: (self: _ContextType, qb: A_ARC_MaskQueryBuilder, req: _RequestType) => A_ARC_MaskQueryBuilder;
    access: (self: _ContextType, qb: A_ARC_MaskQueryBuilder, req: _RequestType) => A_ARC_MaskQueryBuilder;
    permissions: (self: _ContextType, req: _RequestType) => A_ARC_Permission[];
}
export interface A_EXPRESS_TYPES__ICRUDControllerRepository<T> {
    findOne(...args: any): Promise<T | null>;
    findOneOrFail(...args: any): Promise<T>;
    create(...args: any): T;
    save(...args: any): Promise<T>;
    delete(...args: any): Promise<any>;
    update(...args: any): Promise<any>;
    /**
     * Method receives data and returns response with pagination
     *
     */
    getPage(props: A_EXPRESS_TYPES__IGetPageOptions & {
        [key: string]: any;
    }): Promise<A_SDK_TYPES__IDefaultPagination<T>>;
}
export type A_EXPRESS_TYPES__Controller_ListConfig<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _ContextType extends A_EXPRESS_CRUDController<_DBEntityType, _RequestType> = A_EXPRESS_CRUDController<_DBEntityType, _RequestType>, _WhereType = any> = {
    relations: Array<A_SDK_TYPES__Paths<_DBEntityType>>;
    searchFields: Array<A_SDK_TYPES__Paths<_DBEntityType>>;
    order: A_SDK_TYPES__ObjectKeyEnum<_DBEntityType, 'DESC' | 'ASC'>;
    arc: A_EXPRESS_TYPES__IARCRequestParam<_ContextType, _RequestType>;
    where: (self: _ContextType, req: _RequestType) => Promise<_WhereType | Array<_WhereType>>;
};
export type A_EXPRESS_TYPES__Controller_GetConfig<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _ContextType extends A_EXPRESS_CRUDController<_DBEntityType, _RequestType> = A_EXPRESS_CRUDController<_DBEntityType, _RequestType>, _WhereType = any> = {
    relations: Array<A_SDK_TYPES__Paths<_DBEntityType>>;
    order: A_SDK_TYPES__ObjectKeyEnum<_DBEntityType, 'DESC' | 'ASC'>;
    arc: A_EXPRESS_TYPES__IARCRequestParam<_ContextType, _RequestType>;
    where: (self: _ContextType, req: _RequestType) => Promise<_WhereType | Array<_WhereType>>;
};
export type A_EXPRESS_TYPES__Controller_PostConfig<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _ContextType extends A_EXPRESS_CRUDController<_DBEntityType, _RequestType> = A_EXPRESS_CRUDController<_DBEntityType, _RequestType>> = {
    relations: Array<A_SDK_TYPES__Paths<_DBEntityType>>;
    extend: (req: _RequestType) => Promise<A_SDK_TYPES__DeepPartial<_DBEntityType>>;
    arc: A_EXPRESS_TYPES__IARCRequestParam<_ContextType, _RequestType>;
};
export type A_EXPRESS_TYPES__Controller_PutConfig<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _ContextType extends A_EXPRESS_CRUDController<_DBEntityType, _RequestType> = A_EXPRESS_CRUDController<_DBEntityType, _RequestType>, _WhereType = any> = {
    relations: Array<A_SDK_TYPES__Paths<_DBEntityType>>;
    where: (self: _ContextType, req: _RequestType) => Promise<_WhereType | Array<_WhereType>>;
    extend: (req: _RequestType) => Promise<A_SDK_TYPES__DeepPartial<_DBEntityType>>;
    arc: A_EXPRESS_TYPES__IARCRequestParam<_ContextType, _RequestType>;
};
export type A_EXPRESS_TYPES__Controller_DeleteConfig<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _ContextType extends A_EXPRESS_CRUDController<_DBEntityType, _RequestType> = A_EXPRESS_CRUDController<_DBEntityType, _RequestType>, _WhereType = any> = {
    where: (self: _ContextType, req: _RequestType) => Promise<_WhereType | Array<_WhereType>>;
    arc: A_EXPRESS_TYPES__IARCRequestParam<_ContextType, _RequestType>;
};
export interface A_EXPRESS_TYPES__ICRUDControllerConfig<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _ContextType extends A_EXPRESS_CRUDController<_DBEntityType, _RequestType> = A_EXPRESS_CRUDController<_DBEntityType, _RequestType>> extends A_EXPRESS_TYPES__IControllerConfig {
    http: {
        /**
         * Uses to change the basic entity name in the path
         * e.g. migrate from entity "user" -> "users"
         *
         * NOTE: in case alias is presented, the entity name will be changed in the path from Entity parameter to alias
         */
        alias?: string | ((self: _ContextType) => string);
        /**
         * allows to ignore the default methods in case when they are not needed OR NOT ALLOWED
         */
        expose?: Array<'get' | 'post' | 'put' | 'delete' | 'list' | string>;
        /**
         * Allows to ignore any method presented in the controller to do not be exposed
         */
        ignore?: Array<'get' | 'post' | 'put' | 'delete' | 'list' | string>;
        /**
         * The base path for the entity controller that adds after Identifier
         */
        subPath?: string;
    } & A_EXPRESS_TYPES__IControllerConfig['http'];
    list: A_EXPRESS_TYPES__Controller_ListConfig<_DBEntityType, _RequestType, _ContextType>;
    get: A_EXPRESS_TYPES__Controller_GetConfig<_DBEntityType, _RequestType, _ContextType>;
    post: A_EXPRESS_TYPES__Controller_PostConfig<_DBEntityType, _RequestType, _ContextType>;
    put: A_EXPRESS_TYPES__Controller_PutConfig<_DBEntityType, _RequestType, _ContextType>;
    delete: A_EXPRESS_TYPES__Controller_DeleteConfig<_DBEntityType, _RequestType, _ContextType>;
}
