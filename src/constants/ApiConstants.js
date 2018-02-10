const env = require('../../.env');

const API_URL = env.NODE_ENV !== 'prod' ? env.API_LOCAL_URL : env.API_PROD_URL;

export const LOCATIONS_API_URL = API_URL + '/api/locations';
export const SERVERS_API_URL = API_URL + '/api/servers';
