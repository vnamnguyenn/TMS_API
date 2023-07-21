import {UserRepository} from '../../domain/repositories/user.repository.js';
import {PgPool} from '../database/DBConnection/PgConnection.js';
import {PaginationFilter} from '../../shared/types/filter.js';
import {CreateResponse, ItemResponse} from '../../domain/models/response.model.js';
import {IUser, IUserList} from '../../domain/models/user.model.js';
import {User} from '../../domain/entities/user.entity.js';
import {UUID} from '../../shared/enums/uuid.enum.js';

export default class UserRepositoryImpl implements UserRepository {
    private pool;

    constructor() {
        this.pool = PgPool;
    }

    async create(model: User): Promise<CreateResponse> {
        const date = new Date();
        const userCode = String(date.getUTCDate()).padStart(2, '0') + '' + String(date.getUTCMonth() + 1).padStart(2, '0') + '' + date.getUTCFullYear() + '' + String(date.getUTCHours()).padStart(2, '0') + '' + String(date.getUTCMinutes()).padStart(2, '0') + '' + String(date.getUTCSeconds()).padStart(2, '0');
        const {rows} = await this.pool.query(`INSERT INTO "User"(id, "departmentId", "specificationId", "userCode", email,"userName",name, "createdBy",
                                                    "updatedBy", "createdDate", "updatedDate",picture)
                                                    values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id`, [
            model.getId(),
            UUID.Empty,
            UUID.Empty,
            userCode,
            model.getEmail(),
            model.getEmail().split('@')[0],
            model.getName(),
            model.getCreatedBy(),
            model.getUpdatedBy(),
            model.getCreatedDate(),
            model.getUpdatedDate(),
            model.getPicture(),
        ]);
        const data = rows[0];
        return {
            status: {
                code: 201,
                message: 'user created successfully',
            },
            data: {id: data.id},
        };

    }

    async getById(id: string): Promise<ItemResponse<IUser>> {
        const {rows} = await this.pool.query('select * from get_user_by_id($1)', [id]);
        return {
            data: rows[0],
        };
    }

    async getEmailByUserId(id: string): Promise<ItemResponse<IUser>> {
        const {rows} = await this.pool.query('select * from get_email_by_user_id($1)', [id]);
        return {
            data: rows[0],
        };
    }

    async getAll(filter: PaginationFilter): Promise<IUserList[]> {
        const {rows} = await this.pool.query('select * from get_all_user($1, $2,$3,$4,$5)', [
            filter.search,
            filter.sortExpression,
            filter.sortDirection,
            filter.pageSize,
            filter.pageNumber,
        ]);
        console.log();
        return rows;
    }
}
