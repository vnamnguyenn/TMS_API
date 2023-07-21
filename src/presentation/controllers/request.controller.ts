import {Request, Response} from 'express';
import RequestRepositoryImpl from '../../infrastructure/repositories/requestRepository.impl.js';
import {RequestFilter} from '../../shared/types/filter.js';
import {StatusCode} from '../../shared/enums/statusCode.enum.js';
import {ErrorMessage} from '../../shared/enums/errorMessage.enum.js';
import {CreateRequestUseCase} from '../../application/useCases/request/createRequest.useCase.js';
import {GetAllRequestsUseCase} from '../../application/useCases/request/getAllRequest.useCase.js';
import {UpdateRequestUseCase} from '../../application/useCases/request/updateRequest.useCase.js';
import {GetRequestByIdUseCase} from '../../application/useCases/request/getRequestById.useCase.js';
import {UpdateListRequesStatustUseCase} from '../../application/useCases/request/updateListRequestStatus.useCase.js';
import {CancelRequestUseCase} from '../../application/useCases/request/cancelRequest.useCase.js';
import {CancelRequestDto, CreateRequestDto, UpdateListRequestStatusDto, UpdateRequestDto} from '../dtos/request.dto.js';
import {RequestStatus} from '../../shared/enums/requestStatus.enum.js';
import {performance} from 'perf_hooks';
import {EmailService} from '../../infrastructure/emailService/emailService.js';
import {GetEmailByUserIdUseCase} from '../../application/useCases/users/getEmailByUserId.useCase.js';
import UserRepositoryImpl from '../../infrastructure/repositories/userRepository.impl.js';

const requestRepositoryImpl = new RequestRepositoryImpl();
const userRepositoryImpl = new UserRepositoryImpl();
const getAllRequestsUseCase = new GetAllRequestsUseCase(requestRepositoryImpl);
const createRequestUseCase = new CreateRequestUseCase(requestRepositoryImpl);
const getEmailByUserIdUseCase = new GetEmailByUserIdUseCase(userRepositoryImpl);
const cancelRequestUseCase = new CancelRequestUseCase(requestRepositoryImpl);
const updateRequestUseCase = new UpdateRequestUseCase(requestRepositoryImpl);
const getRequestByIdUseCase = new GetRequestByIdUseCase(requestRepositoryImpl);
const updateListRequesStatustUseCase = new UpdateListRequesStatustUseCase(requestRepositoryImpl);
// const userId = '3eddafa2-52cf-4969-ba67-043fa4f1434e';
const emailService = new EmailService(10);

export class RequestController {
    constructor() {
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.auth?.payload.sub as string;
            const {data} = await getRequestByIdUseCase.execute(userId, req.params.id);
            return res.status(StatusCode.OK).json({data});
        } catch (err) {
            console.error(err);
            return res
                .status(StatusCode.InternalServer)
                .json({status: {code: res.statusCode, message: ErrorMessage.InternalServerError}, error: err});
        }
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.auth?.payload.sub as string;
            const params = req.query;
            const filter: RequestFilter = {
                isAdmin: false,
                pageNumber: parseInt(params?.pageNumber as string) || 1,
                pageSize: parseInt(params?.pageSize as string) || 0,
                search: params.search?.toString() || null,
                requestType: params.requestType ? params.requestType.toString().split(',') : null,
                startDate: params.startDate?.toString() || null,
                endDate: params.endDate?.toString() || null,
                status: params.status ? params.status.toString().split(',') : null,
            };

            const response = await getAllRequestsUseCase.execute(userId, filter);
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
            const userId = req.auth?.payload.sub as string;
            const email: string = req.auth?.payload.email as string;
            const model: CreateRequestDto = req.body;
            model.createdBy = userId;
            model.updatedBy = model.createdBy;
            model.statusId = RequestStatus.Submited;
            const {status, data} = await createRequestUseCase.execute(userId, model);
            if (status.code === StatusCode.Created) {
                emailService.sendEmail({
                    to: {
                        name: email,
                        address: email,
                    },
                    subject: 'Request has been created successfully',
                    html: `Bạn đã tạo lịch nghỉ phép từ ngày ${model.startDate} đến ${model.endDate} chúc bạn một ngày tốt lành!`,
                });
                return res.status(StatusCode.Created).json({status, data});
            }
            return res.status(status.code).json({status});
        } catch (err) {
            return res
                .status(StatusCode.InternalServer)
                .json({status: {code: res.statusCode, message: ErrorMessage.InternalServerError}, error: err});
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.auth?.payload.sub as string;
            const email: string = req.auth?.payload.email as string;
            const model: UpdateRequestDto = req.body;
            model.id = req.params.id;
            model.updatedBy = userId;
            model.userId = userId;
            const {status} = await updateRequestUseCase.execute(model);
            if (status.code === StatusCode.OK) {
                emailService.sendEmail({
                    to: {
                        name: email,
                        address: email,
                    },
                    subject: 'Request has been created successfully',
                    html: `Lịch nghỉ phép của bạn đã được cập nhật nghỉ từ ngày ${model.startDate} đến ${model.endDate} chúc bạn một ngày tốt lành!`,
                });
                return res.status(StatusCode.OK).json({status});
            }
            return res.status(status.code).json({status});
        } catch (err) {
            return res
                .status(StatusCode.InternalServer)
                .json({status: {code: res.statusCode, message: ErrorMessage.InternalServerError}, error: err});
        }
    }

    async updateStatus(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.auth?.payload.sub as string;
            const model: UpdateListRequestStatusDto = req.body;
            model.updatedBy = userId;
            const {status} = await updateListRequesStatustUseCase.execute(model);
            if (status.code === StatusCode.OK) {
                return res.status(StatusCode.OK).json({status});
            }
            return res.status(status.code).json({status});
        } catch (err) {
            console.error(err);
            return res
                .status(StatusCode.InternalServer)
                .json({status: {code: res.statusCode, message: ErrorMessage.InternalServerError}, error: err});
        }
    }

    async cancel(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.auth?.payload.sub as string;
            const email: string = req.auth?.payload.email as string;
            const model: CancelRequestDto = req.body;
            model.updatedBy = userId;
            const {status} = await cancelRequestUseCase.execute(req.params.id, model.comment);
            if (status.code === StatusCode.OK) {
                // let user;
                // if (userId === model.userId) {
                //     user = await getEmailByUserIdUseCase.execute(model.approverId);
                // } else {
                //     user = await getEmailByUserIdUseCase.execute(userId);
                // }
                emailService.sendEmail({
                    to: {
                        name: email,
                        address: email,
                    },
                    subject: 'Request has been canceled successfully',
                    html: `Request has been canceled successfully`,
                });
                return res.status(StatusCode.OK).json({status});
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
