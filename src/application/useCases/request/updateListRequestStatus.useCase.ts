import {Request} from '../../../domain/entities/request.entity.js';
import {RequestRepository} from '../../../domain/repositories/request.repository.js';
import {UpdateListRequestStatusDto} from '../../../presentation/dtos/request.dto.js';
import {ResponseStatus} from '../../../domain/models/response.model.js';
export class UpdateListRequesStatustUseCase {
    constructor(private readonly requestRepository: RequestRepository) {}
    async execute(model: UpdateListRequestStatusDto): Promise<ResponseStatus> {
        const utcDate: string = new Date().toUTCString();
        return await this.requestRepository.updateStatus(model.ids, model.status, model.updatedBy, utcDate);
    }
}
