import {SocketMessageSchema, SocketResponseSchema} from '@schemas/socket';

import {GetUserSchemaParams, UserSchema} from '@schemas/user';

/**
 * Mock API
 */
export const Endpoints = Object.freeze({
  GET: {
    [`/user/get` as const]: {
      in: GetUserSchemaParams,
      out: UserSchema,
    },
    [`/user/ping` as const]: {
      in: undefined,
      out: undefined,
    },
  } as const,
  POST: {
    [`/user/set` as const]: {
      in: UserSchema,
      out: UserSchema,
    },
  } as const,
  SOCKET: {
    ['/socket' as const]: {
      in: SocketMessageSchema,
      out: SocketResponseSchema,
    },
    ['/empty-socket' as const]: {
      in: undefined,
      out: undefined,
    },
  },
} as const);
