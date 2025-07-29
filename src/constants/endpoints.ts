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
    GetUser: {
      url: `${GEMS.User}/get`,
      schema: GetUserSchemaParams,
    },
  } as const,
  POST: {
    SetUser: {
      url: `${GEMS.User}/set`,
      schema: SetUserSchemaBody,
    },
  } as const,
} as const);
