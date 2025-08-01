import {Endpoints} from '@constants/endpoints-constant';
import z from 'zod';
import {Success} from './global';

export type EndpointType<T = unknown> = {
  [key in 'GET' | 'POST']: {
    [key: string]: {
      in: z.ZodSchema<T>;
      out: z.ZodSchema<T>;
    };
  };
};

export type EndpointKeys =
  | keyof typeof Endpoints.GET
  | keyof typeof Endpoints.POST;
