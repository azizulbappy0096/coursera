// utils
import * as ActionTypes from "../ActionTypes";

export const Comments = (state = {
    error: null,
    comments: []
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      let comment = action.payload;
      return {...state, comments: [...state.comments, comment]};
    case ActionTypes.FAILED_COMMENTS:
      return {
        ...state,
        error: action.payload,
        comments: [],
      };
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        error: null,
        comments: action.payload,
      };
    default:
      return state;
  }
};
