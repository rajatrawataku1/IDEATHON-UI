const DEAFULT_CONFIG = {
  API_ENDPOINT: 'http://172.31.99.14:8081'
  // API_ENDPOINT: 'https://lbs-dev.api-hdfclife.com'
  // API_ENDPOINT: 'http://170.20.10.6:8000'

};

const CONFIG = {
  API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || DEAFULT_CONFIG.API_ENDPOINT
};

export default CONFIG;
