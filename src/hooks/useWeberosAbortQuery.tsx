import {EndpointKeys} from '@type/endpoint';
import {useWeberosQuery, WeberosQueryFetcherResponse} from './useWeberosQuery';
import {useEffect, useRef} from 'react';

type QueryType = {query: string};

type WeberosQueryFetcherResponseFn<P extends EndpointKeys> = (
  args: {
    signal: AbortSignal;
  } & QueryType,
) => WeberosQueryFetcherResponse<P>;

export function useWeberosAbortQuery<P extends EndpointKeys>(
  params: Omit<Parameters<typeof useWeberosQuery<P>>[0], 'fetcher'> & {
    fetcher: WeberosQueryFetcherResponseFn<P>;
  } & QueryType,
) {
  const abortController = useRef<AbortController>(null);
  const {mutate, isLoading, ...props} = useWeberosQuery({
    ...params,
    fetcher: () => {
      abortController.current = new AbortController();
      return params.fetcher({
        signal: abortController.current.signal,
        query: params.query,
      });
    },
  });
  useEffect(() => {
    if (abortController.current) {
      abortController.current.abort();
    }
    mutate();

    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [params.query]);

  return {
    ...props,
    mutate,
    isLoading,
  };
}
