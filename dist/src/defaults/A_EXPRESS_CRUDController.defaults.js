"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_DEFAULTS__CURD_CONFIG = void 0;
const a_arc_1 = require("@adaas/a-arc");
const errors_constants_1 = require("../constants/errors.constants");
const a_sdk_types_1 = require("@adaas/a-sdk-types");
exports.A_EXPRESS_DEFAULTS__CURD_CONFIG = {
    id: 'ASEID',
    http: {
        base: '/',
        alias: undefined,
        expose: undefined,
        ignore: undefined
    },
    auth: {},
    arc: {},
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
                    return self.context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED);
                return qb
                    .entity(self.entity)
                    .action(a_arc_1.A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.LIST)
                    .allow();
            },
            access: (self, qb) => {
                return qb
                    .entity(self.entity)
                    .action(a_arc_1.A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.LIST)
                    .allow();
            }
        },
        where: (self, req) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (!(req.adaas.arc && req.adaas.arc.resources && req.adaas.arc.resources.default))
                return;
            if (self.config.id === 'ID') {
                return { id: (_a = req.adaas.arc.resources.default) === null || _a === void 0 ? void 0 : _a.map(r => isNaN(parseInt(r)) ? r : parseInt(r)) };
            }
            else {
                return { aseid: req.adaas.arc.resources.default };
            }
        }),
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
                    return self.context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED);
                const query = qb
                    .entity(self.entity)
                    .action(a_arc_1.A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.READ)
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
        where: (self, req) => __awaiter(void 0, void 0, void 0, function* () {
            if (self.config.id === 'ID') {
                const { id } = a_sdk_types_1.A_SDK_CommonHelper.parseASEID(req.params.aseid);
                return { id: isNaN(parseInt(id)) ? id : parseInt(id) };
            }
            else {
                return { aseid: req.params.aseid };
            }
        })
    },
    post: {
        relations: [],
        extend: () => __awaiter(void 0, void 0, void 0, function* () { return ({}); }),
        arc: {
            permissions: (self, req) => [],
            access: (self, qb) => {
                if (!self.entity)
                    return self.context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED);
                return qb
                    .entity(self.entity)
                    .action(a_arc_1.A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.CREATE)
                    .allow();
            }
        },
    },
    put: {
        relations: [],
        where: (self, req) => __awaiter(void 0, void 0, void 0, function* () {
            if (self.config.id === 'ID') {
                return { id: isNaN(parseInt(req.params.id)) ? req.params.id : parseInt(req.params.id) };
            }
            else {
                return { aseid: req.params.aseid };
            }
        }),
        extend: (req) => __awaiter(void 0, void 0, void 0, function* () { return ({}); }),
        arc: {
            permissions: (self, req) => [],
            access: (self, qb, req) => {
                if (!self.entity)
                    return self.context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED);
                const query = qb
                    .entity(self.entity)
                    .action(a_arc_1.A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.UPDATE)
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
        where: (self, req) => __awaiter(void 0, void 0, void 0, function* () {
            if (self.config.id === 'ID') {
                return { id: isNaN(parseInt(req.params.id)) ? req.params.id : parseInt(req.params.id) };
            }
            else {
                return { aseid: req.params.aseid };
            }
        }),
        arc: {
            permissions: (self, req) => [],
            access: (self, qb) => {
                if (!self.entity)
                    return self.context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED);
                return qb
                    .entity(self.entity)
                    .action(a_arc_1.A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.DELETE)
                    .allow();
            }
        },
    }
};
//# sourceMappingURL=A_EXPRESS_CRUDController.defaults.js.map