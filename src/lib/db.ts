import mongoose from 'mongoose';
import {MongoClient} from 'mongodb';

const uri = process.env.MONGODB_URI;

const newGlobal = global as typeof globalThis & {
  mongoose: Promise<mongoose.Mongoose>;
};

if (uri && !newGlobal.mongoose) {
  newGlobal.mongoose = mongoose.connect(uri);
}

export const mongoClientPromise: Promise<MongoClient> =
  mongoose.connection.readyState === 1
    ? Promise.resolve(mongoose.connection.getClient())
    : mongoose
        .connect(process.env.MONGODB_URI)
        .then(c => c.connection.getClient());

export default newGlobal.mongoose;
