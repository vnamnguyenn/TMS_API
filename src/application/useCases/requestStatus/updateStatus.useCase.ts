import {v4 as uuidv4} from 'uuid';
import {Status} from '../../../domain/entities/status.entity.js';
import {RequestStatusRepository} from '../../../domain/repositories/requestStatus.repository.js';
import {UpdateRequestStatusDto} from '../../../presentation/dtos/requestStatus.dto.js';
import {ResponseStatus} from '../../../domain/models/response.model.js';
export class UpdateStatusUseCase {
    constructor(private readonly StatusRepository: RequestStatusRepository) {}
    async execute(model: UpdateRequestStatusDto): Promise<ResponseStatus> {
        const status = new Status(uuidv4(), model.name, '', model.updatedBy);
        return await this.StatusRepository.update(status);
    }
}
