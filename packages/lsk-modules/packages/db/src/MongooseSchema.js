import { Schema } from 'mongoose';
import BaseSchema from './BaseSchema';

export default class MongooseSchema extends BaseSchema {
  static Schema = Schema;
}
