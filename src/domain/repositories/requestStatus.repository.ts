import {Status} from '../entities/status.entity.js';
import {PaginationFilter} from '../../shared/types/filter.js';
import {IRequestStatus, IRequestStatusList} from '../models/requestStatus.model.js';
import {CreateResponse, ItemResponse, ResponseStatus} from '../models/response.model.js';

export interface RequestStatusRepository {
    getById(id: string): Promise<ItemResponse<IRequestStatus>>;
    getAll(filter: PaginationFilter): Promise<IRequestStatusList[]>;
    create(status: Status): Promise<CreateResponse>;
    update(status: Status): Promise<ResponseStatus>;
    delete(id: string): Promise<ResponseStatus>;
}
