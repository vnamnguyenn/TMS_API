import {RequestReason} from '../../../domain/entities/requestReason.entity.js';
import {RequestReasonRepository} from '../../../domain/repositories/requestReason.repository.js';
import {UpdateRequestReasonDto} from '../../../presentation/dtos/requestReason.dto.js';
import {ResponseStatus} from '../../../domain/models/response.model.js';
export class UpdateRequestReasonUseCase {
    constructor(private readonly RequestReasonRepository: RequestReasonRepository) {}
    async execute(model: UpdateRequestReasonDto): Promise<ResponseStatus> {
        const requestReason = new RequestReason(model.id, model.name, model.requestTypeId, '', model.updatedBy);
        return await this.RequestReasonRepository.update(requestReason);
    }
}
