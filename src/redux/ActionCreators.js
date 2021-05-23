import * as ActionTypes from "./ActionTypes";

// utils
import { DISHES } from "../shared/dishes";

// comments
export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId,
    rating,
    author,
    comment,
  },
});

// dishes
export const fetchDishes = () => (dispatch) => {
    dispatch(loadingDishes())

    setTimeout(() => {
        dispatch(addDishes(DISHES))
    }, 2000)
}

export const loadingDishes = () => ({
    type: ActionTypes.LOADING_DISHES
})

export const failedDishes = (err) => ({
    type: ActionTypes.FAILED_DISHES,
    payload: err
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})