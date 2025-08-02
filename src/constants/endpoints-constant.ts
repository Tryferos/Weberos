import {
  SocketMessageSchema,
  SocketResponseSchema,
} from '@schemas/socket-schema';
import {Environment} from './env-constant';

import {GetUserSchemaParams, SetUserSchemaBody} from '@schemas/user-schema';
export const API_URL = Environment.API_URL;

/**
 * Mock API
 */
export const Endpoints = Object.freeze({
  GET: {
    [`/user/get` as const]: {
      in: GetUserSchemaParams,
      out: SetUserSchemaBody,
    },
    [`/user/ping` as const]: {
      in: undefined,
      out: undefined,
    },
  } as const,
  POST: {
    [`/user/set` as const]: {
      in: SetUserSchemaBody,
      out: SetUserSchemaBody,
    },
  } as const,
  SOCKET: {
    ['/socket' as const]: {
      in: SocketMessageSchema,
      out: SocketResponseSchema,
    },
  },
} as const);
