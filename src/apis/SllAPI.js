import config from '../config';

export const SLL_API = {

  GET_SLL_INFO : [config.API_ENDPOINT,'comments','agent-id'].join('/'),
  GET_EXPAND_SLL_INFO : [config.API_ENDPOINT,'comments','agent-id'].join('/')

};
