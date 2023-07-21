import {RequestTypeRepository} from '../../domain/repositories/requestType.repository.js';
import {PgPool} from '../database/DBConnection/PgConnection.js';
import {RequestType} from '../../domain/entities/requestType.entity.js';
import {PaginationFilter} from '../../shared/types/filter.js';
import {ResponseStatus, ItemResponse, CreateResponse} from '../../domain/models/response.model.js';
import {IRequestType, IRequestTypeList} from '../../domain/models/requestType.model.js';
import {IRequestReason} from '../../domain/models/requestReason.model.js';
export default class RequestTypeRepositoryImpl implements RequestTypeRepository {
    private tableName: string;
    private pool;
    constructor() {
        this.tableName = 'RequestType';
        this.pool = PgPool;
    }
    async getById(id: string): Promise<ItemResponse<IRequestType>> {
        const {rows} = await this.pool.query('select * from get_request_type_by_id($1)', [id]);
        return {
            data: rows[0],
        };
    }
    async getRequestReason(id: string): Promise<IRequestReason[]> {
        const {rows} = await this.pool.query(
            'SELECT rqr.id, rqr.name FROM "RequestReason" AS rqr INNER JOIN "RequestType" AS rqt ON rqr."requestTypeId" = rqt.id WHERE rqt.id = $1 ORDER BY rqr.name ASC',
            [id],
        );
        return rows;
    }

    async getAll(filter: PaginationFilter): Promise<IRequestTypeList[]> {
        const {rows} = await this.pool.query('select * from get_all_request_type($1, $2,$3,$4,$5,$6)', [
            filter.search,
            filter.sortExpression,
            filter.sortDirection,
            filter.pageSize,
            filter.pageNumber,
            filter.isActive
        ]);
        return rows;
    }

    async create(model: RequestType): Promise<CreateResponse> {
        const {rows} = await this.pool.query('select * from create_request_type($1,$2,$3,$4,$5,$6,$7)', [
            model.getId(),
            model.getName(),
            model.getDescription(),
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

    async update(model: RequestType): Promise<ResponseStatus> {
        const {rows} = await this.pool.query('select * from update_request_type($1,$2,$3,$4,$5)', [
            model.getId(),
            model.getName(),
            model.getDescription(),
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
