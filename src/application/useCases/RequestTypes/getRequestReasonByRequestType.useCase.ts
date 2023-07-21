import {RequestTypeRepository} from '../../../domain/repositories/requestType.repository.js';
export class GetRequestReasonByRequestTypeUseCase {
    constructor(private readonly requestTypeRepository: RequestTypeRepository) {}
    async execute(id: string) {
        return await this.requestTypeRepository.getRequestReason(id);
    }
}
