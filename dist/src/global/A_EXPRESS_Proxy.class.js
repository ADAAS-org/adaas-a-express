"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_Proxy = void 0;
const url_1 = __importDefault(require("url"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const a_sdk_types_1 = require("@adaas/a-sdk-types");
const errors_constants_1 = require("../constants/errors.constants");
class A_EXPRESS_Proxy {
    constructor(
    /**
     * The path that should be proxied
     */
    regexp, 
    /**
     * The target to proxy to
     */
    target) {
        this.regexp = regexp;
        this.target = target;
    }
    handler() {
        // Proxy middleware function
        return (req, res, next) => {
            const targetUrl = `${this.target}${req.originalUrl}`;
            const parsedUrl = url_1.default.parse(targetUrl);
            const protocol = parsedUrl.protocol === 'https:' ? https_1.default : http_1.default;
            req.adaas.context.Logger.proxy({
                original: req.originalUrl,
                destination: targetUrl
            });
            const options = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port,
                path: parsedUrl.path,
                method: req.method,
                headers: req.headers
            };
            const proxyReq = protocol.request(options, (proxyRes) => {
                res.writeHead(proxyRes.statusCode || 404, proxyRes.headers);
                proxyRes.pipe(res, { end: true });
            });
            req.pipe(proxyReq, { end: true });
            proxyReq.on('error', (err) => {
                req.adaas.context.Logger.error(new a_sdk_types_1.A_SDK_ServerError(err));
                return next(req.adaas.context.Errors.getError(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.UNABLE_TO_PROXY_REQUEST));
            });
        };
    }
}
exports.A_EXPRESS_Proxy = A_EXPRESS_Proxy;
//# sourceMappingURL=A_EXPRESS_Proxy.class.js.map