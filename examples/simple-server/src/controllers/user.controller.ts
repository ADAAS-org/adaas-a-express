import { A_SDK_TYPES__Required, A_SDK_TYPES__DeepPartial } from '@adaas/a-sdk-types';
import { A_EXPRESS_AppInteractionsController, A_EXPRESS_Get, A_EXPRESS_Post, A_EXPRESS_TYPES__APP_INTERACTIONS_ControllerConfig, A_EXPRESS_TYPES__IControllerRepository } from '../../../../index'
import { UserModel } from '../../db/models/User.model';
import { UserRepository } from '../../db/repositories/User.repository';

export class UserController extends A_EXPRESS_AppInteractionsController<UserModel> {

    protected repository?: UserRepository = new UserRepository();

    protected CUSTOM_CONFIG: A_SDK_TYPES__Required<A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__APP_INTERACTIONS_ControllerConfig<UserModel>, 5>, ['entity']> = {
        id: 'ID',
        entity: 'user',
        auth: {
            enable: false,
        },
        get: {
            where: async (self, req) => ({ id: parseInt(req.params.id) })
        }
    };



    @A_EXPRESS_Get({
        path: '/test',
        config: {

        }
    })
    async test(req,res) {
        res.send('test')

    }

}