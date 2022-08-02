process.env['NODE_CONFIG_DIR'] = __dirname + '/src/configs';

import config from 'config';
import { dbConfig } from './src/interfaces/db.interface';

const db: dbConfig = config.get('dbConfig');
export = {
  client: 'pg',
  connection: 'postgres://okkptbwd:GcTS9vbcufBT0eOOFdD_6AgZYlXJTgVH@hattie.db.elephantsql.com/okkptbwd',
  searchPath: ['knex', 'public'],
  migrations: {
    directory: 'src/databases/migrations',
    tableName: 'migrations',
    // stub: 'src/databases/stubs',
  },
  seeds: {
    directory: 'src/databases/seeds',
    // stub: 'src/databases/stubs',
  },
};
