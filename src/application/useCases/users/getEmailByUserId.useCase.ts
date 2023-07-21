import {ItemResponse} from '../../../domain/models/response.model.js';
import {UserRepository} from '../../../domain/repositories/user.repository.js';
import {GetUserDto} from '../../../presentation/dtos/user.dto.js';
export class GetEmailByUserIdUseCase {
    constructor(private readonly userRepository: UserRepository) {}
    async execute(id: string): Promise<ItemResponse<GetUserDto>> {
        return await this.userRepository.getEmailByUserId(id);
    }
}
