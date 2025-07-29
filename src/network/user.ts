import {Endpoints} from '@constants/endpoints';
import Network from './index';
import {GetUserSchemaType, SetUserSchemaType} from '@schemas/user';

const getUser = async ({id}: GetUserSchemaType) => {
  const response = await Network.get({
    path: '/user/get',
    params: {id},
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
};
