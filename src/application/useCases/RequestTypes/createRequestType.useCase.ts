import {v4 as uuidv4} from 'uuid';
import {RequestType} from '../../../domain/entities/requestType.entity.js';
import {RequestTypeRepository} from '../../../domain/repositories/requestType.repository.js';
import {CreateRequestTypeDto} from '../../../presentation/dtos/requestType.dto.js';
import {CreateResponse} from '../../../domain/models/response.model.js';
export class CreateRequestTypeUseCase {
    constructor(private readonly requestTypeRepository: RequestTypeRepository) {}
    async execute(model: CreateRequestTypeDto): Promise<CreateResponse> {
        const requestType = new RequestType(uuidv4(), model.name, model.description, model.createdBy, model.updatedBy);
        return await this.requestTypeRepository.create(requestType);
    }
}
