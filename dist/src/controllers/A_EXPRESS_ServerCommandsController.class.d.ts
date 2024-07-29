import { A_SDK_TYPES__DeepPartial, A_SDK_TYPES__Dictionary, A_SDK_TYPES__Required } from "@adaas/a-sdk-types";
import { A_EXPRESS_TYPES__IControllerRepository } from "../types/A_EXPRESS_EntityController.types";
import { A_EXPRESS_EntityController } from "./A_EXPRESS_EntityController.class";
import { A_EXPRESS_TYPES__SERVER_COMMANDS_ControllerConfig, A_EXPRESS_TYPES__SERVER_COMMANDS_IRequest } from "../types/A_EXPRESS_ServerCommandsController.types";
import { A_EXPRESS_App } from "../global/A_EXPRESS_App.class";
export declare class A_EXPRESS_ServerCommandsController<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = A_SDK_TYPES__Dictionary<any>, _RepositoryType extends A_EXPRESS_TYPES__IControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__IControllerRepository<_DBEntityType>, _RequestType extends A_EXPRESS_TYPES__SERVER_COMMANDS_IRequest = A_EXPRESS_TYPES__SERVER_COMMANDS_IRequest> extends A_EXPRESS_EntityController<_RequestType, _DBEntityType, _RepositoryType> {
    protected CUSTOM_CONFIG: A_SDK_TYPES__Required<A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__SERVER_COMMANDS_ControllerConfig<_DBEntityType>>, [
        'entity'
    ]>;
    constructor(context: A_EXPRESS_App, config?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__SERVER_COMMANDS_ControllerConfig<_DBEntityType>>);
}
