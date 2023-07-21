import {ItemResponse} from '../../../domain/models/response.model.js';
import {RequestReasonRepository} from '../../../domain/repositories/requestReason.repository.js';
import {GetRequestReasonDto} from '../../../presentation/dtos/requestReason.dto.js';
export class GetRequestReasonByIdUseCase {
    constructor(private readonly RequestReasonRepository: RequestReasonRepository) {}
    async execute(id: string): Promise<ItemResponse<GetRequestReasonDto>> {
        return await this.RequestReasonRepository.getById(id);
    }
}
