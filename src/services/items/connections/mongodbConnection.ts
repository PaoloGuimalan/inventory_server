import mongoose from 'mongoose';
import MongoDBConnection from './mongodb';

export const connectMongo = async () => {
  return mongoose.connect(MongoDBConnection.url);
};
