import {Request} from '../entities/request.entity.js';
import {PaginationFilter} from '../../shared/types/filter.js';
import {IRequest, IRequestList} from '../models/request.model.js';
import {CreateResponse, ItemResponse, ResponseStatus} from '../models/response.model.js';
export interface RequestRepository {
    getById(userId: string, id: string): Promise<IRequest>;
    getAll(userId: string, filter: PaginationFilter): Promise<IRequestList[]>;
    create(request: Request): Promise<CreateResponse>;
    update(request: Request): Promise<ResponseStatus>;
    cancel(id: string, comment: string): Promise<ResponseStatus>;
    updateStatus(ids: string[], status: string, updatedBy: string, updatedDate: string): Promise<ResponseStatus>;
}
