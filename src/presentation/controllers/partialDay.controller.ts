import {Request, Response} from 'express';
import PartialDayRepositoryImpl from '../../infrastructure/repositories/partialDayRepository.impl.js';
import {PaginationFilter} from '../../shared/types/filter.js';
import {CreatePartialDayDto, UpdatePartialDayDto} from '../dtos/partialDay.dto.js';
import {StatusCode} from '../../shared/enums/statusCode.enum.js';
import {ErrorMessage} from '../../shared/enums/errorMessage.enum.js';
import {UpdatePartialDayUseCase} from '../../application/useCases/partialDay/updatePartialDay.useCase.js';
import {CreatePartialDayUseCase} from '../../application/useCases/partialDay/createPartialDay.useCase.js';
import {GetPartialDayByIdUseCase} from '../../application/useCases/partialDay/getPartialDayById.useCase.js';
import {GetAllPartialDayUseCase} from '../../application/useCases/partialDay/getAllPartialDay.useCase.js';
import {DeletePartialDayUseCase} from '../../application/useCases/partialDay/deletePartialDay.useCase.js';

const partialDayRepositoryImpl = new PartialDayRepositoryImpl();
const getPartialDayByIdUseCase = new GetPartialDayByIdUseCase(partialDayRepositoryImpl);
const getAllPartialDayUseCase = new GetAllPartialDayUseCase(partialDayRepositoryImpl);
const createPartialDayUseCase = new CreatePartialDayUseCase(partialDayRepositoryImpl);
const updatePartialDayUseCase = new UpdatePartialDayUseCase(partialDayRepositoryImpl);
const deletePartialDayUseCase = new DeletePartialDayUseCase(partialDayRepositoryImpl);

export class PartialDayController {
    constructor() {
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const {data} = await getPartialDayByIdUseCase.execute(parseInt(req.params.id));
            if (data) {
                return res.status(StatusCode.OK).json({status: {code: res.statusCode}, data});
            }
            return res
                .status(StatusCode.NotFound)
                .json({status: {code: res.statusCode, message: `Partial day ${ErrorMessage.NotFound}`}, data: {}});
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
            const response = await getAllPartialDayUseCase.execute(filter);
            return res.status(StatusCode.OK).json(response);
        } catch (err) {
            console.error(err);
            return res
                .status(StatusCode.InternalServer)
                .json({status: {code: res.statusCode, message: ErrorMessage.InternalServerError}, error: err});
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const userId = '1427fada-0a05-4588-a09b-c2e6eb0335bb';
            const model: CreatePartialDayDto = req.body;
            model.createdBy = userId;
            model.updatedBy = model.createdBy;
            const {status, data} = await createPartialDayUseCase.execute(model);
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

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const userId = '1427fada-0a05-4588-a09b-c2e6eb0335bb';
            const model: UpdatePartialDayDto = req.body;
            model.id = parseInt(req.params.id);
            model.updatedBy = userId;
            const {status} = await updatePartialDayUseCase.execute(model);
            if (status.code === StatusCode.OK) {
                return res.status(StatusCode.Created).json({status});
            }
            return res.status(status.code).json({status});
        } catch (err) {
            console.error(err);
            return res
                .status(StatusCode.InternalServer)
                .json({status: {code: res.statusCode, message: ErrorMessage.InternalServerError}, error: err});
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const {status} = await deletePartialDayUseCase.execute(parseInt(req.params.id));
            if (status.code === StatusCode.OK) {
                return res.status(status.code).json({status});
            }
            return res.status(status.code).json({status});
        } catch (err) {
            console.error(err);
            return res
                .status(StatusCode.InternalServer)
                .json({status: {code: res.statusCode, message: ErrorMessage.InternalServerError}, error: err});
        }
    }
}
