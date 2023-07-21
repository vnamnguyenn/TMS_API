import {ResponseStatus} from '../../../domain/models/response.model.js';
import {RequestTypeRepository} from '../../../domain/repositories/requestType.repository.js';
export class DeleteRequestTypeUseCase {
    constructor(private readonly requestTypeRepository: RequestTypeRepository) {}
    async execute(id: string): Promise<ResponseStatus> {
        return await this.requestTypeRepository.delete(id);
    }
}
