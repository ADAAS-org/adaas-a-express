import { A_SDK_ApiCredentials, A_SDK_App } from "@adaas/a-sdk"
import {
    A_EXPRESS_TYPES__IRequest,
    A_EXPRESS_TYPES__IRequestParams,
    A_EXPRESS_TYPES__IRequestQueryParams,
    A_EXPRESS_TYPES__IResponse
} from "./A_EXPRESS_Controller.types"
import { A_EXPRESS_TYPES__EntityControllerConfig } from "./A_EXPRESS_EntityController.types"


export type A_EXPRESS_TYPES__SERVER_COMMANDS_IRequestQueryParams<T extends object ={}> = T & A_EXPRESS_TYPES__IRequestQueryParams

export type A_EXPRESS_TYPES__SERVER_COMMANDS_IRequestParams<T extends Array<string> = []> = {
    [key in T[number]]: string
} & A_EXPRESS_TYPES__IRequestParams

export interface A_EXPRESS_TYPES__SERVER_COMMANDS_IResponse<_ResponseType = any> extends A_EXPRESS_TYPES__IResponse<_ResponseType> {
}



export interface A_EXPRESS_TYPES__SERVER_COMMANDS_ControllerConfig<_DBEntityType> extends A_EXPRESS_TYPES__EntityControllerConfig<_DBEntityType, A_EXPRESS_TYPES__SERVER_COMMANDS_IRequest> {
}


export interface A_EXPRESS_TYPES__SERVER_COMMANDS_IRequest<
    _ReqBodyType = any,
    _AccessKeys extends Array<string> = ['default'],
    _ResourcesKeys extends Array<string> = ['default'],
    P extends A_EXPRESS_TYPES__SERVER_COMMANDS_IRequestParams = A_EXPRESS_TYPES__SERVER_COMMANDS_IRequestParams,
    T extends A_EXPRESS_TYPES__SERVER_COMMANDS_IRequestQueryParams = A_EXPRESS_TYPES__SERVER_COMMANDS_IRequestQueryParams,
> extends A_EXPRESS_TYPES__IRequest<_ReqBodyType, T, P, _AccessKeys, _ResourcesKeys> {
    params: P,
    query: T,
    adaas: {

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


    } & A_EXPRESS_TYPES__IRequest<_ReqBodyType, T, P, _AccessKeys, _ResourcesKeys>['adaas'],
}
