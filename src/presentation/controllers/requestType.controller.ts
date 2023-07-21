import {Request, Response} from 'express';
import RequestTypeRepositoryImpl from '../../infrastructure/repositories/requestTypeRepository.impl.js';
import {PaginationFilter} from '../../shared/types/filter.js';
import {CreateRequestTypeDto, UpdateRequestTypeDto} from '../dtos/requestType.dto.js';
import {StatusCode} from '../../shared/enums/statusCode.enum.js';
import {ErrorMessage} from '../../shared/enums/errorMessage.enum.js';
import {UpdateRequestTypeUseCase} from '../../application/useCases/requestTypes/updateRequestType.useCase.js';
import {CreateRequestTypeUseCase} from '../../application/useCases/requestTypes/createRequestType.useCase.js';
import {GetRequestTypeByIdUseCase} from '../../application/useCases/requestTypes/getRequestTypeById.useCase.js';
import {GetRequestTypesUseCase} from '../../application/useCases/requestTypes/getRequestTypes.useCase.js';
import {DeleteRequestTypeUseCase} from '../../application/useCases/requestTypes/deleteRequestType.useCase.js';
import {
    GetRequestReasonByRequestTypeUseCase,
} from '../../application/useCases/requestTypes/getRequestReasonByRequestType.useCase.js';
import {isBoolean} from 'util';

const requestTypeRepositoryImpl = new RequestTypeRepositoryImpl();
const getRequestReasonByRequestTypeUseCase = new GetRequestReasonByRequestTypeUseCase(requestTypeRepositoryImpl);
const getRequestTypeByIdUseCase = new GetRequestTypeByIdUseCase(requestTypeRepositoryImpl);
const getRequestTypesUseCase = new GetRequestTypesUseCase(requestTypeRepositoryImpl);
const createRequestTypeUseCase = new CreateRequestTypeUseCase(requestTypeRepositoryImpl);
const updateRequestTypeUseCase = new UpdateRequestTypeUseCase(requestTypeRepositoryImpl);
const deleteRequestTypeUseCase = new DeleteRequestTypeUseCase(requestTypeRepositoryImpl);

export class RequestTypeController {
    constructor() {
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const requestTypeId = req.params.id;
            const {data} = await getRequestTypeByIdUseCase.execute(requestTypeId);
            return res.status(StatusCode.OK).json( data);
        } catch (err) {
            console.error(err);
            return res
                .status(StatusCode.InternalServer)
                .json({status: {code: res.statusCode, message: ErrorMessage.InternalServerError}, error: err});
        }
    }

    async getRequestReason(req: Request, res: Response): Promise<Response> {
        try {
            const requestTypeId = req.params.id;
            const data = await getRequestReasonByRequestTypeUseCase.execute(requestTypeId);
            if (data.length > 0) {
                return res.status(StatusCode.OK).json({status: {code: 200}, data});
            }
            return res
                .status(StatusCode.NotFound)
                .json({status: {code: res.statusCode, message: `Request type ${ErrorMessage.NotFound}`}, data: {}});
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
                isActive: req.query.isActive?.toString() || null,
                sortDirection: req.query.sortDirection?.toString() || 'asc',
                sortExpression: req.query.sortExpression?.toString() || 'name',
            };
            const response = await getRequestTypesUseCase.execute(filter);
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
            const model: CreateRequestTypeDto = req.body;
            model.createdBy = userId;
            model.updatedBy = model.createdBy;
            const {status, data} = await createRequestTypeUseCase.execute(model);
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
            const model: UpdateRequestTypeDto = req.body;
            model.id = req.params.id;
            model.updatedBy = userId;
            const {status} = await updateRequestTypeUseCase.execute(model);
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
            const {status} = await deleteRequestTypeUseCase.execute(req.params.id);
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
