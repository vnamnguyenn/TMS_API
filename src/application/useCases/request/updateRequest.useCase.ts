import {Request} from '../../../domain/entities/request.entity.js';
import {RequestRepository} from '../../../domain/repositories/request.repository.js';
import {UpdateRequestDto} from '../../../presentation/dtos/request.dto.js';
import {ResponseStatus} from '../../../domain/models/response.model.js';
export class UpdateRequestUseCase {
    constructor(private readonly requestRepository: RequestRepository) {}
    async execute(model: UpdateRequestDto): Promise<ResponseStatus> {
        const request = new Request(
            model.id,
            model.userId,
            model.requestTypeId,
            model.requestReasonId,
            model.partialDayId,
            null,
            null,
            null,
            null,
            null,
            model.detailReason,
            null,
            model.startDate,
            model.endDate,
            null,
            model.updatedBy,
        );
        return await this.requestRepository.update(request);
    }
}
