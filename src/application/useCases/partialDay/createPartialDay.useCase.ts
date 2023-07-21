import {PartialDay} from '../../../domain/entities/partialDay.entity.js';
import {PartialDayRepository} from '../../../domain/repositories/partialDay.repository.js';
import {CreatePartialDayDto} from '../../../presentation/dtos/partialDay.dto.js';
import {CreateResponse} from '../../../domain/models/response.model.js';
export class CreatePartialDayUseCase {
    constructor(private readonly partialDayRepository: PartialDayRepository) {}
    async execute(model: CreatePartialDayDto): Promise<CreateResponse> {
        const partialDay = new PartialDay(model.id, model.name, model.createdBy, model.updatedBy);
        return await this.partialDayRepository.create(partialDay);
    }
}
