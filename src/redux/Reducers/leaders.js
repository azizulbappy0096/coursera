// utils
import * as ActionTypes from "../ActionTypes";

export const Leaders = (
  state = {
    isLoading: true,
    error: null,
    leaders: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOADING_LEADERS:
      return {
        ...state,
        isLoading: true,
        error: null,
        leaders: [],
      };
    case ActionTypes.FAILED_LEADERS:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        leaders: [],
      };
    case ActionTypes.ADD_LEADERS:
      return {
        ...state,
        isLoading: false,
        error: null,
        leaders: action.payload,
      };
    default:
      return state;
  }
};
