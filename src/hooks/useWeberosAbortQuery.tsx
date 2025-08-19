import {EndpointKeys} from '@type/endpoint';
import {useWeberosQuery, WeberosQueryFetcherResponse} from './useWeberosQuery';
import {useEffect, useRef} from 'react';

type QueryType<D> = {dependencies: D};

type WeberosQueryFetcherResponseFn<P extends EndpointKeys, D> = (
  args: {
    signal: AbortSignal;
  } & QueryType<D>,
) => WeberosQueryFetcherResponse<P>;

export function useWeberosAbortQuery<P extends EndpointKeys, D>(
  params: Omit<Parameters<typeof useWeberosQuery<P>>[0], 'fetcher'> & {
    fetcher: WeberosQueryFetcherResponseFn<P, D>;
  } & QueryType<D>,
) {
  const abortController = useRef<AbortController>(null);
  const initialFetch = useRef(true);
  const {mutate, isLoading, ...props} = useWeberosQuery({
    ...params,
    fetcher: () => {
      abortController.current = new AbortController();
      if (initialFetch.current) {
        initialFetch.current = false;
        return undefined as never;
      }
      return params.fetcher({
        signal: abortController.current.signal,
        dependencies: params.dependencies,
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
  }, [params.dependencies]);

  return {
    ...props,
    mutate,
    isLoading,
  };
}
