import { A_SDK_TYPES__DeepPartial, A_SDK_TYPES__Dictionary } from "@adaas/a-sdk-types";
import { A_EXPRESS_TYPES__EntityControllerConfig, A_EXPRESS_TYPES__IControllerRepository } from "../types/A_EXPRESS_EntityController.types";
import { A_EXPRESS_EntityController } from "./A_EXPRESS_EntityController.class";
import { A_EXPRESS_TYPES__SERVER_DELEGATE_IRequest } from "../types/A_EXPRESS_ServerDelegateController.types";
export declare class A_EXPRESS_ServerDelegateController<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = A_SDK_TYPES__Dictionary<any>, _RepositoryType extends A_EXPRESS_TYPES__IControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__IControllerRepository<_DBEntityType>, _RequestType extends A_EXPRESS_TYPES__SERVER_DELEGATE_IRequest = A_EXPRESS_TYPES__SERVER_DELEGATE_IRequest> extends A_EXPRESS_EntityController<A_EXPRESS_TYPES__SERVER_DELEGATE_IRequest, _DBEntityType, _RepositoryType> {
    constructor(config?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__EntityControllerConfig<_DBEntityType, _RequestType>>);
}