import {Request, Response} from 'express';
import UserRepositoryImpl from '../../infrastructure/repositories/userRepository.impl.js';
import {PaginationFilter} from '../../shared/types/filter.js';
import {StatusCode} from '../../shared/enums/statusCode.enum.js';
import {ErrorMessage} from '../../shared/enums/errorMessage.enum.js';
import {GetUserByIdUseCase} from '../../application/useCases/users/getUserById.useCase.js';
import {GetAllUserUseCase} from '../../application/useCases/users/getAllUser.useCase.js';
import {GetEmailByUserIdUseCase} from '../../application/useCases/users/getEmailByUserId.useCase.js';
import {CreatePartialDayDto} from '../dtos/partialDay.dto.js';
import {CreateUserUseCase} from '../../application/useCases/users/createUser.useCase.js';
import {CreateUserDto} from '../dtos/user.dto.js';

const userRepositoryImpl = new UserRepositoryImpl();
const getEmailByUserIdUseCase = new GetEmailByUserIdUseCase(userRepositoryImpl);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepositoryImpl);
const getAllUserUseCase = new GetAllUserUseCase(userRepositoryImpl);
const createUserUseCase = new CreateUserUseCase(userRepositoryImpl);

export class UserController {
    constructor() {
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const model: CreateUserDto = req.body;
            const {status, data} = await createUserUseCase.execute(model);
            console.log(data);
            if (status.code === StatusCode.Created) {
                return res.status(StatusCode.Created).json({status, data});
            }
            return res.status(status.code).json({status});
        } catch (err) {
            console.error(err);
            return res
                .status(StatusCode.InternalServer)
                .json({status: {code: res.statusCode, message: ErrorMessage.InternalServerError}, error: err});
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const UserId = req.params.id;
            const {data} = await getUserByIdUseCase.execute(UserId);
            if (data) {
                return res.status(StatusCode.OK).json({status: {code: res.statusCode}, data});
            }
            return res
                .status(StatusCode.NotFound)
                .json({status: {code: res.statusCode, message: `User ${ErrorMessage.NotFound}`}, data: {}});
        } catch (err) {
            console.error(err);
            return res
                .status(StatusCode.InternalServer)
                .json({status: {code: res.statusCode, message: ErrorMessage.InternalServerError}, error: err});
        }
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const filter: PaginationFilter = {
                pageNumber: parseInt(req.query?.pageNumber as string) || 1,
                pageSize: parseInt(req.query?.pageSize as string) || 0,
                search: req.query.search?.toString() || null,
                sortDirection: req.query.sortDirection?.toString() || 'asc',
                sortExpression: req.query.sortExpression?.toString() || 'name',
            };
            const response = await getAllUserUseCase.execute(filter);
            return res.status(StatusCode.OK).json(response);
        } catch (err) {
            console.error(err);
            return res
                .status(StatusCode.InternalServer)
                .json({status: {code: res.statusCode, message: ErrorMessage.InternalServerError}, error: err});
        }
    }
}
