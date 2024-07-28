import { A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS } from "@adaas/a-arc";
import { A_EXPRESS_TYPES__EntityControllerConfig } from "../types/A_EXPRESS_EntityController.types";
import { A_EXPRESS_TYPES__IRequest } from "../types/A_EXPRESS_Controller.types";
import { A_EXPRESS_Context } from "../global/A_EXPRESS_Context.class";
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from "../constants/errors.constants";
import { A_SDK_CommonHelper } from "@adaas/a-sdk-types";


export const A_EXPRESS_DEFAULTS__ENTITY_CONTROLLER_CONFIG: A_EXPRESS_TYPES__EntityControllerConfig<any, A_EXPRESS_TYPES__IRequest> = {
    id: 'ASEID',
    entity: '',
    http: {
        base: '/',
        expose: ['post', 'get', 'put', 'delete', 'list']
    },
    auth: {
        enable: false,
    },
    arc: {
        enable: true,
    },
    list: {
        relations: [],
        searchFields: [],
        order: {
            created_at: 'DESC'
        },
        arc: {
            permissions: (self, req) => [],
            resources: (self, qb) => {
                if (!self.config.entity)
                    return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

                return qb
                    .entity(self.config.entity)
                    .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.LIST)
                    .allow();
            },
            access: (self, qb) => {
                return qb
                    .entity(self.config.entity)
                    .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.LIST)
                    .allow();
            }
        },
        where: async (self, req) => {
            if (self.config.identifierType === 'ID') {
                const { id } = A_SDK_CommonHelper.parseASEID(req.params.aseid);

                return { id: isNaN(parseInt(id)) ? id : parseInt(id) }
            }
            else {
                return { aseid: req.params.aseid }
            }
        }
    },
    get: {
        relations: [],
        order: {
            created_at: 'DESC'
        },
        arc: {
            permissions: (self, req) => [],
            resources: (self, qb) => qb,
            access: (self, qb, req) => {
                if (!self.config.entity)
                    return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

                const query = qb
                    .entity(self.config.entity)
                    .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.READ)
                    .allow();

                if (self.config.identifierType === 'ID')
                    query
                        .entity(self.config.entity)
                        .id(req.params.id);
                else
                    query
                        .resource(req.params.aseid);

                return query;
            }
        },
        where: async (self, req) => {
            if (self.config.id === 'ID') {
                return { id: req.adaas.arc!.resources!.default?.map(r => isNaN(parseInt(r)) ? r : parseInt(r)) }
            }
            else {
                return { aseid: req.adaas.arc!.resources!.default }
            }
        }
    },
    post: {
        relations: [],
        extend: async () => ({} as any),
        arc: {
            permissions: (self, req) => [],
            resources: (self, qb) => qb,
            access: (self, qb) => {
                if (!self.config.entity)
                    return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

                return qb
                    .entity(self.config.entity)
                    .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.CREATE)
                    .allow();
            }
        },
    },
    put: {
        relations: [],
        where: async (self, req) => {
            if (self.config.identifierType === 'ID') {
                return { id: isNaN(parseInt(req.params.id)) ? req.params.id : parseInt(req.params.id) }
            }
            else {
                return { aseid: req.params.aseid }
            }
        },
        extend: async (req) => ({} as any),
        arc: {
            permissions: (self, req) => [],
            resources: (self, qb) => qb,
            access: (self, qb, req) => {
                if (!self.config.entity)
                    return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

                const query = qb
                    .entity(self.config.entity)
                    .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.UPDATE)
                    .allow();

                if (self.config.identifierType === 'ID')
                    query
                        .entity(self.config.entity)
                        .id(req.params.id);
                else
                    query
                        .resource(req.params.aseid);

                return query;
            }
        },
    },
    delete: {
        where: async (self, req) => {
            if (self.config.identifierType === 'ID') {
                return { id: isNaN(parseInt(req.params.id)) ? req.params.id : parseInt(req.params.id) }
            }
            else {
                return { aseid: req.params.aseid }
            }
        },
        arc: {
            permissions: (self, req) => [],
            resources: (self, qb) => qb,
            access: (self, qb) => {
                if (!self.config.entity)
                    return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

                return qb
                    .entity(self.config.entity)
                    .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.DELETE)
                    .allow();
            }
        },
    }
}