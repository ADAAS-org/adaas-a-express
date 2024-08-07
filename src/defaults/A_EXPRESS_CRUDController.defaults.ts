import { A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS } from "@adaas/a-arc";
import { A_EXPRESS_TYPES__IRequest } from "../types/A_EXPRESS_Controller.types";
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from "../constants/errors.constants";
import { A_SDK_CommonHelper } from "@adaas/a-sdk-types";
import { A_EXPRESS_TYPES__ICRUDControllerConfig } from "../types/A_EXPRESS_CRUDController.types";

export const A_EXPRESS_DEFAULTS__CURD_CONFIG: A_EXPRESS_TYPES__ICRUDControllerConfig<any, A_EXPRESS_TYPES__IRequest> = {
    id: 'ASEID',
    http: {
        base: '/',
        alias: undefined,
        expose: ['post', 'get', 'put', 'delete', 'list'],
        ignore: undefined
    },
    auth: {
    },
    arc: {
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
                if (!self.entity)
                    return self.context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

                return qb
                    .entity(self.entity)
                    .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.LIST)
                    .allow();
            },
            access: (self, qb) => {
                return qb
                    .entity(self.entity)
                    .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.LIST)
                    .allow();
            }
        },
        where: async (self, req) => {
            if (!(req.adaas.arc && req.adaas.arc.resources && req.adaas.arc.resources.default))
                return;

            if (self.config.id === 'ID') {
                return { id: req.adaas.arc!.resources!.default?.map(r => isNaN(parseInt(r)) ? r : parseInt(r)) }
            }
            else {
                return { aseid: req.adaas.arc!.resources!.default }
            }
        },
    },
    get: {
        relations: [],
        order: {
            created_at: 'DESC'
        },
        arc: {
            permissions: (self, req) => [],
            access: (self, qb, req) => {
                if (!self.entity)
                    return self.context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

                const query = qb
                    .entity(self.entity)
                    .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.READ)
                    .allow();

                if (self.config.id === 'ID')
                    query
                        .entity(self.entity)
                        .id(req.params.id);
                else
                    query
                        .resource(req.params.aseid);

                return query;
            }
        },

        where: async (self, req) => {
            if (self.config.id === 'ID') {
                const { id } = A_SDK_CommonHelper.parseASEID(req.params.aseid);

                return { id: isNaN(parseInt(id)) ? id : parseInt(id) }
            }
            else {
                return { aseid: req.params.aseid }
            }
        }
    },
    post: {
        relations: [],
        extend: async () => ({} as any),
        arc: {
            permissions: (self, req) => [],
            access: (self, qb) => {
                if (!self.entity)
                    return self.context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

                return qb
                    .entity(self.entity)
                    .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.CREATE)
                    .allow();
            }
        },
    },
    put: {
        relations: [],
        where: async (self, req) => {
            if (self.config.id === 'ID') {
                return { id: isNaN(parseInt(req.params.id)) ? req.params.id : parseInt(req.params.id) }
            }
            else {
                return { aseid: req.params.aseid }
            }
        },
        extend: async (req) => ({} as any),
        arc: {
            permissions: (self, req) => [],
            access: (self, qb, req) => {
                if (!self.entity)
                    return self.context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

                const query = qb
                    .entity(self.entity)
                    .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.UPDATE)
                    .allow();

                if (self.config.id === 'ID')
                    query
                        .entity(self.entity)
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
            if (self.config.id === 'ID') {
                return { id: isNaN(parseInt(req.params.id)) ? req.params.id : parseInt(req.params.id) }
            }
            else {
                return { aseid: req.params.aseid }
            }
        },
        arc: {
            permissions: (self, req) => [],
            access: (self, qb) => {
                if (!self.entity)
                    return self.context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

                return qb
                    .entity(self.entity)
                    .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.DELETE)
                    .allow();
            }
        },
    }
} as const