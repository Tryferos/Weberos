import {z} from 'zod';

const MockSchema = z.array(
  z.object({
    id: z.number().nullish(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.email(),
    gender: z.string().min(1),
    ip_address: z.string().min(1),
  }),
);

export type MockSchemaType = z.infer<typeof MockSchema>;

export {MockSchema};
