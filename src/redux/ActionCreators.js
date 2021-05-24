// utils
import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "./baseUrl";

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

export const fetchComments = () => (dispatch) => {
  fetch(`${baseUrl}/comments`)
    .then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        let error = new Error(`Error ${res.status}: ${res.statusText}`);
        throw error;
      },
      (netError) => {
        let error = new Error(netError.message);
        throw error;
      }
    )
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => {
      dispatch(failedComments(error.message));
    });
};

export const failedComments = (err) => ({
  type: ActionTypes.FAILED_COMMENTS,
  payload: err,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

// dishes
export const fetchDishes = () => (dispatch) => {
  dispatch(loadingDishes());

  fetch(`${baseUrl}/dishes`)
    .then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        let error = new Error(`Error ${res.status}: ${res.statusText}`);
        throw error;
      },
      (netError) => {
        let error = new Error(netError.message);
        throw error;
      }
    )
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => {
      dispatch(failedDishes(error.message));
    });
};

export const loadingDishes = () => ({
  type: ActionTypes.LOADING_DISHES,
});

export const failedDishes = (err) => ({
  type: ActionTypes.FAILED_DISHES,
  payload: err,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

// promotions
export const fetchPromotions = () => (dispatch) => {
  dispatch(loadingPromotions());

  fetch(`${baseUrl}/promotions`)
    .then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        let error = new Error(`Error ${res.status}: ${res.statusText}`);
        throw error;
      },
      (netError) => {
        let error = new Error(netError.message);
        throw error;
      }
    )
    .then((promos) => dispatch(addPromotions(promos)))
    .catch((error) => {
      dispatch(failedPromotions(error.message));
    });
};

export const loadingPromotions = () => ({
  type: ActionTypes.LOADING_PROMOTIONS,
});

export const failedPromotions = (err) => ({
  type: ActionTypes.FAILED_PROMOTIONS,
  payload: err,
});

export const addPromotions = (promos) => ({
  type: ActionTypes.ADD_PROMOTIONS,
  payload: promos,
});
