import {ClientEnvSchema, ClientEnvSchemaType} from '@schemas/env';
import {z} from 'zod';

export const ClientEnvironment: ClientEnvSchemaType = z.parse(
  ClientEnvSchema,
  Object.freeze({
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
  }),
);
