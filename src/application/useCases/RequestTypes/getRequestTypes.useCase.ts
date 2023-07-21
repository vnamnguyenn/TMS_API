import {RequestTypeRepository} from '../../../domain/repositories/requestType.repository.js';
import {PaginationFilter} from '../../../shared/types/filter.js';
import {GetRequestTypeDto} from '../../../presentation/dtos/requestType.dto.js';
import {ItemsResponse} from '../../../domain/models/response.model.js';

export class GetRequestTypesUseCase {
    constructor(private readonly requestTypeRepository: RequestTypeRepository) {
    }

    async execute(filter: PaginationFilter): Promise<ItemsResponse<GetRequestTypeDto>> {
        const data = await this.requestTypeRepository.getAll(filter);
        const totalRecords: number = Number(data[0]?.totalRecords??0);
        const totalPages = filter.pageSize == 0 ? 1 : Math.ceil(totalRecords / Number(filter.pageSize));
        const currentPage = filter.pageNumber;
        if (currentPage <= totalPages) {
            let requestTypes: GetRequestTypeDto[] = data.map(({
                                                                  id,
                                                                  name,
                                                                  isActive,
                                                                  description,
                                                                  createdDate,
                                                                  updatedDate,
                                                              }) => ({
                id,
                name,
                description,
                isActive,
                createdDate,
                updatedDate,
            }));
            return {
                totalRecords: totalRecords,
                currentPage: currentPage,
                totalPages: totalPages,
                data: requestTypes,
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
