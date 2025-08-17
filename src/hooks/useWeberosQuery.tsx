import {Endpoints} from '@constants/endpoints';
import {EndpointKeys} from '@type/endpoint';
import {Success} from '@type/global';
import useSWR, {SWRConfiguration} from 'swr';
import {z} from 'zod';

export type WeberosQueryFetcherResponse<P extends EndpointKeys> = Promise<
  P extends keyof typeof Endpoints.GET
    ? (typeof Endpoints.GET)[P]['out'] extends undefined
      ? Success
      : z.infer<(typeof Endpoints.GET)[P]['out']>
    : P extends keyof typeof Endpoints.POST
    ? (typeof Endpoints.POST)[P]['out'] extends undefined
      ? Success
      : z.infer<(typeof Endpoints.POST)[P]['out']>
    : never
>;

export type WeberosQueryFetcherResponseFn<P extends EndpointKeys> =
  () => WeberosQueryFetcherResponse<P>;

export type WeberosQueryData<P extends EndpointKeys> = Awaited<
  ReturnType<WeberosQueryFetcherResponseFn<P>>
>;
export function useWeberosQuery<P extends EndpointKeys>({
  key,
  fetcher,
  ...rest
}: {
  key: P;
  fetcher: WeberosQueryFetcherResponseFn<P>;
} & Omit<SWRConfiguration<WeberosQueryData<P>>, 'data'>) {
  const props = useSWR<WeberosQueryData<P>>(key, fetcher, {
    ...rest,
  });
  return {
    ...props,
    data: props.data as NonNullable<WeberosQueryData<P>> | undefined,
  };
}
