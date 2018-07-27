import config from '../config';

export const USER_API = {
  LOGIN: [config.API_ENDPOINT, 'users', 'login'].join('/'),
  GET_MY_PROFILE: (userId) => [config.API_ENDPOINT, 'users', userId].join('/')
};
