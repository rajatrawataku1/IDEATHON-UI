import config from '../config';

export const USER_API = {
  LOGIN: [config.API_ENDPOINT, 'check'].join('/'),
  GET_ALL_PRODUCTS: [config.API_ENDPOINT, 'searchProduct'].join('/'),
  GET_MY_PROFILE: (userId) => [config.API_ENDPOINT, 'users', userId].join('/')
};
