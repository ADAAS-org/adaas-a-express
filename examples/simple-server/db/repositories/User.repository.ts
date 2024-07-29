import { A_SDK_TYPES__IDefaultPagination } from '@adaas/a-sdk-types';
import { UserModel } from '../models/User.model'
import { A_EXPRESS_TYPES__ICRUDControllerRepository, A_EXPRESS_TYPES__IGetPageOptions } from '../../../../src/types/A_EXPRESS_CRUDController.types';

export class UserRepository implements A_EXPRESS_TYPES__ICRUDControllerRepository<UserModel> {

    private users: UserModel[] = [
        new UserModel(1, 'John Doe', 'john.doe@test.com'),
        new UserModel(2, 'Jane Doe 2', 'john.doe2@test.com'),
        new UserModel(3, 'Jane Doe 3', 'john.doe3@test.com')
    ];


    async findOne(request: { where: { id: number } }): Promise<UserModel | null> {
        return this.users.find(user => user.id === request.where.id) || null;
    }

    async find(name: string): Promise<UserModel[]> {
        return this.users.filter(user => user.name === name);
    }

    async save(params: {
        name: string,
        email: string,
    }): Promise<UserModel> {
        const id = this.users.length + 1;
        const user = new UserModel(id, params.name, params.email);
        this.users.push(user);
        return user;
    }

    create(params: {
        name: string,
        email: string,
    }): UserModel {
        const id = this.users.length + 1;
        const user = new UserModel(id, params.name, params.email);
        this.users.push(user);
        return user;
    }

    async update(id: number, data: {
        name?: string,
        email?: string,
    }): Promise<UserModel> {
        const user = this.users.find(user => user.id === id);
        if (!user) throw new Error('User not found');
        if (data.name) user.name = data.name;
        if (data.email) user.email = data.email;
        return user;
    }

    async delete(id: number): Promise<UserModel> {
        const user = this.users.find(user => user.id === id);
        if (!user) throw new Error('User not found');
        this.users = this.users.filter(user => user.id !== id);
        return user;
    }

    async findOneOrFail(id: number): Promise<UserModel> {
        const user = this.users.find(user => user.id === id);
        if (!user) throw new Error('User not found');
        return user;
    }

    async getPage(props: A_EXPRESS_TYPES__IGetPageOptions & { [key: string]: any; }): Promise<A_SDK_TYPES__IDefaultPagination<UserModel>> {

        const { page, perPage } = props;
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const users = this.users.slice(start, end);
        return {
            items: users,
            pagination: {
                page,
                pageSize: perPage,
                total: this.users.length,
                pages: Math.ceil(this.users.length / perPage)
            }
        };
    }
}


export const UserRepositoryInstance = new UserRepository();