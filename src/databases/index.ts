import config from 'config';
import Knex from 'knex';
import { dbConfig } from '@interfaces/db.interface';

const db: dbConfig = config.get('dbConfig');
const dbConnection = {
  client: 'mysql',
  connection: {
    charset: 'utf8',
    timezone: 'UTC',
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    port: db.port,
  },
  pool: {
    min: 1,
    max: 2,
    idleTimeoutMillis: 30000,
    createTimeoutMillis: 3000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    //propagateCreateError: false,
  },
};

export default Knex(dbConnection);
