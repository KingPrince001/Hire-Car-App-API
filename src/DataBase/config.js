import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();

const { PORT, SQL_SERVER, SQL_PORT, SQL_USER, SQL_PD, SQL_DB} = process.env;



assert(PORT, 'Port is required');


const config = {
    port: PORT,
    sql: {
        server: SQL_SERVER,
        database: SQL_DB,
        user: SQL_USER,
        password: SQL_PD,
        options: {
            encrypt: true,
            trustServerCertificate: false
        }
    }
};




export default config;