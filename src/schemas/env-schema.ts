import {z} from 'zod';

const EnvSchema = z.object({
  API_URL: z.url(),
});

export type EnvSchemaType = z.infer<typeof EnvSchema>;
export {EnvSchema};
