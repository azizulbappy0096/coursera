// utils
import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "./baseUrl";

// comments
const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (dispatch, dishId, rating, author, comment) => {
  let newComment = {
    dishId,
    rating,
    author,
    comment,
  }
  newComment.date = new Date().toISOString();

  fetch(baseUrl + "/comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(
    (res) => {
      if (res.ok) {
        return res.json();
      }
      let error = new Error(`Error ${res.status}: ${res.statusText}`);
      error.response = res
      throw error;
    },
    (netError) => {
      let error = new Error(netError.message);
      throw error;
    }
  )
  .then((comment) => dispatch(addComment(comment)))
  .catch((error) => {
    console.log('post comments', error.message);
    alert('Your comment could not be posted\nError: '+ error.message);
  });
}

export const fetchComments = () => (dispatch) => {
  fetch(`${baseUrl}/comments`)
    .then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        let error = new Error(`Error ${res.status}: ${res.statusText}`);
        error.response = res
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

const failedComments = (err) => ({
  type: ActionTypes.FAILED_COMMENTS,
  payload: err,
});

const addComments = (comments) => ({
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
        error.response = res
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

const loadingDishes = () => ({
  type: ActionTypes.LOADING_DISHES,
});

const failedDishes = (err) => ({
  type: ActionTypes.FAILED_DISHES,
  payload: err,
});

const addDishes = (dishes) => ({
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

const loadingPromotions = () => ({
  type: ActionTypes.LOADING_PROMOTIONS,
});

const failedPromotions = (err) => ({
  type: ActionTypes.FAILED_PROMOTIONS,
  payload: err,
});

const addPromotions = (promos) => ({
  type: ActionTypes.ADD_PROMOTIONS,
  payload: promos,
});

// leaders
export const fetchLeaders = () => (dispatch) => {
  dispatch(loadingLeaders());

  fetch(`${baseUrl}/leaders`)
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
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => {
      dispatch(failedLeaders(error.message));
    });
};

const loadingLeaders = () => ({
  type: ActionTypes.LOADING_LEADERS,
});

const failedLeaders = (err) => ({
  type: ActionTypes.FAILED_LEADERS,
  payload: err,
});

const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});
