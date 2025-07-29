import {API_URL, Endpoints} from '@constants/endpoints';
import {EndpointType} from '@type/endpoint';
import {Success, Error, Params} from '@type/global';
import z from 'zod';

type GET_API_PATHS = (typeof Endpoints.GET)[keyof typeof Endpoints.GET]['url'];
type POST_API_PATHS =
  (typeof Endpoints.POST)[keyof typeof Endpoints.POST]['url'];

type ParamsProp = Params;

type GetProps = {
  path: GET_API_PATHS;
  params?: z.infer<
    (typeof Endpoints.GET)[keyof typeof Endpoints.GET]['schema']
  >;
};

type PostProps = {
  path: POST_API_PATHS;
  body?: z.infer<
    (typeof Endpoints.POST)[keyof typeof Endpoints.POST]['schema']
  >;
} & Omit<GetProps, 'path'>;

type PostFormProps = {
  path: POST_API_PATHS;
  body?: FormData | null;
} & Omit<GetProps, 'path'>;

type BodyType = Record<string, unknown>;
type KeyType = {[key: string]: string | number | boolean | null | undefined};

const _retrieveSchema = (
  path: GET_API_PATHS | POST_API_PATHS,
  requestType: keyof typeof Endpoints,
): z.ZodSchema<ParamsProp | BodyType> | undefined => {
  const keys = Object.keys(Endpoints[requestType]);
  for (const key of keys) {
    const endpoint = Endpoints[requestType] as EndpointType<
      ParamsProp | BodyType
    >[typeof requestType];
    if (endpoint?.[key]?.url === path) {
      return endpoint[key].schema;
    }
  }
};

const get = async <T = Success>({
  path,
  params,
}: GetProps): Promise<T | Error> => {
  try {
    const schema = _retrieveSchema(path, 'GET') as z.ZodSchema<typeof params>;
    const parsedParams = schema?.parse(params) ?? params;
    const url = createUrl(path, parsedParams);
    const response = await fetch(url, {
      method: 'GET',
      headers: await getHeaders(),
    });
    if (response.status >= 200 && response.status < 300) {
      return handleResponse<T>(response);
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

const post = async <T = Success>({
  body,
  path,
  params,
}: PostProps): Promise<T | Error> => {
  try {
    const schema = _retrieveSchema(path, 'POST') as z.ZodSchema<typeof body>;
    const parsedBody = schema?.parse(body) ?? body;
    const url = createUrl(path, params);
    const response = await fetch(url, {
      method: 'POST',
      headers: await getHeaders(),
      body: parsedBody ? JSON.stringify(parsedBody) : undefined,
    });
    if (response.status >= 200 && response.status < 300) {
      return handleResponse<T>(response);
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

const postFormData = async <T = Success>({
  body,
  path,
  params,
}: PostFormProps): Promise<T | Error> => {
  try {
    const url = createUrl(path, params);
    const response = await fetch(url, {
      method: 'POST',
      //* Do not include Content-Type: multipart/form-data, because the browser handles it automatically and will not send the boundary
      headers: {
        // Authorization: (await getHeaders()).Authorization,
      },
      body: body ?? undefined,
    });
    if (response.status >= 200 && response.status < 300) {
      return handleResponse<T>(response);
    } else {
      return {
        message: (await response.text()) || response.statusText,
        code: response.status,
      };
    }
  } catch (_error) {
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
    if (params) {
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
  postFormData,
  isNotError,
};

export default Network;
