import {PartialDay} from '../entities/partialDay.entity.js';
import {PaginationFilter} from '../../shared/types/filter.js';
import {IPartialDay, IPartialDayList} from '../models/partialDay.model.js';
import {CreateResponse, ItemResponse, ResponseStatus} from '../models/response.model.js';

export interface PartialDayRepository {
    getById(id: number): Promise<ItemResponse<IPartialDay>>;
    getAll(filter: PaginationFilter): Promise<IPartialDayList[]>;
    create(partialDay: PartialDay): Promise<CreateResponse>;
    update(partialDay: PartialDay): Promise<ResponseStatus>;
    delete(id: number): Promise<ResponseStatus>;
}
