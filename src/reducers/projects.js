import * as ActionTypes from '../constants/ActionTypes';// includes Action Types constants

export default function projects(state = { projects: { } }, action) {
  switch (action.type) {
    case ActionTypes.FETCH_SERVERS_DETAILS_SUCCESS:

      state = {
        type: action.type,
        data: action.payload,
      };

      return state;

    case ActionTypes.FETCH_SERVERS_DETAILS_FAILED:

      state = {
        type: action.type,
        data: action.payload,
      };

      return state;

    default:
      return state;
  }
}
