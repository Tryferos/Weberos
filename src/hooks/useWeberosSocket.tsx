'use client';
import {Endpoints} from '@constants/endpoints-constant';
import {Environment} from '@constants/env-constant';
import {useRef} from 'react';
import useSWRSubscription from 'swr/subscription';
import {z} from 'zod';

type SocketEndpoint = keyof typeof Endpoints.SOCKET;
type ResponseType<S extends SocketEndpoint> = z.infer<
  (typeof Endpoints.SOCKET)[S]['out']
>;
type MessageType<S extends SocketEndpoint> = z.infer<
  (typeof Endpoints.SOCKET)[S]['in']
>;

type Props<S extends SocketEndpoint> = {
  key: S;
};

/**
 *
 * This Hook can be reused in any component to connect to a WebSocket.
 * As long as the url-key is the same, the same socket will be reused, a single connection will persist.
 */
export const useWeberosSocket = <S extends SocketEndpoint>({key}: Props<S>) => {
  const socketRef = useRef<WebSocket>(null);
  const {data, error} = useSWRSubscription<
    ResponseType<S>,
    string,
    SocketEndpoint
  >(key, (_key, {next}) => {
    socketRef.current = new WebSocket(`${Environment.SOCKET_URL}${key}`);
    socketRef.current.addEventListener('message', event => {
      const json = event.data;
      let parsedJson: ResponseType<S> | undefined = undefined;
      try {
        parsedJson = JSON.parse(json);
        next(null, parsedJson);
      } catch (err) {
        const error = err as Error;
        next(error.message);
      }
    });
    socketRef.current.addEventListener('error', () => next('WebSocket error'));
    return () => socketRef.current?.close();
  });
  const sendMessage = (message: MessageType<S>): boolean => {
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify(message));
      return true;
    }
    return false;
  };
  return {data, error, sendMessage};
};
