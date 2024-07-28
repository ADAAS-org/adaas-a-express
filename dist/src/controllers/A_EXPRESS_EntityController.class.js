"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.A_EXPRESS_EntityController = void 0;
const a_sdk_types_1 = require("@adaas/a-sdk-types");
const A_EXPRESS_Controller_class_1 = require("../global/A_EXPRESS_Controller.class");
const errors_constants_1 = require("../constants/errors.constants");
const A_EXPRESS_Context_class_1 = require("../global/A_EXPRESS_Context.class");
const Access_decorator_1 = require("../decorators/Access.decorator");
const Resources_decorator_1 = require("../decorators/Resources.decorator");
const Methods_decorator_1 = require("../decorators/Methods.decorator");
const A_EXPRESS_EntityController_defaults_1 = require("../defaults/A_EXPRESS_EntityController.defaults");
/**
 *
 * This class exists ONLY to simplify development. It might be used to simplify access to DB via external operations
 *
 * So basically it's applicable ONLY for TypeORM provider and NOT for others
 *
 * Yes, it's possible to override properties and use it anyway. so....
 *
 *
 * TODO: If any better way would be found -> override or DELETE the class
 *
 *
 */
class A_EXPRESS_EntityController extends A_EXPRESS_Controller_class_1.A_EXPRESS_Controller {
    get config() {
        if (!this._compiledConfig)
            this._compiledConfig = a_sdk_types_1.A_SDK_CommonHelper.deepMerge(a_sdk_types_1.A_SDK_CommonHelper.deepMerge(Object.assign({}, A_EXPRESS_EntityController_defaults_1.A_EXPRESS_DEFAULTS__ENTITY_CONTROLLER_CONFIG), this._constructorConfig || {}), this.CUSTOM_CONFIG);
        return this._compiledConfig;
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.repository)
                    return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                const listConfig = a_sdk_types_1.A_SDK_CommonHelper.deepMerge(Object.assign({}, A_EXPRESS_EntityController_defaults_1.A_EXPRESS_DEFAULTS__ENTITY_CONTROLLER_CONFIG.list), this.config.list);
                const data = yield this.repository.getPage({
                    where: yield listConfig.where(this, req),
                    relations: listConfig.relations,
                    pagination: {
                        page: req.query.page,
                        pageSize: req.query.pageSize
                    },
                    search: {
                        pattern: req.query.search,
                        include: listConfig.searchFields
                    },
                    order: listConfig.order
                });
                return res.status(200).send(data);
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
    post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.repository)
                    return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                const newEntity = this.repository.create(req.body);
                const savedEntity = yield this.repository.save(newEntity);
                const postConfig = a_sdk_types_1.A_SDK_CommonHelper.deepMerge(Object.assign({}, A_EXPRESS_EntityController_defaults_1.A_EXPRESS_DEFAULTS__ENTITY_CONTROLLER_CONFIG.post), this.config.post);
                const updated = yield this.repository.findOneOrFail({
                    where: {
                        id: savedEntity.id,
                    },
                    relations: postConfig.relations,
                });
                return res.status(200).send(updated);
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
    put(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.repository)
                    return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                const putConfig = a_sdk_types_1.A_SDK_CommonHelper.deepMerge(Object.assign({}, A_EXPRESS_EntityController_defaults_1.A_EXPRESS_DEFAULTS__ENTITY_CONTROLLER_CONFIG.put), this.config.put);
                const where = yield putConfig.where(this, req);
                yield this.repository.update(where, req.body);
                const updated = yield this.repository.findOneOrFail({
                    where,
                    relations: putConfig.relations,
                });
                return res.status(200).send(updated);
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.repository)
                    return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                const getConfig = a_sdk_types_1.A_SDK_CommonHelper.deepMerge(Object.assign({}, A_EXPRESS_EntityController_defaults_1.A_EXPRESS_DEFAULTS__ENTITY_CONTROLLER_CONFIG.get), this.config.get);
                const entity = yield this.repository.findOne({
                    where: yield getConfig.where(this, req),
                    relations: getConfig.relations,
                    order: getConfig.order
                });
                if (!entity)
                    return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.ENTITY_NOT_FOUND);
                return res.status(200).send(entity);
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.repository)
                    return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                const deleteConfig = a_sdk_types_1.A_SDK_CommonHelper.deepMerge(Object.assign({}, A_EXPRESS_EntityController_defaults_1.A_EXPRESS_DEFAULTS__ENTITY_CONTROLLER_CONFIG.delete), this.config.delete);
                yield this.repository.delete(yield deleteConfig.where(this, req));
                return res.status(202).send({
                    status: 'OK'
                });
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
}
exports.A_EXPRESS_EntityController = A_EXPRESS_EntityController;
__decorate([
    (0, Methods_decorator_1.A_EXPRESS_Get)({
        config: {
            identity: false
        }
    }),
    (0, Access_decorator_1.A_EXPRESS_Access)({
        acl: {
            default: (qb, self, req) => self.config.list.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.list.arc.permissions(self, req)
    }),
    (0, Resources_decorator_1.A_EXPRESS_Resources)({
        default: (qb, self, req) => self.config.list.arc.resources(self, qb, req)
    })
    /**
     * Defines a Default GET method for the controller. Basically it's an endpoint for getting existing entities
     */
], A_EXPRESS_EntityController.prototype, "list", null);
__decorate([
    (0, Methods_decorator_1.A_EXPRESS_Post)(),
    (0, Access_decorator_1.A_EXPRESS_Access)({
        acl: {
            default: (qb, self, req) => self.config.post.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.post.arc.permissions(self, req)
    })
    /**
     * Defines a Default POST method for the controller. Basically it's an endpoint for creating new entities
     */
], A_EXPRESS_EntityController.prototype, "post", null);
__decorate([
    (0, Methods_decorator_1.A_EXPRESS_Put)(),
    (0, Access_decorator_1.A_EXPRESS_Access)({
        acl: {
            default: (qb, self, req) => self.config.put.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.put.arc.permissions(self, req)
    })
    /**
     * Defines a Default PUT method for the controller. Basically it's an endpoint for updating existing entities
     */
], A_EXPRESS_EntityController.prototype, "put", null);
__decorate([
    (0, Methods_decorator_1.A_EXPRESS_Get)(),
    (0, Access_decorator_1.A_EXPRESS_Access)({
        acl: {
            default: (qb, self, req) => self.config.get.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.get.arc.permissions(self, req)
    })
    /**
     * Defines a Default GET method for the controller. Basically it's an endpoint for getting existing entities
     */
], A_EXPRESS_EntityController.prototype, "get", null);
__decorate([
    (0, Methods_decorator_1.A_EXPRESS_Delete)(),
    (0, Access_decorator_1.A_EXPRESS_Access)({
        acl: {
            default: (qb, self, req) => self.config.delete.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.delete.arc.permissions(self, req)
    })
    /**
     * Defines a Default DELETE method for the controller. Basically it's an endpoint for deleting existing entities
     */
], A_EXPRESS_EntityController.prototype, "delete", null);
//# sourceMappingURL=A_EXPRESS_EntityController.class.js.map