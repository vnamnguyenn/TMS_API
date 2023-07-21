import pg from 'pg';
const {Pool, Client} = pg;

const PgPool = new Pool({
    host: process.env.DB_HOST || "103.162.20.101",
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PWD || "123456ab",
    database: process.env.DB_NAME || "tms",
    port: 5432,
    max: 1000,
    idleTimeoutMillis: 600000,
    connectionTimeoutMillis: 2000,
    ssl:false
});

const PgClient = new Client({
    host: process.env.DB_HOST || '192.168.168.160',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PWD || 'Zeronine@123',
    database: process.env.DB_NAME || 'tms',
    port: 5432,
});

export {PgPool, PgClient};