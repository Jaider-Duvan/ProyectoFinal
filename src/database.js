import {createPool} from "mysql2/promise"

const poll = createPool({
    host: 'localhost',
    port: '3306',
    user: 'lumiere',
    password: 'lumiere',
    database: 'lumiere'
});

export default poll;