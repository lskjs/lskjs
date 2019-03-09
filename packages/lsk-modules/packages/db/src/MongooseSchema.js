import {Schema} from 'mongoose';
import BaseSchema from './BaseSchema';

export default class UniversalSchema extends BaseSchema {
  static Schema = Schema;
}

