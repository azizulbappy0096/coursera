import * as ActionTypes from "../ActionTypes";

export const Dishes = (
  state = {
    isLoading: true,
    error: null,
    dishes: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOADING_DISHES:
      return {
        ...state,
        isLoading: true,
        error: null,
        dishes: [],
      };
    case ActionTypes.FAILED_DISHES:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        dishes: [],
      };
    case ActionTypes.ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        error: null,
        dishes: action.payload,
      };
    default:
      return state;
  }
};
