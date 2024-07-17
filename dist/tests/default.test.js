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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
jest.retryTimes(0);
const A_EXPRESS_EntityController_class_1 = require("../src/global/A_EXPRESS_EntityController.class");
const ValidateAccess_decorator_1 = require("../src/decorators/ValidateAccess.decorator");
const a_sdk_types_1 = require("@adaas/a-sdk-types");
const Route_decorator_1 = require("../src/decorators/Route.decorator");
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const A_EXPRESS_Context_class_1 = require("../src/global/A_EXPRESS_Context.class");
describe('Defaults', () => {
    it('Should Assign Router', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            class Test extends A_EXPRESS_EntityController_class_1.A_EXPRESS_EntityController {
                constructor() {
                    super(...arguments);
                    this.CONTROLLER_CONFIG = {
                        entity: 'users',
                    };
                }
                test(req, res, next) {
                    return __awaiter(this, void 0, void 0, function* () {
                        console.log('test');
                        return res.status(200).send({
                            message: 'test'
                        });
                    });
                }
            }
            __decorate([
                (0, Route_decorator_1.A_EXPRESS_Get)({
                    path: '/test',
                    config: {
                        identity: false,
                        auth: false
                    }
                }),
                (0, ValidateAccess_decorator_1.A_EXPRESS_ValidateAccess)((qb, self, req) => {
                    return qb.action('read');
                }),
                (0, ValidateAccess_decorator_1.A_EXPRESS_ValidateAccess)((qb, self, req) => {
                    return qb.action('read2');
                })
            ], Test.prototype, "test", null);
            const app = (0, express_1.default)();
            app.use((0, Route_decorator_1.A_EXPRESS_Routes)([Test]));
            const port = 3000;
            (() => __awaiter(void 0, void 0, void 0, function* () {
                const server = (0, http_1.createServer)(app);
                yield server.listen(port, () => console.info(`Server running on port ${port}`));
            }))();
            const resp = yield axios_1.default.get(`http://localhost:${port}/test`);
            console.log(resp.data);
        }
        catch (error) {
            A_EXPRESS_Context_class_1.A_EXPRESS_Context.Logger.error(new a_sdk_types_1.A_SDK_Error(error));
        }
    }));
});
//# sourceMappingURL=default.test.js.map