// Manage the application's state and handle data flow.
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";
// Configure the Redux store using the configureStore function from "@reduxjs/toolkit".
export const store = configureStore({
    // The reducer object defines the initial state and the functions to handle actions for different parts of the state.
    // In this case, the apiSlice.reducer is assigned to a specific key in the state.
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },

    // The middleware option allows for customizing the middleware stack.
    // In this case, the getDefaultMiddleware function is used to obtain the default middleware stack,
    // and then the apiSlice.middleware is appended to it using the concat method.
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),

    // The devTools option enables the Redux DevTools Extension, which provides advanced debugging capabilities.
    // It is set to true to enable the extension in the browser.
    devTools: false
});

setupListeners(store.dispatch)
