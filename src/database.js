import {createPool} from "mysql2/promise"

const pool = createPool({
    host: 'localhost',
    port: '3306',
    user: 'lumiere',
    password: 'lumiere',
    database: 'lumiere'
});

export default pool;