import {RequestRepository} from '../../../domain/repositories/request.repository.js';
import {ResponseStatus} from '../../../domain/models/response.model.js';
export class CancelRequestUseCase {
    constructor(private readonly requestRepository: RequestRepository) {}
    async execute(id: string, comment: string): Promise<ResponseStatus> {
        return await this.requestRepository.cancel(id, comment);
    }
}
