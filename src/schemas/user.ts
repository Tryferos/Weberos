import {z} from 'zod';

const GetUserSchemaParams = z.object({
  id: z.string().min(1),
});

const SetUserSchemaBody = z.object({
  id: z.string().min(1),
  name: z.string().min(4),
  email: z.email(),
  password: z.string().min(4),
  imageUrl: z.url(),
});

export type GetUserSchemaType = z.infer<typeof GetUserSchemaParams>;
export type SetUserSchemaType = z.infer<typeof SetUserSchemaBody>;

export {GetUserSchemaParams, SetUserSchemaBody};
