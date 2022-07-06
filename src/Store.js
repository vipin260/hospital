import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducer/rootindex";
import thunk from "redux-thunk";



const store = configureStore({
    reducer : rootReducer,
    Middleware : [thunk]
})

export default store;