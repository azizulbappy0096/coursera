// utils
import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "./baseUrl";

// comments
const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (dispatch, dishId, rating, comment) => {
  let newComment = {
    rating,
    comment,
  }

  const bearer = `Bearer ${localStorage.getItem("token")}`
  fetch(`${baseUrl}/dishes/${dishId}/comments`, {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
      "Authorization": bearer
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
  .then((dish) => {
    dispatch(updateDishes(dish))
  })
  .catch((error) => {
    console.log('post comments', error.message);
    alert('Your comment could not be posted\nError: '+ error.message);
  });
}

export const fetchComments = (dishId) => (dispatch) => {
  fetch(`${baseUrl}/dishes/${dishId}/comments`)
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
    .then((comments) =>{
      console.log("from action asdqwedssasad",comments)
      dispatch(addComment(comments))})
    .catch((error) => {
      dispatch(failedComments(error.message));
    });
};

const failedComments = (err) => ({
  type: ActionTypes.FAILED_COMMENTS,
  payload: err,
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

const updateDishes = (dish) => ({
  type: ActionTypes.UPADTE_DISH,
  payload: dish
})

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

// auth
export const login = (creds) => (dispatch) => {
  dispatch(requestLogin(creds))

  fetch(`${baseUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    }

    let error = new Error(`Error ${res.status} : ${res.statusText}`)
    error.response = res
    throw error
  }, error => {throw error})
  .then(jsonRes => {
    if(jsonRes.success) {
      localStorage.setItem("token", jsonRes.token)
      localStorage.setItem("creds", creds)
      dispatch(successLogin(jsonRes.token))
    }
  })
  .catch(err => {
    dispatch(failedLogin(err.message))
  })
}

export const logout = () => (dispatch) => {
  dispatch(requestLogout())
  localStorage.removeItem("token")
  localStorage.removeItem("creds")
  dispatch(successLogout())
}

const successLogin = (token) => ({
  type: ActionTypes.SUCCESS_LOGIN,
  payload: {
    token: token
  }
})

const requestLogin = (creds) => ({
  type: ActionTypes.REQUEST_LOGIN,
  payload: {
    creds
  }
})

const failedLogin = (err) => ({
  type: ActionTypes.FAILED_LOGIN,
  payload: {
    error: err
  }
})

const successLogout = () => ({
  type: ActionTypes.SUCCESS_LOGOUT,
})

const requestLogout = () => ({
  type: ActionTypes.REQUEST_LOGOUT
})