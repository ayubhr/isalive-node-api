import { Model, ModelObject } from 'objection';
import { User } from '@interfaces/users.interface';
import moment from 'moment';

export class Users extends Model implements User {
  id!: number;
  username!: string;
  password!: string;

  $beforeInsert() {
    this.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  $beforeUpdate() {
    this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  static tableName = 'users'; // database table name
  static idColumn = 'id'; // id column name
}

export type UsersShape = ModelObject<Users>;
