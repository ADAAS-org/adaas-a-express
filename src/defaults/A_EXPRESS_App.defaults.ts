import { A_EXPRESS_TYPES__AppManifest } from "../types/A_EXPRESS_App.types";


export const A_EXPRESS_DEFAULTS__APP_CONFIG: A_EXPRESS_TYPES__AppManifest = {
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
        },
        products: {
            enabled: true
        }
    },

}