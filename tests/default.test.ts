import { config } from 'dotenv';
config();
jest.retryTimes(0);
import { A_EXPRESS_EntityController } from '@adaas/a-sdk/global/A_EXPRESS_EntityController.class';
import { A_EXPRESS_TYPES__EntityControllerConfig } from '@adaas/a-sdk/types/A_EXPRESS_EntityController.types';
import { A_EXPRESS_ValidateAccess } from '../src/decorators/ValidateAccess.decorator';
import { A_SDK_TYPES__Required, A_SDK_TYPES__Dictionary, A_SDK_Error } from '@adaas/a-sdk-types';
import { A_EXPRESS_Get, A_EXPRESS_Routes } from '@adaas/a-sdk/decorators/Route.decorator';
import { createServer } from 'http';
import express, { Router } from 'express';
import axios from 'axios';
import { A_EXPRESS_Context } from '@adaas/a-sdk/global/A_EXPRESS_Context.class';

describe('Defaults', () => {
    it('Should Assign Router', async () => {

        try {

            class Test extends A_EXPRESS_EntityController {

                protected CONTROLLER_CONFIG: A_SDK_TYPES__Required<Partial<A_EXPRESS_TYPES__EntityControllerConfig<A_SDK_TYPES__Dictionary<any>>>, ['entity']> = {
                    entity: 'users',
                };


                @A_EXPRESS_Get({
                    path: '/test',
                    config: {
                        identity: false,
                        auth: false
                    }
                })
                @A_EXPRESS_ValidateAccess<Test>((qb, self, req) => {
                    return qb.action('read');
                })
                @A_EXPRESS_ValidateAccess<Test>((qb, self, req) => {
                    return qb.action('read2');
                })
                async test(req: any, res: any, next: any) {
                    console.log('test')

                    return res.status(200).send({
                        message: 'test'
                    });
                }
            }

            const app = express();

            app.use(A_EXPRESS_Routes([Test]));

            const port = 3000;

            (async () => {
                const server = createServer(app);

                await server.listen(
                    port,
                    () => console.info(`Server running on port ${port}`)
                );
            })();


            const resp = await axios.get(`http://localhost:${port}/test`);

            console.log(resp.data);

        } catch (error) {
            A_EXPRESS_Context.Logger.error(new A_SDK_Error(error));
        }
    });

});