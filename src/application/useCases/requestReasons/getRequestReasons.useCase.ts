import {RequestReasonRepository} from '../../../domain/repositories/requestReason.repository.js';
import {PaginationFilter} from '../../../shared/types/filter.js';
import {GetListRequestReasonDto} from '../../../presentation/dtos/requestReason.dto.js';
import {ItemsResponse} from '../../../domain/models/response.model.js';

export class GetRequestReasonsUseCase {
    constructor(private readonly requestReasonRepository: RequestReasonRepository) {
    }

    async execute(filter: PaginationFilter): Promise<ItemsResponse<GetListRequestReasonDto>> {
        const data = await this.requestReasonRepository.getAll(filter);
        const totalRecords: number = Number(data[0]?.totalRecords ?? 0);
        const totalPages = filter.pageSize == 0 ? 1 : Math.ceil(totalRecords / Number(filter.pageSize));
        const currentPage = filter.pageNumber;

         if (currentPage <= totalPages) {
            let requestReasons: GetListRequestReasonDto[] = data.map(
                ({id, name, requestTypeId, requestTypeName, createdDate, updatedDate}) => ({
                    id,
                    name,
                    requestType: {id: requestTypeId, name: requestTypeName},
                    createdDate,
                    updatedDate,
                }),
            );
            return {
                totalRecords: totalRecords,
                currentPage: currentPage,
                totalPages: totalPages,
                data: requestReasons,
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
