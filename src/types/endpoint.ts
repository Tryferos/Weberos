import z from 'zod';

export type EndpointType<T = unknown> = {
  [key in 'GET' | 'POST']: {
    [key: string]: {
      url: string;
      schema: z.ZodSchema<T>;
    };
  };
};
