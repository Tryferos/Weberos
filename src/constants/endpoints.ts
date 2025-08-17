import {MockSchema} from '@schemas/mock';
import {SocketMessageSchema, SocketResponseSchema} from '@schemas/socket';

import {UserSchema} from '@schemas/user';

/**
 * Mock API
 */
export const Endpoints = Object.freeze({
  GET: {
    [`/protected/user` as const]: {
      in: undefined,
      out: UserSchema,
    },
    ['/mock' as const]: {
      in: undefined,
      out: MockSchema,
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
