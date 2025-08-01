import Network from './index';
import {GetUserSchemaType, SetUserSchemaType} from '@schemas/user-schema';

const getUser = async ({id}: GetUserSchemaType): Promise<SetUserSchemaType> => {
  const response = await Network.get({
    path: '/user/get',
    params: {id},
  });
  return response;
};
const pingUser = async () => {
  const response = await Network.get({
    path: '/user/ping',
  });
  return response;
};

const setUser = async ({
  id,
  name,
  email,
  password,
  imageUrl,
}: SetUserSchemaType) => {
  const response = await Network.post({
    path: '/user/set',
    body: {id, name, email, password, imageUrl},
  });
  return response;
};

export const UserNetwork = {
  getUser,
  pingUser,
  setUser,
};
