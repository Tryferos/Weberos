import {z} from 'zod';

const SocketMessageSchema = z.object({
  message: z.string(),
});

const SocketResponseSchema = z.object({
  message: z.string(),
});

export type SocketMessageSchemaType = z.infer<typeof SocketMessageSchema>;
export type SocketResponseSchemaType = z.infer<typeof SocketResponseSchema>;

export {SocketMessageSchema, SocketResponseSchema};
