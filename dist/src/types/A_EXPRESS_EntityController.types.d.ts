import { A_SDK_TYPES__ObjectKeyEnum, A_SDK_TYPES__IDefaultPagination, A_SDK_TYPES__IRequestPagination } from '@adaas/a-sdk-types';
import { A_EXPRESS_TYPES__ControllerConfig } from './A_EXPRESS_Controller.types';
export interface A_EXPRESS_TYPES__SearchOptions {
    pattern: string | undefined;
    include: string[];
}
export interface A_EXPRESS_TYPES__GetPageOptions<T> {
    pagination?: Partial<A_SDK_TYPES__IRequestPagination>;
    search?: A_EXPRESS_TYPES__SearchOptions;
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
export type A_EXPRESS_TYPES__EntityController_ListConfig<_DBEntityType = any, _WhereType = any> = {
    relations: Array<string>;
    searchFields: Array<string>;
    order: A_SDK_TYPES__ObjectKeyEnum<_DBEntityType, 'DESC' | 'ASK'>;
    where: (req: any) => Promise<_WhereType | Array<_WhereType>>;
};
export type A_EXPRESS_TYPES__EntityController_GetConfig<_DBEntityType = any, _WhereType = any> = {
    relations: Array<string>;
    order: A_SDK_TYPES__ObjectKeyEnum<_DBEntityType, 'DESC' | 'ASK'>;
    where: (req: any) => Promise<_WhereType | Array<_WhereType>>;
};
export interface A_EXPRESS_TYPES__EntityControllerConfig<_DBEntityType> extends A_EXPRESS_TYPES__ControllerConfig {
    list: Partial<A_EXPRESS_TYPES__EntityController_ListConfig<_DBEntityType>>;
    get: Partial<A_EXPRESS_TYPES__EntityController_GetConfig<_DBEntityType>>;
}
