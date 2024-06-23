import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "../feature/counter/counterSlice";
import usersReducer from "../feature/users/usersSlice";
import { apiSlice } from "../feature/api/apiSlice";

export const store = configureStore({
    reducer:{
        // counter:counterReducer
        // posts:postReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
        users:usersReducer, 
    },

    //its manage cache lifetime its required while using rtk and api slice
    middleware:getDefaultMiddleware =>  getDefaultMiddleware().concat(apiSlice.middleware)
})