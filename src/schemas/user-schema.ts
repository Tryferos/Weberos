import {z} from 'zod';

const GetUserSchemaParams = z.object({
  id: z.string().min(1),
});

const UserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(4),
  email: z.email(),
  password: z.string().min(4),
  imageUrl: z.url(),
});

export type GetUserSchemaType = z.infer<typeof GetUserSchemaParams>;
export type UserSchemaType = z.infer<typeof UserSchema>;

export {GetUserSchemaParams, UserSchema};
