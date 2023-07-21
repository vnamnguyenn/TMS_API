import {RequestReason} from '../entities/requestReason.entity.js';
import {PaginationFilter} from '../../shared/types/filter.js';
import {IRequestReason, IRequestReasonList} from '../models/requestReason.model.js';
import {CreateResponse, ItemResponse, ResponseStatus} from '../models/response.model.js';
export interface RequestReasonRepository {
    getById(id: string): Promise<ItemResponse<IRequestReason>>;
    getAll(filter: PaginationFilter): Promise<IRequestReasonList[]>;
    create(RequestReason: RequestReason): Promise<CreateResponse>;
    update(RequestReason: RequestReason): Promise<ResponseStatus>;
    delete(id: string): Promise<ResponseStatus>;
}
