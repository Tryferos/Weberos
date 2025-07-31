import z from 'zod';

export type EndpointType<T = unknown> = {
  [key in 'GET' | 'POST']: {
    [key: string]: {
      in: z.ZodSchema<T>;
      out: z.ZodSchema<T>;
    };
  };
};
