import {Endpoints} from '@constants/endpoints-constant';
import {EndpointKeys} from '@type/endpoint';
import {Success} from '@type/global';
import useSWR, {SWRConfiguration} from 'swr';
import {z} from 'zod';

type NetworkResponseType<P extends EndpointKeys> = () => Promise<
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
type DataType<P extends EndpointKeys> = Awaited<
  ReturnType<NetworkResponseType<P>>
>;
export function useWeberosQuery<P extends EndpointKeys>({
  key,
  fetcher,
  ...rest
}: {
  key: P;
  fetcher: NetworkResponseType<P>;
} & SWRConfiguration<DataType<P>>) {
  return useSWR<DataType<P>>(key, fetcher, {
    ...rest,
  });
}
