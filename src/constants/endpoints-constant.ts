import {
  SocketMessageSchema,
  SocketResponseSchema,
} from '@schemas/socket-schema';

import {GetUserSchemaParams, SetUserSchemaBody} from '@schemas/user-schema';

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
    ['/empty-socket' as const]: {
      in: undefined,
      out: undefined,
    },
  },
} as const);
