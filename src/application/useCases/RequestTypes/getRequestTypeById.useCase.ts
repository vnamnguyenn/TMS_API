import {ItemResponse} from '../../../domain/models/response.model.js';
import {RequestTypeRepository} from '../../../domain/repositories/requestType.repository.js';
import {GetRequestTypeDto} from '../../../presentation/dtos/requestType.dto.js';
export class GetRequestTypeByIdUseCase {
    constructor(private readonly requestTypeRepository: RequestTypeRepository) {}
    async execute(id: string): Promise<ItemResponse<GetRequestTypeDto>> {
        return await this.requestTypeRepository.getById(id);
    }
}
