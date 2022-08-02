import { Model, ModelObject } from 'objection';
import { Hostname } from '@interfaces/hostname.interface';
import moment from 'moment';

export class Hostnames extends Model implements Hostname {
  id!: number;
  host!: string;
  owner!: number;

  $beforeInsert() {
    this.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  $beforeUpdate() {
    this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  static tableName = 'hostnames'; // database table name
  static idColumn = 'id'; // id column name
}

export type HostnamesShape = ModelObject<Hostnames>;
