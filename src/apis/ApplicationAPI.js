import config from '../config';

export const APPLICATION_API = {
  CREATE : [config.API_ENDPOINT, 'branches'].join('/'),
  GET_APPLICATIONS: [config.API_ENDPOINT,'branches'].join('/'),
  DELETE : [config.API_ENDPOINT, 'branches'].join('/'),
  UPDATE :[config.API_ENDPOINT, 'branches'].join('/')
};
