import * as ActionTypes from '../constants/ActionTypes';// includes Action Types constants
import * as API_URL from '../constants/ApiConstants';// includes API URL's constants

const axios = require('axios');

export const createProject = params => (dispatch) => {

  return axios.post('http://localhost:8000/projects/create')
  .then((body) => {
      dispatch({
        type: ActionTypes.CREATE_PROJECT_SUCCESS,
        payload: {
          project: body.data
        }
      });
    }).catch((ex) => {
      dispatch({
        type: ActionTypes.CREATE_PROJECT_FAILED,
        payload: {
          project: null,
          error: ex,
        },
      });
  });
};
