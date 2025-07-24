import pg from 'pg';

const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    port: '5432',
    password: '1234',
    database: 'bbddunesr'
});

export default pool;