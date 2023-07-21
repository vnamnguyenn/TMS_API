import {CreateResponse} from '../../../domain/models/response.model.js';
import {CreateUserDto} from '../../../presentation/dtos/user.dto.js';
import {UserRepository} from '../../../domain/repositories/user.repository.js';
import {User} from '../../../domain/entities/user.entity.js';
import {v4 as uuidv4} from 'uuid';
export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}
    async execute(model: CreateUserDto): Promise<CreateResponse> {
        const user = new User(model.userId, model.name,model.picture, model.email, model.userId, model.userId);
        return await this.userRepository.create(user);
    }
}
