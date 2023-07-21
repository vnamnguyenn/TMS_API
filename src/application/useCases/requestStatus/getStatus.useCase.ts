import {RequestStatusRepository} from '../../../domain/repositories/requestStatus.repository.js';
import {PaginationFilter} from '../../../shared/types/filter.js';
import {GetRequestStatusDto} from '../../../presentation/dtos/requestStatus.dto.js';
import {ItemsResponse} from '../../../domain/models/response.model.js';
export class GetStatusUseCase {
    constructor(private readonly iStatus: RequestStatusRepository) {}
    async execute(filter: PaginationFilter): Promise<ItemsResponse<GetRequestStatusDto>> {
        const data = await this.iStatus.getAll(filter);
        const totalRecords: number = Number(data[0]?.totalRecords??0);
        const totalPages = filter.pageSize == 0 ? 1 : Math.ceil(totalRecords / Number(filter.pageSize));
        const currentPage = filter.pageNumber;
        if (currentPage <= totalPages ) {
            let Status: GetRequestStatusDto[] = data.map(({id, name, createdDate, updatedDate}) => ({
                id,
                name,
                createdDate,
                updatedDate,
            }));
            return {
                totalRecords: totalRecords,
                currentPage: filter.pageNumber,
                totalPages: filter.pageSize == 0 ? 1 : Math.ceil(totalRecords / Number(filter.pageSize)),
                data: Status,
            };
        }
        return {
            totalRecords: totalRecords,
            currentPage: currentPage,
            totalPages: totalPages,
            data: [],
        };
    }
}
