// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import {MongoClient, MongoClientOptions, ServerApiVersion} from 'mongodb';

const uri = process.env.MONGODB_URI;

let client: MongoClient | undefined;
if (uri) {
  const options: MongoClientOptions = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  };

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
      _mongoClient?: MongoClient;
    };

    if (!globalWithMongo._mongoClient) {
      globalWithMongo._mongoClient = new MongoClient(uri, options);
    }
    client = globalWithMongo._mongoClient;
  } else {
    client = new MongoClient(uri, options);
  }
}
export default client;
