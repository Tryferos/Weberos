'use client';
import {Endpoints} from '@constants/endpoints';
import {Environment} from '@constants/env';
import {useRef} from 'react';
import useSWRSubscription from 'swr/subscription';
import {z} from 'zod';

type SocketEndpoint = keyof typeof Endpoints.SOCKET;
type ResponseType<S extends SocketEndpoint> = z.infer<
  NonNullable<(typeof Endpoints.SOCKET)[S]['out']>
>;
type ErrorResponse = {error: string};
type SendMessageType<S extends SocketEndpoint> =
  (typeof Endpoints.SOCKET)[S]['in'] extends undefined
    ? () => ErrorResponse | undefined
    : (
        args: z.infer<(typeof Endpoints.SOCKET)[S]['in']>,
      ) => ErrorResponse | undefined;

type Props<S extends SocketEndpoint> = {
  key: S;
  validateSchemaResponse?: boolean;
  validateSchemaMessage?: boolean;
};

/**
 *
 * This Hook can be reused in any component to connect to a WebSocket.
 * As long as the url-key is the same, the same socket will be reused, a single connection will persist.
 */
export const useWeberosSocket = <S extends SocketEndpoint>({
  key,
  validateSchemaResponse = false,
  validateSchemaMessage = true,
}: Props<S>) => {
  const socketRef = useRef<WebSocket>(null);
  const validateSchemaResponseRef = useRef(validateSchemaResponse);
  const validateSchemaMessageRef = useRef(validateSchemaMessage);
  const {data, error} = useSWRSubscription<ResponseType<S>, string, string>(
    key,
    (_key, {next}) => {
      validateSchemaResponseRef.current = validateSchemaResponse;
      validateSchemaMessageRef.current = validateSchemaMessage;
      socketRef.current = new WebSocket(`${Environment.SOCKET_URL}${_key}`);
      socketRef.current.addEventListener('message', event => {
        const json = event.data;
        let parsedJson: ResponseType<S> | undefined = undefined;
        try {
          parsedJson = JSON.parse(json);
          if (validateSchemaResponseRef.current) {
            //* Zod Schema Validation
            const schema = Endpoints.SOCKET[key].out as unknown as
              | z.ZodSchema<typeof parsedJson>
              | undefined;
            parsedJson = schema?.parse(parsedJson) ?? parsedJson;
          }
          next(null, parsedJson);
        } catch (err) {
          if (err instanceof z.ZodError) {
            next(err.issues?.[0].message ?? 'Zod Schema Validation failed.');
          } else {
            const error = err as Error;
            next(error.message);
          }
        }
      });
      socketRef.current.addEventListener('error', () =>
        next('WebSocket error'),
      );
      return () => socketRef.current?.close();
    },
  );
  const sendMessage: SendMessageType<S> = (props => {
    try {
      if (socketRef.current) {
        let parsedProps = props;
        if (validateSchemaMessageRef.current) {
          const schema = Endpoints.SOCKET[key].in as unknown as
            | z.ZodSchema<typeof props>
            | undefined;
          parsedProps = schema?.parse(props) ?? props;
        }
        socketRef.current.send(JSON.stringify(parsedProps));
        return;
      } else {
        return {message: 'Socket is not connected.'};
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        return {
          error: err.issues?.[0].message ?? 'Zod Schema Validation failed.',
        } as ErrorResponse;
      }
      return {error: (err as Error).message} as ErrorResponse;
    }
  }) as SendMessageType<S>;
  return {data, error, sendMessage};
};
