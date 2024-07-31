
import { A_SDK_CommonHelper, A_SDK_TYPES__DeepPartial, A_SDK_TYPES__Dictionary } from '@adaas/a-sdk-types';
import {
    A_EXPRESS_TYPES__IControllerConfig,
    A_EXPRESS_TYPES__IRequest
} from '../types/A_EXPRESS_Controller.types';
import {
    A_EXPRESS_Storage,
    A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_CONFIG_KEY,
    A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ENTITY_KEY,
    A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_REPOSITORY_KEY,
    A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY
} from '../storage/A_EXPRESS_Decorators.storage';
import {
    A_EXPRESS_TYPES__ICRUDControllerConfig,
    A_EXPRESS_TYPES__ICRUDControllerRepository
} from '../types/A_EXPRESS_CRUDController.types';
import { A_EXPRESS_DEFAULTS__CURD_CONFIG } from '../defaults/A_EXPRESS_CRUDController.defaults';
import { A_EXPRESS_DEFAULTS__CONTROLLER_CONFIG } from '../defaults/A_EXPRESS_Controller.defaults';

export function A_EXPRESS_ControllerDefinition<
    _DBEntityType extends A_SDK_TYPES__Dictionary<any> = any,
    _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest,
    _RepositoryType extends A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType>,
>(
    entity?: string,
    repository?: any,
    config?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ICRUDControllerConfig<
        _DBEntityType,
        _RequestType
    >>
) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T): T {

        const existedMeta = A_EXPRESS_Storage.get(constructor) || new Map();

        existedMeta.set(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_CONFIG_KEY, config);
        existedMeta.set(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_REPOSITORY_KEY, repository);
        existedMeta.set(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ENTITY_KEY, entity);

        const inheritMeta = A_EXPRESS_Storage.get(Object.getPrototypeOf(constructor)) || new Map();

        const inheritRoutes = inheritMeta.get(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY) || [];

        if (!existedMeta.has(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY)) {
            existedMeta.set(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ROUTES_KEY, [
                ...inheritRoutes
            ]);
        }

        A_EXPRESS_Storage.set(constructor, existedMeta);

        return constructor;
    };
}

export function A_EXPRESS_Controller<
    _DBEntityType extends A_SDK_TYPES__Dictionary<any> = any,
    _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest,
    _RepositoryType extends A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType>,
>(
)

export function A_EXPRESS_Controller<
    _DBEntityType extends A_SDK_TYPES__Dictionary<any> = any,
    _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest,
    _RepositoryType extends A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType>,
>(
    config: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__IControllerConfig>
)
export function A_EXPRESS_Controller<
    _DBEntityType extends A_SDK_TYPES__Dictionary<any> = any,
    _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest,
    _RepositoryType extends A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType>,
>(
    config?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__IControllerConfig>
) {

    return A_EXPRESS_ControllerDefinition(
        undefined,
        undefined,
        A_SDK_CommonHelper.deepCloneAndMerge(
            {
                ... (config || {})
            },
            A_EXPRESS_DEFAULTS__CONTROLLER_CONFIG)
    );
}


export function A_EXPRESS_ServerDelegate<
    _DBEntityType extends A_SDK_TYPES__Dictionary<any> = any,
    _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest,
    _RepositoryType extends A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType>,
>(
    entity: string,
    repository: _RepositoryType,
    config: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ICRUDControllerConfig<
        _DBEntityType,
        _RequestType
    >>
) {

    return A_EXPRESS_ControllerDefinition(entity, repository, A_SDK_CommonHelper.deepCloneAndMerge({
        ...config,
        http: {
            ...(config.http || {}),
            base: '/-s-dlg-' + (config?.http?.base || ''),
        }
    }, A_EXPRESS_DEFAULTS__CURD_CONFIG as any));
}


export function A_EXPRESS_ServerCommands<
    _DBEntityType extends A_SDK_TYPES__Dictionary<any> = any,
    _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest,
    _RepositoryType extends A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType>,
>(
    entity: string,
    repository: _RepositoryType,
    config: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ICRUDControllerConfig<
        _DBEntityType,
        _RequestType
    >>
) {
    return A_EXPRESS_ControllerDefinition(entity, repository, A_SDK_CommonHelper.deepCloneAndMerge({
        ...config,
        http: {
            ...(config.http || {}),
            base: '/-s-cmd-' + (config?.http?.base || ''),
        }
    }, A_EXPRESS_DEFAULTS__CURD_CONFIG as any));
}


export function A_EXPRESS_AppInteractions<
    _DBEntityType extends A_SDK_TYPES__Dictionary<any> = any,
    _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest,
    _RepositoryType extends A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType>,
>(
    entity: string,
    repository: _RepositoryType,
    config: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__ICRUDControllerConfig<
        _DBEntityType,
        _RequestType
    >>
) {
    return A_EXPRESS_ControllerDefinition(entity, repository, A_SDK_CommonHelper.deepCloneAndMerge(config, A_EXPRESS_DEFAULTS__CURD_CONFIG as any));
}