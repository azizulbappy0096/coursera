// import modules
import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import { createForms } from "react-redux-form"

// reducers
import { Dishes } from "./Reducers/dishes"
import { Comments } from "./Reducers/comments"
import { Leaders } from "./Reducers/leaders"
import { Promotions } from "./Reducers/promotions"

// initial state
import { initialFeedbackForm } from "./Forms"

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            leaders: Leaders,
            promotions: Promotions,
            ...createForms({
                feedback: initialFeedbackForm
            })
        }),
        applyMiddleware(thunk, logger)
    );
    
    return store
}