// utils
import * as ActionTypes from "../ActionTypes";

export const Comments = (state = {
    error: null,
    comments: []
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      let comment = action.payload;
      return {...state, comments: action.payload};
    case ActionTypes.FAILED_COMMENTS:
      return {
        ...state,
        error: action.payload,
        comments: [],
      };
    default:
      return state;
  }
};
