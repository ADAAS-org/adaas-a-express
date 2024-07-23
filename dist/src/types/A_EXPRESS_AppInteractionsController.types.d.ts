import { A_SDK_User } from "@adaas/a-sdk";
import { A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IRequestParams, A_EXPRESS_TYPES__IRequestQueryParams, A_EXPRESS_TYPES__IResponse } from "./A_EXPRESS_Controller.types";
import { A_EXPRESS_TYPES__EntityControllerConfig } from "./A_EXPRESS_EntityController.types";
export interface A_EXPRESS_TYPES__APP_INTERACTIONS_IRequestQueryParams extends A_EXPRESS_TYPES__IRequestQueryParams {
}
export interface A_EXPRESS_TYPES__APP_INTERACTIONS_IRequestParams extends A_EXPRESS_TYPES__IRequestParams {
}
export interface A_EXPRESS_TYPES__APP_INTERACTIONS_IResponse<_ResponseType = any> extends A_EXPRESS_TYPES__IResponse<_ResponseType> {
}
export interface A_EXPRESS_TYPES__APP_INTERACTIONS_ControllerConfig<_DBEntityType> extends A_EXPRESS_TYPES__EntityControllerConfig<_DBEntityType> {
}
export interface A_EXPRESS_TYPES__APP_INTERACTIONS_IRequest<_ReqBodyType = any, _AccessKeys extends string[] = ['default'], _ResourcesKeys extends string[] = ['default'], T extends A_EXPRESS_TYPES__APP_INTERACTIONS_IRequestQueryParams = A_EXPRESS_TYPES__APP_INTERACTIONS_IRequestQueryParams, P extends A_EXPRESS_TYPES__APP_INTERACTIONS_IRequestParams = A_EXPRESS_TYPES__APP_INTERACTIONS_IRequestParams> extends A_EXPRESS_TYPES__IRequest<_ReqBodyType, T, P, _AccessKeys, _ResourcesKeys> {
    params: P;
    query: T;
    adaas: {
        /**
         * the user that used to access the resources
         */
        user: A_SDK_User;
        /**
         * the selected Scope ASEID that used to access the resources
         */
        scope: string;
        /**
         * A set of all roles ASEIDs that attached to actor
         */
        roles: Array<string>;
    } & A_EXPRESS_TYPES__IRequest<_ReqBodyType, T, P, _AccessKeys, _ResourcesKeys>['adaas'];
    /**
     * The hash of the agent that used to access the resources
     */
    agentHash: string;
}
