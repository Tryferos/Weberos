import {Environment} from './env-constant';

import {GetUserSchemaParams, SetUserSchemaBody} from '@schemas/user-schema';
export const API_URL = Environment.API_URL;

/**
 * Mock API
 */
const GEMS = {
  User: '/user',
} as const;

export const Endpoints = Object.freeze({
  GET: {
    [`${GEMS.User}/get` as const]: {
      in: GetUserSchemaParams,
      out: SetUserSchemaBody,
    },
    [`${GEMS.User}/ping` as const]: {
      in: undefined,
      out: undefined,
    },
  } as const,
  POST: {
    [`${GEMS.User}/set` as const]: {
      in: SetUserSchemaBody,
      out: SetUserSchemaBody,
    },
  } as const,
} as const);
