import {Environment} from './env';

export const API_URL = Environment.API_URL;


/**
 * Mock API
 */
const GEMS = {
  User: '/user',
} as const;

const GET = {
  GetJob: `${GEMS.User}/get`,
} as const;

const POST = {
  Image: `${GEMS.User}/set`,
} as const;

export const Endpoints = Object.freeze({
  GET: GET,
  POST: POST,
});
