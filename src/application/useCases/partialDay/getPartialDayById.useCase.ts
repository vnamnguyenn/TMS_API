import {ItemResponse} from '../../../domain/models/response.model.js';
import {PartialDayRepository} from '../../../domain/repositories/partialDay.repository.js';
import {GetPartialDayDto} from '../../../presentation/dtos/partialDay.dto.js';
export class GetPartialDayByIdUseCase {
    constructor(private readonly partialDayRepository: PartialDayRepository) {}
    async execute(id: number): Promise<ItemResponse<GetPartialDayDto>> {
        return await this.partialDayRepository.getById(id);
    }
}
