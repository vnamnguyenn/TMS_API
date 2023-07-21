import {RequestReasonRepository} from '../../domain/repositories/requestReason.repository.js';
import {PgPool} from '../database/DBConnection/PgConnection.js';
import {RequestReason} from '../../domain/entities/requestReason.entity.js';
import {PaginationFilter} from '../../shared/types/filter.js';
import {ResponseStatus, ItemResponse, CreateResponse} from '../../domain/models/response.model.js';
import {IRequestReason, IRequestReasonList} from '../../domain/models/requestReason.model.js';

export default class RequestReasonRepositoryImpl implements RequestReasonRepository {
    private tableName: string;
    private pool;
    constructor() {
        this.tableName = 'RequestReason';
        this.pool = PgPool;
    }

    async getById(id: string): Promise<ItemResponse<IRequestReason>> {
        const {rows} = await this.pool.query('select * from get_request_reason_by_id($1)', [id]);
        return {
            data: rows[0],
        };
    }

    async getAll(filter: PaginationFilter): Promise<IRequestReasonList[]> {
        const {rows} = await this.pool.query('select * from get_all_request_reason($1, $2,$3,$4,$5)', [
            filter.search,
            filter.sortExpression,
            filter.sortDirection,
            filter.pageSize,
            filter.pageNumber,
        ]);
        return rows;
    }

    async create(model: RequestReason): Promise<CreateResponse> {
        const {rows} = await this.pool.query('select * from create_request_reason($1,$2,$3,$4,$5,$6,$7)', [
            model.getId(),
            model.getName(),
            model.getRequestTypeId(),
            model.getCreatedBy(),
            model.getUpdatedBy(),
            model.getCreatedDate(),
            model.getUpdatedDate(),
        ]);
        const data = rows[0];
        return {
            status: {
                code: data.statusCode,
                message: data.message,
            },
            data: {id: data.id},
        };
    }

    async update(model: RequestReason): Promise<ResponseStatus> {
        const {rows} = await this.pool.query('select * from update_request_reason($1,$2,$3,$4,$5)', [
            model.getId(),
            model.getName(),
            model.getRequestTypeId(),
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

    async delete(id: string): Promise<ResponseStatus> {
        const {rows} = await this.pool.query('select * from delete_row_by_uuid($1,$2)', [this.tableName, id]);
        return {
            status: {
                code: rows[0].statusCode,
                message: rows[0].message,
            },
        };
    }
}
