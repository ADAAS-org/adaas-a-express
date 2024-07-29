import { A_SDK_TYPES__Required, A_SDK_TYPES__DeepPartial } from '@adaas/a-sdk-types';
import { UserModel } from '../../db/models/User.model';
import { UserRepository, UserRepositoryInstance } from '../../db/repositories/User.repository';
import { A_EXPRESS_ServerCommands, A_EXPRESS_ServerDelegate } from '../../../../src/decorators/A_EXPRESS_Controller.decorator';
import { A_EXPRESS_Get } from '../../../../src/decorators/A_EXPRESS_Methods.decorator';


@A_EXPRESS_ServerCommands('user', UserRepositoryInstance, {
    id: 'ID',
    auth: {
        enable: false,
    },
    get: {
        where: async (self, req) => ({ id: parseInt(req.params.id) })
    }
})
export class UserServerController {

    @A_EXPRESS_Get({
        path: '/foo',
        config: {
            identity: true
        }
    })
    async foo(req, res) {
        res.send('foo')

    }

}