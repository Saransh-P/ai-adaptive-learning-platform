import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'adaptive_learning',
    password: 'saransh510',
    port: 5432,
});