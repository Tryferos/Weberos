import mongoose from 'mongoose';
import {MongoClient} from 'mongodb';
import {ServerEnvironment} from '@constants/env-server';

const uri = ServerEnvironment.MONGODB_URI;
const dbName = ServerEnvironment.MONGODB_DB_NAME;

const newGlobal = global as typeof globalThis & {
  mongoose: Promise<mongoose.Mongoose>;
};

if (uri && !newGlobal.mongoose) {
  newGlobal.mongoose = mongoose.connect(uri, {dbName});
}

export const mongoClientPromise: Promise<MongoClient> =
  mongoose.connection.readyState === 1
    ? Promise.resolve(mongoose.connection.getClient())
    : mongoose.connect(uri, {dbName}).then(c => c.connection.getClient());

export default newGlobal.mongoose;
