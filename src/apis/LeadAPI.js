import config from '../config';

export const LEAD_API = {

  GET_LEADS_INFO: [config.API_ENDPOINT,'leads'].join('/'),
  ADD_LEADS_COMMENTS: [config.API_ENDPOINT,'leads'].join('/'),

};
