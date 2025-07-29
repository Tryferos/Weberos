import {API_URL, Endpoints} from '@constants/endpoints';
import {Success, Error, Params} from '@type/global';

type GET_API_PATHS = (typeof Endpoints.GET)[keyof typeof Endpoints.GET];
type POST_API_PATHS = (typeof Endpoints.POST)[keyof typeof Endpoints.POST];

type ParamsProp = Params;

type GetProps<K extends KeyType = ParamsProp> = {
  path: GET_API_PATHS;
  params?: K;
};

type PostProps<K extends KeyType = ParamsProp> = {
  path: POST_API_PATHS;
  body?: BodyType | FormData | null;
} & Omit<GetProps<K>, 'path'>;

type PostFormProps<K extends KeyType = ParamsProp> = {
  path: POST_API_PATHS;
  body?: FormData | null;
} & Omit<GetProps<K>, 'path'>;

type BodyType = Record<string, unknown>;
type KeyType = {[key: string]: string | number | boolean | null | undefined};

const get = async <T = Success, K extends KeyType = ParamsProp>({
  path,
  params,
}: GetProps<K>): Promise<T | Error> => {
  try {
    const url = createUrl(path, params);
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
    console.log('catch');
    const error = _error as Error;
    const err: Error = {
      message: error?.message ?? error?.toString(),
      code: error?.code ?? 500,
    };
    return err;
  }
};

const post = async <T = Success, K extends KeyType = ParamsProp>({
  body,
  path,
  params,
}: PostProps<K>): Promise<T | Error> => {
  try {
    const url = createUrl(path, params);
    const response = await fetch(url, {
      method: 'POST',
      headers: await getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
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
    const error = _error as Error;
    const err: Error = {
      message: error?.message ?? error?.toString(),
      code: error?.code ?? 500,
    };
    return err;
  }
};

const postFormData = async <T = Success, K extends KeyType = ParamsProp>({
  body,
  path,
  params,
}: PostFormProps<K>): Promise<T | Error> => {
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
