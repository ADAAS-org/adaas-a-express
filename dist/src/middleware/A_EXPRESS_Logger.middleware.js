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
exports.A_EXPRESS_LoggerMiddleware = void 0;
class A_EXPRESS_LoggerMiddleware {
    static logRequest(config) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const startTime = process.hrtime();
            if (!config.ignore.includes(req.originalUrl))
                res.on('finish', () => {
                    const elapsedTime = process.hrtime(startTime);
                    const elapsedMilliseconds = elapsedTime[0] * 1000 + elapsedTime[1] / 1e6;
                    req.adaas.context.Logger.route({
                        method: req.method,
                        url: req.originalUrl,
                        status: res.statusCode,
                        responseTime: elapsedMilliseconds.toFixed(3)
                    });
                });
            next();
        });
    }
}
exports.A_EXPRESS_LoggerMiddleware = A_EXPRESS_LoggerMiddleware;
//# sourceMappingURL=A_EXPRESS_Logger.middleware.js.map