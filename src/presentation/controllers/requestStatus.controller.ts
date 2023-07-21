import {Request, Response} from 'express';
import StatusRepositoryImpl from '../../infrastructure/repositories/requestStatusRepository.impl.js';
import {PaginationFilter} from '../../shared/types/filter.js';
import {CreateRequestStatusDto, UpdateRequestStatusDto} from '../dtos/requestStatus.dto.js';
import {StatusCode} from '../../shared/enums/statusCode.enum.js';
import {ErrorMessage} from '../../shared/enums/errorMessage.enum.js';
import {UpdateStatusUseCase} from '../../application/useCases/requestStatus/updateStatus.useCase.js';
import {CreateStatusUseCase} from '../../application/useCases/requestStatus/createStatus.useCase.js';
import {GetStatusByIdUseCase} from '../../application/useCases/requestStatus/getStatusById.useCase.js';
import {GetStatusUseCase} from '../../application/useCases/requestStatus/getStatus.useCase.js';
import {DeleteStatusUseCase} from '../../application/useCases/requestStatus/deleteStatus.useCase.js';

const statusRepositoryImpl = new StatusRepositoryImpl();
const getStatusByIdUseCase = new GetStatusByIdUseCase(statusRepositoryImpl);
const getStatussUseCase = new GetStatusUseCase(statusRepositoryImpl);
const createStatusUseCase = new CreateStatusUseCase(statusRepositoryImpl);
const updateStatusUseCase = new UpdateStatusUseCase(statusRepositoryImpl);
const deleteStatusUseCase = new DeleteStatusUseCase(statusRepositoryImpl);

export class RequestStatusController {
    constructor() {
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const {data} = await getStatusByIdUseCase.execute(req.params.id);
            if (data) {
                return res.status(StatusCode.OK).json({status: {code: 200}, data});
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
            const response = await getStatussUseCase.execute(filter);
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
            const model: CreateRequestStatusDto = req.body;
            model.createdBy = userId;
            model.updatedBy = model.createdBy;
            const {status, data} = await createStatusUseCase.execute(model);
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
            const model: UpdateRequestStatusDto = req.body;
            model.id = req.params.id;
            model.updatedBy = userId;
            const {status} = await updateStatusUseCase.execute(model);
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
            const {status} = await deleteStatusUseCase.execute(req.params.id);
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
