import config from '../config';

export const DASHBOARD_API = {

  GET_AGENT_INFO : [config.API_ENDPOINT,'dashboard','agent-info'].join('/'),

  GET_LEADS_INFO: [config.API_ENDPOINT,'dashboard','report','lead-funnel'].join('/'),
  GET_JOIN_CALL: [config.API_ENDPOINT,'dashboard','report','joint-calls'].join('/'),
  GET_CAMPAIGN_EFFICIENCY: [config.API_ENDPOINT, 'dashboard','report','campaigns'].join('/'),

  GET_MANAGER_COMMENTS: [config.API_ENDPOINT,'dashboard','comments'].join('/'),
  GET_SELF_COMMENTS: [config.API_ENDPOINT,'dashboard','comments'].join('/'),

  SET_SELF_COMMENTS: [config.API_ENDPOINT,'dashboard','comments','add-comment'].join('/'),
  SET_MANAGER_COMMENTS: [config.API_ENDPOINT,'dashboard','comments','add-manager-comment'].join('/'),

};
