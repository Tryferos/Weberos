import {Endpoints} from '@constants/endpoints';
import Network from './index';

const getUser = async (query: any) => {
  const parsedQuery = Endpoints.GET.GetUser.schema.parse(query);
  const response = await Network.get({
    path: Endpoints.GET.GetUser.url,
  });
  return response;
};

export const UserNetwork = {
  getUser,
};
