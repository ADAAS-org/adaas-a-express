import { A_SDK_TYPES__Required, A_SDK_TYPES__DeepPartial } from '@adaas/a-sdk-types';
import { UserModel } from '../../db/models/User.model';
import { UserRepository, UserRepositoryInstance } from '../../db/repositories/User.repository';
import { A_EXPRESS_CRUDController } from '../../../../src/global/A_EXPRESS_CRUDController.class';
import { A_EXPRESS_AppInteractions, A_EXPRESS_Controller, A_EXPRESS_ServerDelegate } from '../../../../src/decorators/A_EXPRESS_Controller.decorator';
import { A_EXPRESS_Get } from '../../../../src/decorators/A_EXPRESS_Methods.decorator';

import { SimpleServerApp } from '../adaas/app.adaas'
import { A_EXPRESS_TYPES__ICRUDControllerConfig } from '../../../../src/types/A_EXPRESS_CRUDController.types';


@A_EXPRESS_ServerDelegate<UserModel>('user', UserRepositoryInstance, {
    id: 'ID',
    get: {
        where: async (self, req) => ({ id: parseInt(req.params.id) })
    }
})
export class UserDelegateController extends A_EXPRESS_CRUDController<UserModel> {

    constructor(
        context: SimpleServerApp,
        config: A_EXPRESS_TYPES__ICRUDControllerConfig,
        repository: UserRepository

    ) {
        super(context, config, repository)
    }


    @A_EXPRESS_Get({
        path: '/foo',
        config: {
            identity: true
        }
    })
    async foo(req, res) {
        this.context.Logger.log('Hi There this is a log');

        res.send(this.entity)
    }

}