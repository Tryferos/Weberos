import {API_URL, Endpoints} from '@constants/endpoints-constant';
import {EndpointType} from '@type/endpoint';
import {Success, Params} from '@type/global';
import z from 'zod';

type GET_API_PATHS = keyof typeof Endpoints.GET;
type POST_API_PATHS = keyof typeof Endpoints.POST;

type ParamsProp = Params;
type InputRequest = 'in';
type OutputRequest = 'out';
/**
 * Response
 */
type GetResponse<P extends GET_API_PATHS> =
  (typeof Endpoints.GET)[P][OutputRequest] extends undefined
    ? Success
    : z.infer<(typeof Endpoints.GET)[P][OutputRequest]>;

type PostResponse<P extends POST_API_PATHS> =
  (typeof Endpoints.POST)[P][OutputRequest] extends undefined
    ? Success
    : z.infer<(typeof Endpoints.POST)[P][OutputRequest]>;

/**
 * Props
 */
type CommonProps = {
  validateInput?: boolean;
  validateOutput?: boolean;
};

type GetProps<P extends GET_API_PATHS> = CommonProps & {
  path: P;
} & ((typeof Endpoints.GET)[P][InputRequest] extends undefined
    ? {params?: ParamsProp}
    : {
        params: z.infer<(typeof Endpoints.GET)[P][InputRequest]>;
      });

type PostProps<P extends POST_API_PATHS> = CommonProps & {
  path: P;
  params?: Params;
} & ((typeof Endpoints.POST)[P][InputRequest] extends undefined
    ? {body?: BodyType}
    : {body: z.infer<(typeof Endpoints.POST)[P][InputRequest]>});

type BodyType = Record<string, unknown>;
type KeyType = {[key: string]: string | number | boolean | null | undefined};

const get = async <Path extends GET_API_PATHS>({
  path,
  params,
  validateInput,
  validateOutput,
}: GetProps<Path>): Promise<GetResponse<Path>> => {
  try {
    let sendParams = params;
    if (validateInput) {
      const schema = Endpoints.GET[path].in;
      sendParams = schema?.parse(params) ?? params;
    }
    const url = createUrl(path, sendParams as ParamsProp);
    const response = await fetch(url, {
      method: 'GET',
      headers: await getHeaders(),
    });
    if (response.status >= 200 && response.status < 300) {
      let output = handleResponse<GetResponse<Path>>(response);
      if (validateOutput) {
        const schema = Endpoints.GET[path].out as unknown as z.ZodSchema<
          typeof output
        >;
        output = schema?.parse(output) ?? output;
      }
      return output;
    } else {
      throw new Error(response.statusText);
    }
  } catch (_error) {
    if (_error instanceof z.ZodError) {
      throw new Error(
        _error.issues?.[0].message ?? 'Zod Schema Validation failed.',
      );
    }
    const error = _error as Error;
    throw new Error(error?.message ?? error?.toString());
  }
};

const post = async <Path extends POST_API_PATHS>({
  body,
  path,
  params,
  validateInput,
  validateOutput,
}: PostProps<Path>): Promise<PostResponse<Path>> => {
  try {
    let sendBody = body;
    if (validateInput) {
      const schema = Endpoints.POST[path].in;
      sendBody = schema?.parse(body) ?? body;
    }
    const url = createUrl(path, params);
    const response = await fetch(url, {
      method: 'POST',
      headers: await getHeaders(),
      body: sendBody ? JSON.stringify(sendBody) : undefined,
    });
    if (response.status >= 200 && response.status < 300) {
      let output = handleResponse<PostResponse<Path>>(response);
      if (validateOutput) {
        const schema = Endpoints.POST[path].out as unknown as z.ZodSchema<
          typeof output
        >;
        output = schema?.parse(output) ?? output;
      }
      return output;
    } else {
      throw new Error(response.statusText);
    }
  } catch (_error) {
    if (_error instanceof z.ZodError) {
      throw new Error(
        _error.issues?.[0].message ?? 'Zod Schema Validation failed.',
      );
    }
    const error = _error as Error;
    throw new Error(error?.message ?? error?.toString());
  }
};

const handleResponse = <T>(response: Response): T => {
  if (!response) {
    throw new Error('Something went wrong');
  } else {
    try {
      const data = response.json();
      return data as T;
    } catch (err) {
      console.log(err);
      throw new Error(response.statusText);
    }
  }
};

const getHeaders = async () => {
  return {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${await useUserStore.getState().getUserToken()}`,
  };
};

function createUrl<K extends KeyType = KeyType>(
  path: GET_API_PATHS | POST_API_PATHS,
  params?: K,
): string {
  return `${API_URL}${path}${(() => {
    if (params != null && Object.keys(params).length > 0) {
      return `?${Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&')}`;
    } else {
      return '';
    }
  })()}`;
}

const Network = {
  get,
  post,
};

export default Network;
