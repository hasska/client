import * as ActionTypes from '../constants/ActionTypes';// includes Action Types constants

export default function projects(state = { servers: { } }, action) {
  switch (action.type) {
    case ActionTypes.CREATE_PROJECT_SUCCESS:

      state = {
        type: action.type,
        data: action.payload,
      };

      return state;

    case ActionTypes.CREATE_PROJECT_FAILED:

      state = {
        type: action.type,
        data: action.payload,
      };

      return state;

    default:
      return state;
  }
}
