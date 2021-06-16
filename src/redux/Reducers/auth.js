// utils
import * as ActionTypes from "../ActionTypes";

export const Auth = (state = {
    isLoading: false,
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token"),
    user: localStorage.getItem("creds") ? localStorage.getItem("creds") : null,
    error: null
}, action) => {
    let auth = action.payload;
  switch (action.type) {
    case ActionTypes.REQUEST_LOGIN:
        
      return {...state, isLoading: true, isAuthenticated: false, user: auth.creds};
    case ActionTypes.FAILED_LOGIN:
        
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: "",
        user: null,
        error: auth.error,
      };
    case ActionTypes.SUCCESS_LOGIN:
       
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: auth.token,
      };
    case ActionTypes.REQUEST_LOGOUT:
        return {
            isLoading: true,
            isAuthenticated: true, 
        }  
    case ActionTypes.SUCCESS_LOGOUT:
        return {
            isLoading: false,
            isAuthenticated: false, 
            token: "",
            user: null,
        }  
    default:
      return state;
  }
};
