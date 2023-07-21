import {RequestRepository} from '../../domain/repositories/request.repository.js';
import {PgPool} from '../database/DBConnection/PgConnection.js';
import {Request} from '../../domain/entities/request.entity.js';
import {RequestFilter} from '../../shared/types/filter.js';
import {ResponseStatus, ItemResponse, CreateResponse} from '../../domain/models/response.model.js';
import {IRequest, IRequestList} from '../../domain/models/request.model.js';
export default class RequestRepositoryImpl implements RequestRepository {
    private tableName: string;
    private pool;
    constructor() {
        this.tableName = 'Request';
        this.pool = PgPool;
    }
    async getById(userId: string, id: string): Promise<IRequest> {
        const {rows} = await this.pool.query('select * from get_request_by_id($1,$2)', [userId, id]);
        return rows[0];
    }

    async getAll(userId: string, filter: RequestFilter): Promise<IRequestList[]> {
        const {rows} = await this.pool.query('select * from get_all_requests($1,$2,$3,$4,$5,$6,$7,$8)', [
            filter.isAdmin,
            filter.pageNumber,
            filter.pageSize,
            userId,
            filter.status,
            filter.requestType,
            filter.startDate,
            filter.endDate,
        ]);

        return rows;
    }

    async create(model: Request): Promise<CreateResponse> {
        const {rows} = await this.pool.query(
            'select * from create_request($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)',
            [
                model.getId(),
                model.getUserId(),
                model.getRequestTypeId(),
                model.getRequestReasonId(),
                model.getPartialDayId(),
                model.getStatusId(),
                model.getSupervisor(),
                model.getApprover(),
                model.getInformTo(),
                model.getDetailReason(),
                model.getExpectedDate(),
                model.getStartDate(),
                model.getEndDate(),
                model.getCreatedBy(),
                model.getUpdatedBy(),
                model.getCreatedDate(),
                model.getUpdatedDate(),
            ],
        );
        console.log(rows);
        const data = rows[0];
        return {
            status: {
                code: data.statusCode,
                message: data.message,
            },
            data: {id: data.id},
        };
    }

    async update(model: Request): Promise<ResponseStatus> {
        const {rows} = await this.pool.query('select * from update_request($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [
            model.getId(),
            model.getUserId(),
            model.getRequestTypeId(),
            model.getRequestReasonId(),
            model.getPartialDayId(),
            model.getDetailReason(),
            model.getStartDate(),
            model.getEndDate(),
            model.getUpdatedBy(),
            model.getUpdatedDate(),
        ]);
        const data = rows[0];
        return {
            status: {
                code: data.statusCode,
                message: data.message,
            },
        };
    }
    async cancel(id: string, comment: string): Promise<ResponseStatus> {
        const {rows} = await this.pool.query('select * from cancel_request($1,$2)', [id, comment]);
        const data = rows[0];
        return {
            status: {
                code: data.statusCode,
                message: data.message,
            },
        };
    }

    async updateStatus(ids: string[], status: string, updatedBy: string, updatedDate: string): Promise<ResponseStatus> {
        const {rows} = await this.pool.query('select * from update_list_request_status($1,$2,$3,$4)', [
            ids,
            status,
            updatedBy,
            updatedDate,
        ]);
        const data = rows[0];
        return {
            status: {
                code: data.statusCode,
                message: data.message,
            },
        };
    }
}
