import {RequestType} from '../../../domain/entities/requestType.entity.js';
import {RequestTypeRepository} from '../../../domain/repositories/requestType.repository.js';
import {UpdateRequestTypeDto} from '../../../presentation/dtos/requestType.dto.js';
import {ResponseStatus} from '../../../domain/models/response.model.js';
export class UpdateRequestTypeUseCase {
    constructor(private readonly requestTypeRepository: RequestTypeRepository) {}
    async execute(model: UpdateRequestTypeDto): Promise<ResponseStatus> {
        const requestType = new RequestType(model.id, model.name, model.description, '', model.updatedBy);
        return await this.requestTypeRepository.update(requestType);
    }
}
