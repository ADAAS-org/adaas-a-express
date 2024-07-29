import path from "path";
import { SimpleServerApp } from "./adaas/app.adaas";
import { UserController } from "./controllers/user.controller";
import { UserServerController } from "./controllers/user-server.controller";


(async () => {
    console.log('path:', path.join(__dirname, '../../../package.json'));

    const app = new SimpleServerApp({
        app: {
            name: 'Simple Server App',
            description: 'A Simple Server App',
        },
        context: {
            namespace: 'simple-server',
        },
        http: {
            port: 3000,
        },
        defaults: {
            // Because this service is a part of the actual A_ARC service, 
            // we need to disable the migration permission to prevent the service from trying to migrate itself.
            permissions: {
                migrate: false
            },
            auth: {
                enable: false,
            },
            health: {
                enable: true,
                versionPath: path.join(__dirname, '../../../package.json'),
                exposedProperties: ['version', 'author']
            },
            arc: {
                enable: false
            }
        },
        routes: [
            {
                version: 'v1',
                controllers: [
                    // App Interactions
                    UserController,
                    UserServerController
                ]
            }
        ]
    });

    await app.start();
})();


