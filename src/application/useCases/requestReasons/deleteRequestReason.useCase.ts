import {ResponseStatus} from '../../../domain/models/response.model.js';
import {RequestReasonRepository} from '../../../domain/repositories/requestReason.repository.js';
export class DeleteRequestReasonUseCase {
    constructor(private readonly RequestReasonRepository: RequestReasonRepository) {}
    async execute(id: string): Promise<ResponseStatus> {
        return await this.RequestReasonRepository.delete(id);
    }
}
