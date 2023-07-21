import {RequestType} from '../entities/requestType.entity.js';
import {PaginationFilter} from '../../shared/types/filter.js';
import {IRequestType, IRequestTypeList} from '../models/requestType.model.js';
import {CreateResponse, ItemResponse, ResponseStatus} from '../models/response.model.js';
import {IRequestReason} from '../models/requestReason.model.js';
export interface RequestTypeRepository {
    getById(id: string): Promise<ItemResponse<IRequestType>>;
    getAll(filter: PaginationFilter): Promise<IRequestTypeList[]>;
    create(requestType: RequestType): Promise<CreateResponse>;
    update(requestType: RequestType): Promise<ResponseStatus>;
    delete(id: string): Promise<ResponseStatus>;
    getRequestReason(id: string): Promise<IRequestReason[]>;
}
