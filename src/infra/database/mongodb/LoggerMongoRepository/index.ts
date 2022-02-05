import { LoggerErrorRepository } from '../../../../data/protocols/LoggerErrorRepository';
import { MongoHelper } from '../helpers/MongoHelper';

export class LoggerMongoRepository implements LoggerErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection.insertOne({
      stack,
      date: new Date(),
    });
  }
}
