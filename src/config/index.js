const DEAFULT_CONFIG = {
  API_ENDPOINT:""
  // API_ENDPOINT: 'http://192.168.43.111:8000'
  // API_ENDPOINT: 'https://lbs-dev.api-hdfclife.com'
};

const CONFIG = {
  API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || DEAFULT_CONFIG.API_ENDPOINT
};

export default CONFIG;
