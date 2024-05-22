import { createSlice } from "@reduxjs/toolkit"; // Import createSlice function from Redux Toolkit

const authSlice = createSlice({ // Create a slice of Redux state for authentication
    name: 'auth', // Name of the slice
    initialState: { token: null }, // Initial state containing token as null
    reducers: { // Define reducers for updating state
        setCredentials: (state, action) => { // Reducer to set authentication credentials
            const { accessToken } = action.payload // Extract accessToken from payload
            state.token = accessToken // Update token in state
        },
        logOut: (state, action) => { // Reducer to log out user
            state.token = null // Set token to null on logout
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions // Export action creators
export default authSlice.reducer // Export reducer function
export const selectCurrentToken = (state) => state.auth.token // Selector function to get current token from state
