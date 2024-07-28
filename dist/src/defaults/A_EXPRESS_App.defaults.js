"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_DEFAULTS__APP_CONFIG = void 0;
exports.A_EXPRESS_DEFAULTS__APP_CONFIG = {
    app: {
        name: 'a-express',
        description: 'A Express Application',
        version: '0.0.1',
    },
    context: {
        namespace: 'a-express',
        errors: []
    },
    http: {
        port: 3000,
        prefix: '/api',
        cors: {
            options: {}
        },
    },
    es: {},
    permissions: [],
    routes: [],
    defaults: {
        health: {
            enable: true,
            versionPath: '',
            verbose: false,
            exposedProperties: ['version']
        },
        auth: {
            enable: true,
            redirectUrl: ''
        },
        permissions: {
            migrate: true
        },
        arc: {
            enable: true,
        }
    },
};
//# sourceMappingURL=A_EXPRESS_App.defaults.js.map