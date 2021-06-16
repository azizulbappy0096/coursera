// utils
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
      case ActionTypes.UPADTE_DISH:
        let index = state.dishes.findIndex(dish => dish._id === action.payload._id)
        let newDish = state.dishes
        newDish[index].comments = action.payload.comments
        console.log(newDish)
        return {
          ...state,
          isLoading: false,
          error: null,
          dishes: newDish
        };
    default:
      return state;
  }
};
