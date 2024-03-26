import {createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import {apiSlice } from "../../app/api/apiSlice";

// Create an entity adapter for managing client entities
const clientEntityManager = createEntityAdapter({});

// Define the initial state using the entity adapter, if it exict
const initialClientState = clientEntityManager.getInitialState();
// Inject endpoints into the apiSlice from the external apiSlice module
export const clientsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Define the 'getClients' endpoint for fetching clients
        getClients: builder.query({
            query: () => '/clients', // Endpoint URL
            validateStatus: (response, result) => {
                // Custom status validation function some error return 200 status, so we need to check them both.
                return response.status === 200 && !result.isError;
            },
            transformResponse: responseData => {
                // Transform response data before storing it in the Redux store
                const loadedClients = responseData.map(client => {
                    client.id = client._id; // Assign 'id' property to client object
                    return client;
                });
                return clientEntityManager.setAll(initialClientState, loadedClients); // Update state with transformed data
            },
            providesTags: (result, error, arg) => {
                // Provide tags for caching purposes
                if (result?.ids) {
                    return [
                        { type: 'Client', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Client', id }))
                    ];
                } else return [{ type: 'Client', id: 'LIST' }];
            }
        }),
        // Define mutation endpoints for adding, updating, and deleting clients
        addNewClient: builder.mutation({
            query: initialClientData => ({
                url: '/clients', // API endpoint URL for updating clients
                method: 'POST',
                body: {  ...initialClientData, } // Data to be sent in the request body
            }),
            invalidatesTags: [ { type: 'Client', id: "LIST" } ] // Invalidate cached client list after adding a new client
        }),
        updateClient: builder.mutation({
            query: initialClientData => ({
                url: '/clients', // API endpoint URL for updating clients
                method: 'PATCH', // HTTP method for updating clients
                body: {  ...initialClientData,} // Data to be sent in the request body
            }),
            invalidatesTags: (result, error, arg) => [ { type: 'Client', id: arg.id } ] // Invalidate cached client after updating
        }),
        deleteClient: builder.mutation({
            query: ({ id }) => ({
                url: `/clients`,
                method: 'DELETE', // HTTP method for deleting clients
                body: { id } //  // ID to be sent in the request body
            }),
            invalidatesTags: (result, error, arg) => [ { type: 'Client', id: arg.id } ] // Invalidate cached client after deletion
        }),
    }), // End endpoints
});

// Export query hooks generated by the apiSlice
export const {
    useGetClientsQuery,
    useAddNewclientMutation, // Add the 3 mutation of CRUD
    useUpdateclientMutation,
    useDeleteclientMutation,
} = clientsApiSlice;

// Select the query result object from the getClients endpoint
export const selectClientsResult = clientsApiSlice.endpoints.getClients.select();

// Create a memoized selector to extract clients data from the query result
const selectClientsData = createSelector(
    selectClientsResult,
    clientsResult => clientsResult.data // normalized state object with ids & entities
);

// Extract selectors using the entity adapter's getSelectors function
// Pass in a selector that returns the clients slice of state
export const {
    selectAll: selectAllClients,
    selectById: selectClientById,
    selectIds: selectClientIds
} = clientEntityManager.getSelectors(state => selectClientsData(state) ?? initialClientState);
