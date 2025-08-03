import Network from './index';
import {GetUserSchemaType, UserSchemaType} from '@schemas/user';

const getUser = async ({id}: GetUserSchemaType): Promise<UserSchemaType> => {
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
}: UserSchemaType) => {
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
