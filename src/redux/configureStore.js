// import modules
import { createStore } from "redux"

// reducer
import { Reducer, initialState } from "./reducer"

export const configureStore = () => {
    const store = createStore(Reducer, initialState);
    
    return store
}