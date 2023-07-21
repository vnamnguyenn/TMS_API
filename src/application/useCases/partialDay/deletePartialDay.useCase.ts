import {ResponseStatus} from '../../../domain/models/response.model.js';
import {PartialDayRepository} from '../../../domain/repositories/partialDay.repository.js';
export class DeletePartialDayUseCase {
    constructor(private readonly partialDayRepository: PartialDayRepository) {}
    async execute(id: number): Promise<ResponseStatus> {
        return await this.partialDayRepository.delete(id);
    }
}
