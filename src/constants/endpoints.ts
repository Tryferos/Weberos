import {Environment} from './env';

import {GetUserSchemaParams, SetUserSchemaBody} from '@schemas/user';
export const API_URL = Environment.API_URL;

/**
 * Mock API
 */
const GEMS = {
  User: '/user',
} as const;

export const Endpoints = Object.freeze({
  GET: {
    [`${GEMS.User}/get` as const]: GetUserSchemaParams,
    [`${GEMS.User}/ping` as const]: undefined,
  } as const,
  POST: {
    [`${GEMS.User}/set` as const]: SetUserSchemaBody,
  } as const,
} as const);
