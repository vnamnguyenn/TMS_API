import {PartialDayRepository} from '../../domain/repositories/partialDay.repository.js';
import {PgPool} from '../database/DBConnection/PgConnection.js';
import {PartialDay} from '../../domain/entities/partialDay.entity.js';
import {PaginationFilter} from '../../shared/types/filter.js';
import {ResponseStatus, ItemResponse, CreateResponse} from '../../domain/models/response.model.js';
import {IPartialDay, IPartialDayList} from '../../domain/models/partialDay.model.js';
export default class PartialDayRepositoryImpl implements PartialDayRepository {
    private tableName: string;
    private pool;
    constructor() {
        this.tableName = 'PartialDay';
                  this.pool = PgPool;
    }
    async getById(id: number): Promise<ItemResponse<IPartialDay>> {
        const {rows} = await this.pool.query('select * from get_partial_day_by_id($1)', [id]);
        return {
            data: rows[0],
        };
    }

    async getAll(filter: PaginationFilter): Promise<IPartialDayList[]> {
        const {rows} = await this.pool.query('select * from get_all_partial_days($1, $2,$3,$4,$5)', [
            filter.search,
            filter.sortExpression,
            filter.sortDirection,
            filter.pageSize,
            filter.pageNumber,
        ]);
        return rows;
    }

    async create(model: PartialDay): Promise<CreateResponse> {
        const {rows} = await this.pool.query('select * from create_partial_day($1,$2,$3,$4,$5,$6)', [
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

    async update(model: PartialDay): Promise<ResponseStatus> {
        const {rows} = await this.pool.query('select * from update_partial_day($1,$2,$3,$4)', [
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

    async delete(id: number): Promise<ResponseStatus> {
        const {rows} = await this.pool.query('select * from delete_row_by_integer($1,$2)', [this.tableName, id]);
        return {
            status: {
                code: rows[0].statusCode,
                message: rows[0].message,
            },
        };
    }
}
