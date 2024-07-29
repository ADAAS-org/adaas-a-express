import { A_SDK_TYPES__DeepPartial, A_SDK_TYPES__Dictionary } from '@adaas/a-sdk-types';
import { A_EXPRESS_TYPES__IControllerConfig, A_EXPRESS_TYPES__IRequest } from '../types/A_EXPRESS_Controller.types';
import { A_EXPRESS_TYPES__ICRUDControllerConfig, A_EXPRESS_TYPES__ICRUDControllerRepository } from '../types/A_EXPRESS_CRUDController.types';
export declare function A_EXPRESS_ControllerDefinition<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _RepositoryType extends A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType>>(entity?: string, repository?: any, config?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ICRUDControllerConfig<_DBEntityType, _RequestType>>): <T extends {
    new (...args: any[]): {};
}>(constructor: T) => T;
export declare function A_EXPRESS_Controller<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _RepositoryType extends A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType>>(): any;
export declare function A_EXPRESS_Controller<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _RepositoryType extends A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType>>(config: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__IControllerConfig>): any;
export declare function A_EXPRESS_ServerDelegate<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _RepositoryType extends A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType>>(entity: string, repository: _RepositoryType, config: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ICRUDControllerConfig<_DBEntityType, _RequestType>>): <T extends new (...args: any[]) => {}>(constructor: T) => T;
export declare function A_EXPRESS_ServerCommands<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _RepositoryType extends A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType>>(entity: string, repository: _RepositoryType, config: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ICRUDControllerConfig<_DBEntityType, _RequestType>>): <T extends new (...args: any[]) => {}>(constructor: T) => T;
export declare function A_EXPRESS_AppInteractions<_DBEntityType extends A_SDK_TYPES__Dictionary<any> = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _RepositoryType extends A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType>>(entity: string, repository: _RepositoryType, config: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ICRUDControllerConfig<_DBEntityType, _RequestType>>): <T extends new (...args: any[]) => {}>(constructor: T) => T;