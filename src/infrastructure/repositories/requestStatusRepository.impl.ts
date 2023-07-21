import {RequestStatusRepository} from '../../domain/repositories/requestStatus.repository.js';
import {PgPool} from '../database/DBConnection/PgConnection.js';
import {Status} from '../../domain/entities/status.entity.js';
import {PaginationFilter} from '../../shared/types/filter.js';
import {ResponseStatus, ItemResponse, CreateResponse} from '../../domain/models/response.model.js';
import {IRequestStatus, IRequestStatusList} from '../../domain/models/requestStatus.model.js';

export default class RequestStatusRepositoryImpl implements RequestStatusRepository {
    private tableName: string;
    private pool;

    constructor() {
        this.tableName = 'Status';
        this.pool = PgPool;
    }

    async getById(id: string): Promise<ItemResponse<IRequestStatus>> {
        const {rows} = await this.pool.query('select * from get_status_by_id($1)', [id]);
        return {
            data: rows[0],
        };
    }

    async getAll(filter: PaginationFilter): Promise<IRequestStatusList[]> {
        const {rows} = await this.pool.query('select * from get_all_status($1,$2,$3,$4,$5)', [
            filter.search,
            filter.sortExpression,
            filter.sortDirection,
            filter.pageSize,
            filter.pageNumber,
        ]);
        return rows;
    }

    async create(model: Status): Promise<CreateResponse> {
        console.log(model);
        const {rows} = await this.pool.query('select * from create_status($1,$2,$3,$4,$5,$6)', [
            model.getId(),
            model.getName(),
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

    async update(model: Status): Promise<ResponseStatus> {
        const {rows} = await this.pool.query('select * from update_status($1,$2,$3,$4)', [
            model.getId(),
            model.getName(),
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
