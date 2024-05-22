import { apiSlice } from "../../app/api/apiSlice"; // Import API slice from the app's API module
import { logOut, setCredentials } from "./authSlice"; // Import logout action from the authentication slice

export const authApiSlice = apiSlice.injectEndpoints({ // Create an API slice for authentication
    
    endpoints: builder => ({ // Define endpoints for API operations
        login: builder.mutation({ // Define a mutation for login operation
            query: credentials => ({ // Define the query for login operation, username and pwd
                url: '/auth', // API endpoint for login
                method: 'POST', // HTTP method for login
                body: { ...credentials } // Request body containing user credentials
            })
        }),
        /*
        sendLogout: builder.mutation({ // Define a mutation for logout operation
            query: () => ({ // Define the query for logout operation
                url: '/auth/logout', // API endpoint for logout
                method: 'POST', // HTTP method for logout
                
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
            
        }), */ 
        
        sendLogout: builder.mutation({
            // Define a mutation for logout operation
            query: () => ({
                // Define the query for logout operation
                url: '/auth/logout', // API endpoint for logout
                method: 'POST', // HTTP method for logout
            }),
            
            onSuccess(data, { dispatch }) {
                // This function is called when the mutation is successful
                // You can dispatch actions or perform any other necessary logic here
                dispatch(logOut()) // Dispatch logout action
                dispatch(apiSlice.util.resetApiState()) // Reset API state
                console.log('Logout successful');
            },
            onError(err, { dispatch }) {
                // This function is called when the mutation encounters an error
                // You can handle errors here, such as displaying error messages
                console.error('Logout error:', err);
            }
        }),
        
        refresh: builder.mutation({ // Define a mutation for token refresh operation
            query: () => ({ // Define the query for token refresh operation
                url: '/auth/refresh', // API endpoint for token refresh
                method: 'GET', // HTTP method for token refresh
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data) // console the new token
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    // To Add nav to homepage
                    console.log(err)
                }
            }

        }),
    })
})

// Export hooks for using mutations in components
export const {
    useLoginMutation, // Hook for login mutation
    useSendLogoutMutation, // Hook for logout mutation
    useRefreshMutation, // Hook for token refresh mutation
} = authApiSlice