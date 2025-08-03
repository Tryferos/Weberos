import {EnvSchema, EnvSchemaType} from '@schemas/env';
import {z} from 'zod';
export const Environment: EnvSchemaType = z.parse(
  EnvSchema,
  Object.freeze({
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
  }),
);
