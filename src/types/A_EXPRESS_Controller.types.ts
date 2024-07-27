import { Request, Response, NextFunction } from 'express';
import { A_SDK_ApiCredentials, A_SDK_App, A_SDK_User } from '@adaas/a-sdk';
import { A_SDK_Error } from '@adaas/a-sdk-types';


export type A_EXPRESS_TYPES__IRequestQueryParams<T extends string[] = []> = {
    [key in T[number]]: string;
} & {
    page?: number,
    pageSize?: number
    search?: string
}

export type A_EXPRESS_TYPES__IRequestParams<T extends string[] = ['aseid', 'id']> = {
    [key in T[number]]: string
}



export interface A_EXPRESS_TYPES__IResponse<_ResponseType = any> extends Response<_ResponseType, any> {
}

export interface A_EXPRESS_TYPES__INextFunction extends NextFunction {
    (err?: A_SDK_Error): void;
}


export interface A_EXPRESS_TYPES__ControllerConfig {
    id: 'ASEID' | 'ID',
    http: {
        base: string,
        /**
         * allows to ignore the default methods in case when they are not needed OR NOT ALLOWED
         */
        expose?: Array<'get' | 'post' | 'put' | 'delete' | 'list'>,
        ignore?: Array<'get' | 'post' | 'put' | 'delete' | 'list'>,
    }
    auth: {
        enable: boolean,
    },
    arc: {
        enable: boolean,
    }
}



export interface A_EXPRESS_TYPES__IRequest<
    _ReqBodyType = any,
    T extends A_EXPRESS_TYPES__IRequestQueryParams = A_EXPRESS_TYPES__IRequestQueryParams,
    P extends A_EXPRESS_TYPES__IRequestParams = A_EXPRESS_TYPES__IRequestParams,
    _AccessKeys extends Array<string> = ['default'],
    _ResourcesKeys extends Array<string> = ['default'],
    _PermissionsKeys extends Array<string> = [],
> extends Request<P, any, _ReqBodyType, T> {
    params: P,
    query: T,
    adaas: {


        user?: A_SDK_User

        /**
         * The API credentials that used to access the resources
         */
        api?: A_SDK_ApiCredentials


        /**
         * The app that attached to API credentials
         */
        app?: A_SDK_App

        /**
         * the selected Scope ASEID that used to access the resources
         */
        scope: string,

        /**
         * A set of all roles ASEIDs that attached to actor
         */
        roles: Array<string>,


        /**
         * A set of properties that related to the ARC
         */
        arc: Partial<{
            resources: {
                [key in _ResourcesKeys[number]]: Array<string>
            },
            access: {
                [key in _AccessKeys[number]]: boolean
            },
            permissions: {
                [key in _PermissionsKeys[number]]: boolean
            }
        }>
    }
}


export interface A_EXPRESS_TYPES__IController {

    logAlias: string
    // dataSource: DataSource

    get(req: A_EXPRESS_TYPES__IRequest<any, A_EXPRESS_TYPES__IRequestQueryParams, A_EXPRESS_TYPES__IRequestParams>, res: Response, next: NextFunction): void
    post(req: A_EXPRESS_TYPES__IRequest<any, A_EXPRESS_TYPES__IRequestQueryParams, A_EXPRESS_TYPES__IRequestParams>, res: Response, next: NextFunction): void
    put(req: A_EXPRESS_TYPES__IRequest<any, A_EXPRESS_TYPES__IRequestQueryParams, A_EXPRESS_TYPES__IRequestParams>, res: Response, next: NextFunction): void
    delete(req: A_EXPRESS_TYPES__IRequest<any, A_EXPRESS_TYPES__IRequestQueryParams, A_EXPRESS_TYPES__IRequestParams>, res: Response, next: NextFunction): void
}
