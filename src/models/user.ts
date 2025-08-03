import mongoose, {InferSchemaType, Model, Schema} from 'mongoose';
import {User} from 'next-auth';

const mongooseUserSchema = new Schema<User>({
  email: {type: String, required: true, unique: true},
  image: {type: String, required: true, unique: true},
  name: {type: String, required: true},
});

export type UserDoc = InferSchemaType<typeof mongooseUserSchema>;

export const UserModel: Model<UserDoc> =
  (mongoose.models.User as Model<UserDoc>) ||
  mongoose.model<UserDoc>('User', mongooseUserSchema);
