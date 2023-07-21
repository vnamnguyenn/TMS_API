import {PaginationFilter} from '../../shared/types/filter.js';
import {IUser, IUserList} from '../models/user.model.js';
import {CreateResponse, ItemResponse} from '../models/response.model.js';
import {User} from '../entities/user.entity.js';
export interface UserRepository {
    getById(id: string): Promise<ItemResponse<IUser>>;
    getEmailByUserId(id: string): Promise<ItemResponse<IUser>>;
    getAll(filter: PaginationFilter): Promise<IUserList[]>;
    create(user: User): Promise<CreateResponse>;
}
