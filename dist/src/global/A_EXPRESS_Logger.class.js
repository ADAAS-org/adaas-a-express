"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_Logger = void 0;
const a_sdk_types_1 = require("@adaas/a-sdk-types");
class A_EXPRESS_Logger extends a_sdk_types_1.A_SDK_DefaultLogger {
    metrics() {
    }
    routes(routes) {
        const time = this.getTime();
        console.log(`\x1b[36m[${this.namespace}] |${time}| Exposed Routes:
${' '.repeat(this.namespace.length + 3)}|-------------------------------
${routes.map(route => `${' '.repeat(this.namespace.length + 3)}| [${route.method.toUpperCase()}]${' '.repeat(7 - route.method.length)} ${route.path}`).join('\n')}
${' '.repeat(this.namespace.length + 3)}|-------------------------------\x1b[0m`);
    }
    route(route) {
        if (route.status >= 500) {
            console.log(`\x1b[31m[${this.namespace}] |${this.getTime()}| ${route.status} | [${route.method.toUpperCase()}]${' '.repeat(7 - route.method.length)} ${route.url} | ${route.responseTime}ms\x1b[0m`);
        }
        else if (route.status >= 400) {
            console.log(`\x1b[33m[${this.namespace}] |${this.getTime()}| ${route.status} | [${route.method.toUpperCase()}]${' '.repeat(7 - route.method.length)} ${route.url} | ${route.responseTime}ms\x1b[0m`);
        }
        else {
            console.log(`\x1b[32m[${this.namespace}] |${this.getTime()}| ${route.status} | [${route.method.toUpperCase()}]${' '.repeat(7 - route.method.length)} ${route.url} | ${route.responseTime}ms\x1b[0m`);
        }
    }
    serverReady(params) {
        const processId = process.pid;
        console.log(`\x1b[36m[${this.namespace}] |${this.getTime()}| Server Ready:
${' '.repeat(this.namespace.length + 3)}|-------------------------------
${' '.repeat(this.namespace.length + 3)}| ${params.app.name} v${params.app.version} is running on port ${params.port}
${' '.repeat(this.namespace.length + 3)}| Process ID: ${processId}
${' '.repeat(this.namespace.length + 3)}|-------------------------------
${' '.repeat(this.namespace.length + 3)}| ==============================
${' '.repeat(this.namespace.length + 3)}|          LISTENING...         
${' '.repeat(this.namespace.length + 3)}| ==============================
\x1b[0m`);
    }
}
exports.A_EXPRESS_Logger = A_EXPRESS_Logger;
//# sourceMappingURL=A_EXPRESS_Logger.class.js.map