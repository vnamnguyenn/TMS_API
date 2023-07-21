import {Request, Response} from 'express';
import RequestReasonRepositoryImpl from '../../infrastructure/repositories/requestReasonRepository.impl.js';
import {PaginationFilter} from '../../shared/types/filter.js';
import {CreateRequestReasonDto, UpdateRequestReasonDto} from '../dtos/requestReason.dto.js';
import {StatusCode} from '../../shared/enums/statusCode.enum.js';
import {ErrorMessage} from '../../shared/enums/errorMessage.enum.js';
import {UpdateRequestReasonUseCase} from '../../application/useCases/requestReasons/updateRequestReason.useCase.js';
import {CreateRequestReasonUseCase} from '../../application/useCases/requestReasons/createRequestReason.useCase.js';
import {GetRequestReasonByIdUseCase} from '../../application/useCases/requestReasons/getRequestReasonById.useCase.js';
import {GetRequestReasonsUseCase} from '../../application/useCases/requestReasons/getRequestReasons.useCase.js';
import {DeleteRequestReasonUseCase} from '../../application/useCases/requestReasons/deleteRequestReason.useCase.js';

const requestReasonRepositoryImpl = new RequestReasonRepositoryImpl();
const getRequestReasonByIdUseCase = new GetRequestReasonByIdUseCase(requestReasonRepositoryImpl);
const getRequestReasonsUseCase = new GetRequestReasonsUseCase(requestReasonRepositoryImpl);
const createRequestReasonUseCase = new CreateRequestReasonUseCase(requestReasonRepositoryImpl);
const updateRequestReasonUseCase = new UpdateRequestReasonUseCase(requestReasonRepositoryImpl);
const deleteRequestReasonUseCase = new DeleteRequestReasonUseCase(requestReasonRepositoryImpl);

export class RequestReasonController {
    constructor() {
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const RequestReasonId = req.params.id;
            const {data} = await getRequestReasonByIdUseCase.execute(RequestReasonId);
            if (data) {
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
                sortDirection: req.query.sortDirection?.toString() || 'asc',
                sortExpression: req.query.sortExpression?.toString() || 'name',
            };
            const response = await getRequestReasonsUseCase.execute(filter);
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
            const model: CreateRequestReasonDto = req.body;
            model.createdBy = userId;
            model.updatedBy = model.createdBy;
            const {status, data} = await createRequestReasonUseCase.execute(model);
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
            const model: UpdateRequestReasonDto = req.body;
            model.id = req.params.id;
            model.updatedBy = userId;
            const {status} = await updateRequestReasonUseCase.execute(model);
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
            const {status} = await deleteRequestReasonUseCase.execute(req.params.id);
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
