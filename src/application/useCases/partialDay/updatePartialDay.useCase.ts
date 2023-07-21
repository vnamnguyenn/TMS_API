import {PartialDay} from '../../../domain/entities/partialDay.entity.js';
import {PartialDayRepository} from '../../../domain/repositories/partialDay.repository.js';
import {UpdatePartialDayDto} from '../../../presentation/dtos/partialDay.dto.js';
import {ResponseStatus} from '../../../domain/models/response.model.js';
export class UpdatePartialDayUseCase {
    constructor(private readonly PartialDayRepository: PartialDayRepository) {}
    async execute(model: UpdatePartialDayDto): Promise<ResponseStatus> {
        const partialDay = new PartialDay(model.id, model.name, '', model.updatedBy);
        return await this.PartialDayRepository.update(partialDay);
    }
}
