import { A_SDK_DefaultLogger } from "@adaas/a-sdk-types";



export class A_EXPRESS_Logger extends A_SDK_DefaultLogger {




    metrics() {

    }


    routes(routes: Array<{
        method: string,
        path: string
    }>) {
        const time = this.getTime();

        console.log(`\x1b[36m[${this.namespace}] |${time}| Exposed Routes:
${' '.repeat(this.namespace.length + 3)}|-------------------------------
${routes.map(route => `${' '.repeat(this.namespace.length + 3)}| [${route.method.toUpperCase()}]${' '.repeat(7 - route.method.length)} ${route.path}`).join('\n')
            }
${' '.repeat(this.namespace.length + 3)}|-------------------------------\x1b[0m`);

    }


    route(route: {
        method: string,
        url: string,
        status: number,
        responseTime: string
    }) {

        if (route.status >= 500) {
            console.log(`\x1b[31m[${this.namespace}] |${this.getTime()}| ${route.status} | [${route.method.toUpperCase()}]${' '.repeat(7 - route.method.length)} ${route.url} | ${route.responseTime}ms\x1b[0m`);

        } else if (route.status >= 400) {

            console.log(`\x1b[33m[${this.namespace}] |${this.getTime()}| ${route.status} | [${route.method.toUpperCase()}]${' '.repeat(7 - route.method.length)} ${route.url} | ${route.responseTime}ms\x1b[0m`);

        }
        else {
            console.log(`\x1b[32m[${this.namespace}] |${this.getTime()}| ${route.status} | [${route.method.toUpperCase()}]${' '.repeat(7 - route.method.length)} ${route.url} | ${route.responseTime}ms\x1b[0m`);

        }
    }

    serverReady(
        params: {
            port: number,

            app: {
                name: string,
                version: string
            }
        }
    ) {
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


    proxy(
        params: {
            original: string,
            destination: string,
        }
    ) {
        console.log(`\x1b[35m[${this.namespace}] |${this.getTime()}| Proxy:
${' '.repeat(this.namespace.length + 3)}| ${params.original} -> ${params.destination}
${' '.repeat(this.namespace.length + 3)}|-------------------------------\x1b[0m`);
    }

}