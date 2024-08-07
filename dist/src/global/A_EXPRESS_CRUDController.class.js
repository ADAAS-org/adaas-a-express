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
exports.A_EXPRESS_CRUDController = void 0;
const a_sdk_types_1 = require("@adaas/a-sdk-types");
const A_EXPRESS_Methods_decorator_1 = require("../decorators/A_EXPRESS_Methods.decorator");
const A_EXPRESS_Controller_decorator_1 = require("../decorators/A_EXPRESS_Controller.decorator");
const errors_constants_1 = require("../constants/errors.constants");
const A_EXPRESS_Access_decorator_1 = require("../decorators/A_EXPRESS_Access.decorator");
const A_EXPRESS_Resources_decorator_1 = require("../decorators/A_EXPRESS_Resources.decorator");
const A_EXPRESS_Decorators_storage_1 = require("../storage/A_EXPRESS_Decorators.storage");
/**
 *
 * This class exists ONLY to simplify development. It might be used to simplify access to DB via external operations
 *
 */
let A_EXPRESS_CRUDController = class A_EXPRESS_CRUDController {
    constructor(context, config, repository) {
        this.context = context;
        this.config = config;
        this.repository = repository;
    }
    get entity() {
        const existedMeta = A_EXPRESS_Decorators_storage_1.A_EXPRESS_Storage.get(this.constructor) || new Map();
        const entity = existedMeta.get(A_EXPRESS_Decorators_storage_1.A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ENTITY_KEY);
        return entity;
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.repository)
                    return this.context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                const data = yield this.repository.getPage({
                    where: yield this.config.list.where(this, req),
                    relations: this.config.list.relations,
                    pagination: {
                        page: req.query.page,
                        pageSize: req.query.pageSize
                    },
                    search: {
                        pattern: req.query.search,
                        include: this.config.list.searchFields
                    },
                    order: this.config.list.order
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
                    return this.context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                const newEntity = this.repository.create(req.body);
                const savedEntity = yield this.repository.save(newEntity);
                const updated = yield this.repository.findOneOrFail({
                    where: {
                        id: savedEntity.id,
                    },
                    relations: this.config.post.relations,
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
                    return this.context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                const where = yield this.config.put.where(this, req);
                yield this.repository.update(where, req.body);
                const updated = yield this.repository.findOneOrFail({
                    where,
                    relations: this.config.put.relations,
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
                    return this.context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                const entity = yield this.repository.findOne({
                    where: yield this.config.get.where(this, req),
                    relations: this.config.get.relations,
                    order: this.config.get.order
                });
                if (!entity)
                    return this.context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.ENTITY_NOT_FOUND);
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
                    return this.context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                yield this.repository.delete(yield this.config.delete.where(this, req));
                return res.status(202).send({
                    status: 'OK'
                });
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
};
exports.A_EXPRESS_CRUDController = A_EXPRESS_CRUDController;
__decorate([
    (0, A_EXPRESS_Methods_decorator_1.A_EXPRESS_Get)({
        config: {
            identity: false
        }
    }),
    (0, A_EXPRESS_Access_decorator_1.A_EXPRESS_Access)({
        acl: {
            default: (qb, self, req) => self.config.list.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.list.arc.permissions(self, req)
    }),
    (0, A_EXPRESS_Resources_decorator_1.A_EXPRESS_Resources)({
        default: (qb, self, req) => self.config.list.arc.resources ?
            self.config.list.arc.resources(self, qb, req)
            : qb
    })
    /**
     * Defines a Default GET method for the controller. Basically it's an endpoint for getting existing entities
     */
], A_EXPRESS_CRUDController.prototype, "list", null);
__decorate([
    (0, A_EXPRESS_Methods_decorator_1.A_EXPRESS_Post)(),
    (0, A_EXPRESS_Access_decorator_1.A_EXPRESS_Access)({
        acl: {
            default: (qb, self, req) => self.config.post.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.post.arc.permissions(self, req)
    })
    /**
     * Defines a Default POST method for the controller. Basically it's an endpoint for creating new entities
     */
], A_EXPRESS_CRUDController.prototype, "post", null);
__decorate([
    (0, A_EXPRESS_Methods_decorator_1.A_EXPRESS_Put)(),
    (0, A_EXPRESS_Access_decorator_1.A_EXPRESS_Access)({
        acl: {
            default: (qb, self, req) => self.config.put.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.put.arc.permissions(self, req)
    })
    /**
     * Defines a Default PUT method for the controller. Basically it's an endpoint for updating existing entities
     */
], A_EXPRESS_CRUDController.prototype, "put", null);
__decorate([
    (0, A_EXPRESS_Methods_decorator_1.A_EXPRESS_Get)(),
    (0, A_EXPRESS_Access_decorator_1.A_EXPRESS_Access)({
        acl: {
            default: (qb, self, req) => self.config.get.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.get.arc.permissions(self, req)
    })
    /**
     * Defines a Default GET method for the controller. Basically it's an endpoint for getting existing entities
     */
], A_EXPRESS_CRUDController.prototype, "get", null);
__decorate([
    (0, A_EXPRESS_Methods_decorator_1.A_EXPRESS_Delete)(),
    (0, A_EXPRESS_Access_decorator_1.A_EXPRESS_Access)({
        acl: {
            default: (qb, self, req) => self.config.delete.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.delete.arc.permissions(self, req)
    })
    /**
     * Defines a Default DELETE method for the controller. Basically it's an endpoint for deleting existing entities
     */
], A_EXPRESS_CRUDController.prototype, "delete", null);
exports.A_EXPRESS_CRUDController = A_EXPRESS_CRUDController = __decorate([
    (0, A_EXPRESS_Controller_decorator_1.A_EXPRESS_Controller)()
], A_EXPRESS_CRUDController);
//# sourceMappingURL=A_EXPRESS_CRUDController.class.js.map