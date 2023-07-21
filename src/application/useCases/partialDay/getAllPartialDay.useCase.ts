import {PartialDayRepository} from '../../../domain/repositories/partialDay.repository.js';
import {PaginationFilter} from '../../../shared/types/filter.js';
import {GetPartialDayDto} from '../../../presentation/dtos/partialDay.dto.js';
import {ItemsResponse} from '../../../domain/models/response.model.js';

export class GetAllPartialDayUseCase {
    constructor(private readonly iPartialDay: PartialDayRepository) {
    }

    async execute(filter: PaginationFilter): Promise<ItemsResponse<GetPartialDayDto>> {
        const data = await this.iPartialDay.getAll(filter);
        const totalRecords: number = Number(data[0]?.totalRecords ?? 0);
        const totalPages = filter.pageSize == 0 ? 1 : Math.ceil(totalRecords / Number(filter.pageSize));
        const currentPage = filter.pageNumber;
        if (currentPage <= totalPages) {
            let partialDays: GetPartialDayDto[] = data.map(({id, name, createdDate, updatedDate}) => ({
                id,
                name,
                createdDate,
                updatedDate,
            }));
            return {
                totalRecords: totalRecords,
                currentPage: currentPage,
                totalPages: totalPages,
                data: partialDays,
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
