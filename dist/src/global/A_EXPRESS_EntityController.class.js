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
const A_EXPRESS_Controller_class_1 = require("./A_EXPRESS_Controller.class");
const errors_constants_1 = require("../constants/errors.constants");
const A_EXPRESS_Context_class_1 = require("./A_EXPRESS_Context.class");
const ValidateAccess_decorator_1 = require("../decorators/ValidateAccess.decorator");
const AvailableResources_decorator_1 = require("../decorators/AvailableResources.decorator");
const Route_decorator_1 = require("../decorators/Route.decorator");
const A_EXPRESS_EntityController_defaults_1 = require("src/default/A_EXPRESS_EntityController.defaults");
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
    constructor(config) {
        super(a_sdk_types_1.A_SDK_CommonHelper.deepMerge(Object.assign({}, A_EXPRESS_EntityController_defaults_1.A_EXPRESS_DEFAULT_ENTITY_CONTROLLER_CONFIG), config || {}));
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.repository)
                    return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                const data = yield this.repository.getPage({
                    where: yield this.compiledConfig.list.where(this, req),
                    relations: this.compiledConfig.list.relations,
                    pagination: {
                        page: req.query.page,
                        pageSize: req.query.pageSize
                    },
                    search: {
                        pattern: req.query.search,
                        include: this.compiledConfig.list.searchFields
                    },
                    order: this.compiledConfig.list.order
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
                const updated = yield this.repository.findOneOrFail({
                    where: {
                        id: savedEntity.id,
                    },
                    relations: this.compiledConfig.post.relations,
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
                const where = yield this.compiledConfig.put.where(this, req);
                yield this.repository.update(where, req.body);
                const updated = yield this.repository.findOneOrFail({
                    where,
                    relations: this.compiledConfig.put.relations,
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
                const entity = yield this.repository.findOne({
                    where: yield this.compiledConfig.get.where(this, req),
                    relations: this.compiledConfig.get.relations,
                    order: this.compiledConfig.get.order
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
                yield this.repository.delete(yield this.compiledConfig.delete.where(this, req));
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
    (0, Route_decorator_1.A_EXPRESS_Get)({
        config: {
            identity: false
        }
    }),
    (0, ValidateAccess_decorator_1.A_EXPRESS_ValidateAccess)({
        default: (qb, self, req) => self.compiledConfig.list.arc.access(self, qb, req)
    }),
    (0, AvailableResources_decorator_1.A_EXPRESS_AvailableResources)({
        default: (qb, self, req) => self.compiledConfig.list.arc.resources(self, qb, req)
    })
    /**
     * Defines a Default GET method for the controller. Basically it's an endpoint for getting existing entities
     */
], A_EXPRESS_EntityController.prototype, "list", null);
__decorate([
    (0, Route_decorator_1.A_EXPRESS_Post)(),
    (0, ValidateAccess_decorator_1.A_EXPRESS_ValidateAccess)({
        default: (qb, self, req) => self.compiledConfig.post.arc.access(self, qb, req)
    })
    /**
     * Defines a Default POST method for the controller. Basically it's an endpoint for creating new entities
     */
], A_EXPRESS_EntityController.prototype, "post", null);
__decorate([
    (0, Route_decorator_1.A_EXPRESS_Put)(),
    (0, ValidateAccess_decorator_1.A_EXPRESS_ValidateAccess)({
        default: (qb, self, req) => self.compiledConfig.put.arc.access(self, qb, req)
    })
    /**
     * Defines a Default PUT method for the controller. Basically it's an endpoint for updating existing entities
     */
], A_EXPRESS_EntityController.prototype, "put", null);
__decorate([
    (0, Route_decorator_1.A_EXPRESS_Get)(),
    (0, ValidateAccess_decorator_1.A_EXPRESS_ValidateAccess)({
        default: (qb, self, req) => self.compiledConfig.get.arc.access(self, qb, req)
    })
    /**
     * Defines a Default GET method for the controller. Basically it's an endpoint for getting existing entities
     */
], A_EXPRESS_EntityController.prototype, "get", null);
__decorate([
    (0, Route_decorator_1.A_EXPRESS_Delete)(),
    (0, ValidateAccess_decorator_1.A_EXPRESS_ValidateAccess)({
        default: (qb, self, req) => self.compiledConfig.delete.arc.access(self, qb, req)
    })
    /**
     * Defines a Default DELETE method for the controller. Basically it's an endpoint for deleting existing entities
     */
], A_EXPRESS_EntityController.prototype, "delete", null);
//# sourceMappingURL=A_EXPRESS_EntityController.class.js.map