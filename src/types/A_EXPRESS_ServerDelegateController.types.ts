import { A_SDK_ApiCredentials, A_SDK_App, A_SDK_User } from "@adaas/a-sdk"
import {
    A_EXPRESS_TYPES__IRequest,
    A_EXPRESS_TYPES__IRequestParams,
    A_EXPRESS_TYPES__IRequestQueryParams,
    A_EXPRESS_TYPES__IResponse
} from "./A_EXPRESS_Controller.types"
import { A_AUTH_ServerDelegateAuthenticator } from "@adaas/a-auth"
import { A_EXPRESS_TYPES__ICRUDControllerConfig } from "./A_EXPRESS_CRUDController.types"
import { A_SDK_TYPES__Dictionary } from "@adaas/a-sdk-types"


export type A_EXPRESS_TYPES__SERVER_DELEGATE_IRequestQueryParams<T extends object = {}> = T & A_EXPRESS_TYPES__IRequestQueryParams

export type A_EXPRESS_TYPES__SERVER_DELEGATE_IRequestParams<T extends Array<string> = []> = {
    [key in T[number]]: string
} & A_EXPRESS_TYPES__IRequestParams

export interface A_EXPRESS_TYPES__SERVER_DELEGATE_IResponse<_ResponseType = any> extends A_EXPRESS_TYPES__IResponse<_ResponseType> {
}


export interface A_EXPRESS_TYPES__SERVER_DELEGATE_ControllerConfig<_DBEntityType extends A_SDK_TYPES__Dictionary<any>>
    extends A_EXPRESS_TYPES__ICRUDControllerConfig<_DBEntityType, A_EXPRESS_TYPES__SERVER_DELEGATE_IRequest> {
}


export interface A_EXPRESS_TYPES__SERVER_DELEGATE_IRequest<
    _ReqBodyType = any,
    _AccessKeys extends Array<string> = ['default'],
    _ResourcesKeys extends Array<string> = ['default'],
    _PermissionsKeys extends string[] = [],
    T extends A_EXPRESS_TYPES__SERVER_DELEGATE_IRequestQueryParams = A_EXPRESS_TYPES__SERVER_DELEGATE_IRequestQueryParams,
    P extends A_EXPRESS_TYPES__SERVER_DELEGATE_IRequestParams = A_EXPRESS_TYPES__SERVER_DELEGATE_IRequestParams
> extends A_EXPRESS_TYPES__IRequest<_ReqBodyType, T, P, _AccessKeys, _ResourcesKeys, _PermissionsKeys> {
    params: P,
    query: T,
    adaas: {

        /**
         * The user on behalf of which the request is made
         */
        user: A_SDK_User

        /**
         * The API credentials that used to access the resources
         */
        api: A_SDK_ApiCredentials


        /**
         * The app that attached to API credentials
         */
        app: A_SDK_App

        /**
         * the selected Scope ASEID that used to access the resources
         */
        scope: string,

        /**
         * A set of all roles ASEIDs that attached to actor
         */
        roles: Array<string>,

        /**
         * The authenticator that used to access the resources on behalf of the user
         * this authenticator is mandatory for all ServerDelegate requests
         */
        authenticator: A_AUTH_ServerDelegateAuthenticator

    } & A_EXPRESS_TYPES__IRequest<_ReqBodyType, T, P, _AccessKeys, _ResourcesKeys, _PermissionsKeys>['adaas'],
}
