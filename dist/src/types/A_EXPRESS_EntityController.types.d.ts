import { A_SDK_TYPES__ObjectKeyEnum, A_SDK_TYPES__IDefaultPagination, A_SDK_TYPES__IRequestPagination, A_SDK_TYPES__Paths, A_SDK_TYPES__DeepPartial } from '@adaas/a-sdk-types';
import { A_EXPRESS_TYPES__ControllerConfig, A_EXPRESS_TYPES__IRequest } from './A_EXPRESS_Controller.types';
import { A_ARC_MaskQueryBuilder, A_ARC_Permission } from '@adaas/a-arc';
export interface A_EXPRESS_TYPES__SearchOptions {
    pattern: string | undefined;
    include: string[];
}
export interface A_EXPRESS_TYPES__GetPageOptions<T> {
    pagination?: Partial<A_SDK_TYPES__IRequestPagination>;
    search?: A_EXPRESS_TYPES__SearchOptions;
}
export interface A_EXPRESS_TYPES__IARCRequestParam<_ContextType = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest> {
    resources: (self: _ContextType, qb: A_ARC_MaskQueryBuilder, req: _RequestType) => A_ARC_MaskQueryBuilder;
    access: (self: _ContextType, qb: A_ARC_MaskQueryBuilder, req: _RequestType) => A_ARC_MaskQueryBuilder;
    permissions: (self: _ContextType, req: _RequestType) => A_ARC_Permission[];
}
export interface A_EXPRESS_TYPES__IControllerRepository<T> {
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
    getPage(props: A_EXPRESS_TYPES__GetPageOptions<T> & {
        [key: string]: any;
    }): Promise<A_SDK_TYPES__IDefaultPagination<T>>;
}
export type A_EXPRESS_TYPES__EntityController_ListConfig<_DBEntityType = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _ContextType = any, _WhereType = any> = {
    relations: Array<A_SDK_TYPES__Paths<_DBEntityType>>;
    searchFields: Array<A_SDK_TYPES__Paths<_DBEntityType>>;
    order: A_SDK_TYPES__ObjectKeyEnum<_DBEntityType, 'DESC' | 'ASC'>;
    arc: A_EXPRESS_TYPES__IARCRequestParam<_ContextType, _RequestType>;
    where: (self: _ContextType, req: _RequestType) => Promise<_WhereType | Array<_WhereType>>;
};
export type A_EXPRESS_TYPES__EntityController_GetConfig<_DBEntityType = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _ContextType = any, _WhereType = any> = {
    relations: Array<A_SDK_TYPES__Paths<_DBEntityType>>;
    order: A_SDK_TYPES__ObjectKeyEnum<_DBEntityType, 'DESC' | 'ASC'>;
    arc: A_EXPRESS_TYPES__IARCRequestParam<_ContextType, _RequestType>;
    where: (self: _ContextType, req: _RequestType) => Promise<_WhereType | Array<_WhereType>>;
};
export type A_EXPRESS_TYPES__EntityController_PostConfig<_DBEntityType = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _ContextType = any> = {
    relations: Array<A_SDK_TYPES__Paths<_DBEntityType>>;
    extend: (req: _RequestType) => Promise<A_SDK_TYPES__DeepPartial<_DBEntityType>>;
    arc: A_EXPRESS_TYPES__IARCRequestParam<_ContextType, _RequestType>;
};
export type A_EXPRESS_TYPES__EntityController_PutConfig<_DBEntityType = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _ContextType = any, _WhereType = any> = {
    relations: Array<A_SDK_TYPES__Paths<_DBEntityType>>;
    where: (self: _ContextType, req: _RequestType) => Promise<_WhereType | Array<_WhereType>>;
    extend: (req: _RequestType) => Promise<A_SDK_TYPES__DeepPartial<_DBEntityType>>;
    arc: A_EXPRESS_TYPES__IARCRequestParam<_ContextType, _RequestType>;
};
export type A_EXPRESS_TYPES__EntityController_DeleteConfig<_DBEntityType = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _ContextType = any, _WhereType = any> = {
    where: (self: _ContextType, req: _RequestType) => Promise<_WhereType | Array<_WhereType>>;
    arc: A_EXPRESS_TYPES__IARCRequestParam<_ContextType, _RequestType>;
};
export interface A_EXPRESS_TYPES__EntityControllerConfig<_DBEntityType = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _ContextType = any> extends A_EXPRESS_TYPES__ControllerConfig {
    entity: string;
    list: A_EXPRESS_TYPES__EntityController_ListConfig<_DBEntityType, _RequestType, _ContextType>;
    get: A_EXPRESS_TYPES__EntityController_GetConfig<_DBEntityType, _RequestType, _ContextType>;
    post: A_EXPRESS_TYPES__EntityController_PostConfig<_DBEntityType, _RequestType, _ContextType>;
    put: A_EXPRESS_TYPES__EntityController_PutConfig<_DBEntityType, _RequestType, _ContextType>;
    delete: A_EXPRESS_TYPES__EntityController_DeleteConfig<_DBEntityType, _RequestType, _ContextType>;
}
