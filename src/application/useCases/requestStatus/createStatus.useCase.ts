import {v4 as uuidv4} from 'uuid';
import {Status} from '../../../domain/entities/status.entity.js';
import {RequestStatusRepository} from '../../../domain/repositories/requestStatus.repository.js';
import {CreateRequestStatusDto} from '../../../presentation/dtos/requestStatus.dto.js';
import {CreateResponse} from '../../../domain/models/response.model.js';
export class CreateStatusUseCase {
    constructor(private readonly StatusRepository: RequestStatusRepository) {}
    async execute(model: CreateRequestStatusDto): Promise<CreateResponse> {
        const status = new Status(uuidv4(), model.name, model.createdBy, model.updatedBy);
        return await this.StatusRepository.create(status);
    }
}
