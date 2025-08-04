import {z} from 'zod';

const ClientEnvSchema = z.object({
  API_URL: z.url({protocol: /^http[s]?/}),
  SOCKET_URL: z.url({protocol: /^ws[s]?/}),
});

const ServerEnvSchema = z.object({
  API_URL: z.url({protocol: /^http[s]?/}),
  SOCKET_URL: z.url({protocol: /^ws[s]?/}),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  MONGODB_URI: z.string(),
  MONGODB_DB_NAME: z.string(),
});

export type ClientEnvSchemaType = z.infer<typeof ClientEnvSchema>;
export type ServerEnvSchemaType = z.infer<typeof ServerEnvSchema>;

export {ClientEnvSchema, ServerEnvSchema};
