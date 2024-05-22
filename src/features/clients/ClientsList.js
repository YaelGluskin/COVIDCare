import React, { useState } from "react";
import { useGetClientsQuery } from "./clientsApiSlice"
import Client from "./Client"; // Import the Client component
// import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import {useClientDataQuery}  from '../../hooks/useClientDataQuery';

const ClientsList = () => {
    const {
        data: clients, // Rename 'data' to 'clients' for clarity
        isLoading,
        isSuccess,
        isError,
        error  
    } = useGetClientsQuery(
        undefined, {
            pollingInterval: 60000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        });
    const { } = useClientDataQuery(); // Fetching data
        
    const [searchQuery, setSearchQuery] = useState("");
    const [searchVisible, setSearchVisible] = useState(false); // State to manage search visibility

    // const navigate = useNavigate()
    // const handleNav = () => navigate(`/dash/clients/new`); // I add a new buttom in the headfooter
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    let content // Define content variable to render based on loading and success states
    if(isLoading) content = <p>Louding clients...</p>// Display loading message while fetching data
    // Display error message if fetching data results in an error
    if(isError) content = <p className="errmsg">{error?.data?.message}</p>
    if (isSuccess) { // If data fetching is successful, render the clients list table
        const { ids } = clients // Generate table rows for each client

        const filteredClients = clients.ids?.filter(clientId => {
            const client = clients.entities[clientId];
            return client.clientID.includes(searchQuery);
        });
        
        const tableContent = filteredClients?.length
            ? filteredClients.map(clientId => <Client key={clientId} clientId={clientId} />)
            : <tr><td colSpan="7">No clients found.</td></tr>;


            content = ( // Render the clients list table
            <div >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <br></br>
                <button className="icon-button table__button"
                    onClick={() => setSearchVisible(!searchVisible)}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                {searchVisible && ( // Render search input if searchVisible is true
                    <input
                        type="text"
                        placeholder="Search by client ID"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    
                )}
                </div>
                <table className="tableC table--clients">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th client__Name">Name</th>
                        <th scope="col" className="table__th client__ID">ID</th>
                        <th scope="col" className="table__th client__City">City</th>
                        <th scope="col" className="table__th client__City">Age</th>
                        <th scope="col" className="table__th client__Phone">Phone Number</th>
                        <th scope="col" className="table__th client__Vaccines">Covid Head Line</th>
                        <th scope="col" className="table__th client__edit">INFO</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
            {/* <button className="icon-button" title="Add new" onClick={handleNav} >  Add </button> */}
        </div>
        
        );
    }

    return content // Render the content based on the current state
};
export default ClientsList