import {RequestRepository} from '../../../domain/repositories/request.repository.js';
import {PaginationFilter} from '../../../shared/types/filter.js';
import {GetRequestDto} from '../../../presentation/dtos/request.dto.js';
import {ItemsResponse} from '../../../domain/models/response.model.js';

export class GetAllRequestsUseCase {
    constructor(private readonly requestRepository: RequestRepository) {
    }

    async execute(userId: string, filter: PaginationFilter): Promise<ItemsResponse<GetRequestDto>> {
        const data = await this.requestRepository.getAll(userId, filter);
        const totalRecords = Number(data[0]?.totalRecords);
        const totalPages = filter.pageSize == 0 ? 1 : Math.ceil(totalRecords / Number(filter.pageSize));
        const currentPage = filter.pageNumber;
        console.log(currentPage, totalPages);
        if (currentPage <= totalPages) {
            let requests: GetRequestDto[] = data
                .slice(1)
                .map(
                    ({
                         requestId,
                         createdDate,
                         startDate,
                         endDate,
                         statusId,
                         statusName,
                         approverId,
                         approverName,
                         supervisorId,
                         userId,
                         supervisorName,
                         partialDayId,
                         partialDayName,
                         requestTypeName,
                         requestReasonName,
                     }) => ({
                        id: requestId,
                        userId: userId,
                        approver: {id: approverId, userName: approverName},
                        supervisor: {id: supervisorId, userName: supervisorName},
                        partialDay: {id: partialDayId, name: partialDayName},
                        requestType: requestTypeName,
                        requestReason: requestReasonName,
                        status: {id: statusId, name: statusName},
                        createdDate: createdDate,
                        startDate,
                        endDate,
                    }),
                );
            return {
                totalRecords: totalRecords,
                currentPage: currentPage,
                totalPages: totalPages,
                data: requests,
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
