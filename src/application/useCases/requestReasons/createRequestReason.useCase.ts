import {v4 as uuidv4} from 'uuid';
import {RequestReason} from '../../../domain/entities/requestReason.entity.js';
import {RequestReasonRepository} from '../../../domain/repositories/requestReason.repository.js';
import {CreateRequestReasonDto} from '../../../presentation/dtos/requestReason.dto.js';
import {CreateResponse} from '../../../domain/models/response.model.js';
export class CreateRequestReasonUseCase {
    constructor(private readonly RequestReasonRepository: RequestReasonRepository) {}
    async execute(model: CreateRequestReasonDto): Promise<CreateResponse> {
        const requestReason = new RequestReason(
            uuidv4(),
            model.name,
            model.requestTypeId,
            model.createdBy,
            model.updatedBy,
        );
        return await this.RequestReasonRepository.create(requestReason);
    }
}
