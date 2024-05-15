import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

// Define a base query function using fetchBaseQuery from Redux Toolkit Query
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500', // Base URL for API requests
    credentials: 'include', // Include cookies in requests
    // Prepare headers function to add authorization header with token from Redux state
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token // Get token from Redux state

        if (token) {
            headers.set("authorization", `Bearer ${token}`) // Add authorization header if token exists
        }
        return headers
    }
})

// Define a custom base query function with reauthentication logic
const baseQueryWithReauth = async (args, api, extraOptions) => {
    // Perform the base query using the provided arguments and extra options
    let result = await baseQuery(args, api, extraOptions)

    // If the error status is 403 (Forbidden), indicating token expiration
    if (result?.error?.status === 403) {
        console.log('sending refresh token')

        // Send a refresh token request to get a new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        // If the refresh request is successful and returns data
        if (refreshResult?.data) {
            // Store the new token in the Redux store
            api.dispatch(setCredentials({ ...refreshResult.data }))

            // Retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            // If the refresh request fails, handle the error
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired. " // Update error message
            }
            return refreshResult // Return the error result
        }
    }

    return result // Return the final result
}

// Create an API slice using createApi from Redux Toolkit Query
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth, // Use the custom base query function with reauthentication logic
    tagTypes: ['Note', 'User'], // Define tag types for the API
    endpoints: builder => ({}) // Define endpoints for the API
})
