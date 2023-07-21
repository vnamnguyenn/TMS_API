import {v4 as uuidv4} from 'uuid';
import {Request} from '../../../domain/entities/request.entity.js';
import {RequestRepository} from '../../../domain/repositories/request.repository.js';
import {CreateRequestDto} from '../../../presentation/dtos/request.dto.js';
import {CreateResponse} from '../../../domain/models/response.model.js';
export class CreateRequestUseCase {
    constructor(private readonly requestRepository: RequestRepository) {}
    async execute(userId: string, model: CreateRequestDto): Promise<CreateResponse> {
        const request = new Request(
            uuidv4(),
            userId,
            model.requestTypeId,
            model.requestReasonId,
            model.partialDayId,
            model.statusId,
            model.supervisor,
            model.approver,
            model.informTo,
            null,
            model.detailReason,
            model.expectedDate,
            model.startDate,
            model.endDate,
            model.createdBy,
            model.updatedBy,
        );
        return await this.requestRepository.create(request);
    }
}
