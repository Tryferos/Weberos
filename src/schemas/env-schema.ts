import {z} from 'zod';

const EnvSchema = z.object({
  API_URL: z.url({protocol: /^http[s]?/}),
  SOCKET_URL: z.url({protocol: /^ws[s]?/}),
});

export type EnvSchemaType = z.infer<typeof EnvSchema>;
export {EnvSchema};
