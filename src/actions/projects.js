import * as ActionTypes from '../constants/ActionTypes';// includes Action Types constants
import * as API_URL from '../constants/ApiConstants';// includes API URL's constants

const axios = require('axios');

export const createProject = (params,callback) => {
  axios.post(API_URL.CREATE_PROJECT_URL,params)
  .then((body) => {
      callback(body.data);
    }).catch((ex) => {
      callback(ex);
  });
};

export const fetchProjects = (callback) => {
  axios.get(API_URL.FETCH_PROJECTS_URL)
  .then((body) => {
      callback(body.data);
    }).catch((ex) => {
      callback(ex);
  });
};
