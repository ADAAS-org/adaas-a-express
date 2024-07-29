import { A_EXPRESS_AppInteractions } from '../../../../src/decorators/A_EXPRESS_Controller.decorator';
import { A_EXPRESS_Get } from '../../../../src/decorators/A_EXPRESS_Methods.decorator';
import { A_EXPRESS_CRUDController } from '../../../../src/global/A_EXPRESS_CRUDController.class';
import { UserModel } from '../../db/models/User.model';
import { UserRepositoryInstance } from '../../db/repositories/User.repository';


@A_EXPRESS_AppInteractions<UserModel>('user', UserRepositoryInstance, {
    id: 'ID',
    auth: {
        enable: false,
    },
    get: {
        where: async (self, req) => ({ id: parseInt(req.params.id) })
    }
})
export class UserController extends A_EXPRESS_CRUDController<UserModel> {


    @A_EXPRESS_Get({
        path: '/test',
        config: {

        }
    })
    async test(req, res) {

        res.send('test')
    }
}