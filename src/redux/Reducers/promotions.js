// utils
import * as ActionTypes from "../ActionTypes";

export const Promotions = (state = {
    isLoading: true,
    error: null,
    promotions: []
}, action) => {
  switch (action.type) {
    case ActionTypes.LOADING_PROMOTIONS:
      return {
        ...state,
        isLoading: true,
        error: null,
        promotions: [],
      };
    case ActionTypes.FAILED_PROMOTIONS:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        promotions: [],
      };
    case ActionTypes.ADD_PROMOTIONS:
      return {
        ...state,
        isLoading: false,
        error: null,
        promotions: action.payload,
      };
    default:
      return state;
  }
};
