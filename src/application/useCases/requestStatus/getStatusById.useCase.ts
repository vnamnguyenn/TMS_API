import {ItemResponse} from '../../../domain/models/response.model.js';
import {RequestStatusRepository} from '../../../domain/repositories/requestStatus.repository.js';
import {GetRequestStatusDto} from '../../../presentation/dtos/requestStatus.dto.js';
export class GetStatusByIdUseCase {
    constructor(private readonly StatusRepository: RequestStatusRepository) {}
    async execute(id: string): Promise<ItemResponse<GetRequestStatusDto>> {
        return await this.StatusRepository.getById(id);
    }
}
