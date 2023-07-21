import {ItemResponse} from '../../../domain/models/response.model.js';
import {RequestRepository} from '../../../domain/repositories/request.repository.js';
import {GetRequestDto} from '../../../presentation/dtos/request.dto.js';

export class GetRequestByIdUseCase {
    constructor(private readonly requestRepository: RequestRepository) {
    }

    async execute(userId: string, id: string): Promise<ItemResponse<GetRequestDto>> {
        const data = await this.requestRepository.getById(userId, id);
        console.log(data);
        if (data) {
            const request: GetRequestDto = {
                id: data.requestId,
                requester: {id: data.requesterId, userName: data.requesterName},
                approver: {id: data.approverId, userName: data.approverName},
                supervisor: {id: data.supervisorId, userName: data.supervisorName},
                informTo: {id: data.informToId, userName: data.informToName},
                status: {id: data.statusId, name: data.statusName},
                partialDay: {id: data.partialDayId, name: data.partialDayName},
                requestReason: {id: data.requestReasonId, name: data.requestReasonName},
                requestType: {id: data.requestTypeId, name: data.requestTypeName},
                createdDate: data.createdDate,
                updatedDate: data.updatedDate,
                comment: data.comment,
                detailReason: data.detailReason,
                startDate: data.startDate,
                endDate: data.endDate,
            };
            return {
                data: request,
            };
        }
        return {
            data: {},
        };
    }
}
