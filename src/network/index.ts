import {API_URL, Endpoints} from '@constants/endpoints-constant';
import {EndpointType} from '@type/endpoint';
import {Success, Error, Params} from '@type/global';
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

type PostFormProps<P extends POST_API_PATHS> = PostProps<P> & {
  params?: ParamsProp;
};

type BodyType = Record<string, unknown>;
type KeyType = {[key: string]: string | number | boolean | null | undefined};

const _retrieveSchema = ({
  requestType,
  type,
}: {
  type: InputRequest | OutputRequest;
  requestType: keyof typeof Endpoints;
}): z.ZodSchema<ParamsProp | BodyType> | undefined => {
  const keys = Object.keys(Endpoints[requestType]);
  for (const key of keys) {
    const endpoint = Endpoints[requestType] as EndpointType<
      ParamsProp | BodyType
    >['GET'];
    if (endpoint) {
      return endpoint[key]?.[type];
    }
  }
};

const get = async <Path extends GET_API_PATHS>({
  path,
  params,
  validateInput,
  validateOutput,
}: GetProps<Path>): Promise<GetResponse<Path> | Error> => {
  try {
    let sendParams = params;
    if (validateInput) {
      const schema = _retrieveSchema({
        requestType: 'GET',
        type: 'in',
      }) as z.ZodSchema<typeof params>;
      sendParams = schema?.parse(params) ?? params;
    }
    const url = createUrl(path, sendParams as ParamsProp);
    const response = await fetch(url, {
      method: 'GET',
      headers: await getHeaders(),
    });
    if (response.status >= 200 && response.status < 300) {
      let output = handleResponse<GetResponse<Path> | Error>(response);
      if (validateOutput) {
        const schema = _retrieveSchema({
          requestType: 'GET',
          type: 'out',
        }) as z.ZodSchema<typeof output>;
        output = schema?.parse(output) ?? output;
      }
      return output;
    } else {
      return {
        message: response.statusText,
        code: response.status,
      } as Error;
    }
  } catch (_error) {
    if (_error instanceof z.ZodError) {
      return {
        message: _error.issues?.[0].message ?? 'Zod Schema Validation failed.',
        code: 400,
      };
    }
    const error = _error as Error;
    const err: Error = {
      message: error?.message ?? error?.toString(),
      code: error?.code ?? 500,
    };
    return err;
  }
};

const post = async <Path extends POST_API_PATHS>({
  body,
  path,
  params,
  validateInput,
  validateOutput,
}: PostProps<Path>): Promise<PostResponse<Path> | Error> => {
  try {
    let sendBody = body;
    if (validateInput) {
      const schema = _retrieveSchema({
        requestType: 'POST',
        type: 'in',
      }) as z.ZodSchema<typeof body>;
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
        const schema = _retrieveSchema({
          requestType: 'POST',
          type: 'out',
        }) as z.ZodSchema<typeof output>;
        output = schema?.parse(output) ?? output;
      }
      return output;
    } else {
      return {
        message: response.statusText,
        code: response.status,
      } as Error;
    }
  } catch (_error) {
    if (_error instanceof z.ZodError) {
      return {
        message: _error.issues?.[0].message ?? 'Zod Schema Validation failed.',
        code: 400,
      };
    }
    const error = _error as Error;
    const err: Error = {
      message: error?.message ?? error?.toString(),
      code: error?.code ?? 500,
    };
    return err;
  }
};

const handleResponse = <T>(response: Response): T | Error => {
  if (!response) {
    return {
      message: 'Something went wrong',
      code: 500,
    };
  } else {
    try {
      const data = response.json();
      return data as T | Error;
    } catch (err) {
      console.log(err);
      return {
        message: response.statusText,
        code: response.status,
      };
    }
  }
};

const isNotError = <T>(data: T | Error): data is T => {
  return (
    (data as Error)?.message === undefined &&
    (data as Error)?.code === undefined
  );
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
  isNotError,
};

export default Network;
