import {UserRepository} from '../../../domain/repositories/user.repository.js';
import {PaginationFilter} from '../../../shared/types/filter.js';
import {GetUserDto} from '../../../presentation/dtos/user.dto.js';
import {ItemsResponse} from '../../../domain/models/response.model.js';

export class GetAllUserUseCase {
    constructor(private readonly UserRepository: UserRepository) {
    }

    async execute(filter: PaginationFilter): Promise<ItemsResponse<GetUserDto>> {
        const data = await this.UserRepository.getAll(filter);
        const totalRecords: number = Number(data[0]?.totalRecords ?? 0);
        const totalPages = filter.pageSize == 0 ? 1 : Math.ceil(totalRecords / Number(filter.pageSize));
        const currentPage = filter.pageNumber;
        if (currentPage <= totalPages) {
            let users: GetUserDto[] = data.map(
                ({
                     id,
                     name,
                     userName,
                     address,
                     birthday,
                     userCode,
                     departmentId,
                     specificationId,
                     email,
                     phoneNumber,
                     supervisor,
                     createdDate,
                     updatedDate,
                 }) => ({
                    id,
                    name,
                    userName,
                    address,
                    birthday,
                    departmentId,
                    email,
                    phoneNumber,
                    specificationId,
                    supervisor,
                    userCode,
                    createdDate,
                    updatedDate,
                }),
            );
            return {
                totalRecords: totalRecords,
                currentPage: currentPage,
                totalPages: totalPages,
                data: users,
            };
        }
        return {
            totalRecords: totalRecords,
            currentPage: currentPage,
            totalPages: totalPages,
            data: [],
        };
    }
}
