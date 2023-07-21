import {ResponseStatus} from '../../../domain/models/response.model.js';
import {RequestStatusRepository} from '../../../domain/repositories/requestStatus.repository.js';
export class DeleteStatusUseCase {
    constructor(private readonly StatusRepository: RequestStatusRepository) {}
    async execute(id: string): Promise<ResponseStatus> {
        return await this.StatusRepository.delete(id);
    }
}
