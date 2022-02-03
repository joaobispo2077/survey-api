import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url);
  },

  async disconnect(): Promise<void> {
    await (this.client as MongoClient).close();
    this.client = null;
  },

  getCollection(name: string): Collection {
    return (this.client as MongoClient).db().collection(name);
  },
};
