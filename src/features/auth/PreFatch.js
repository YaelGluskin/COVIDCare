import { store } from '../../app/store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { usersApiSlice } from '../users/usersApiSlice';
import {clientsApiSlice} from '../clients/clientsApiSlice'
import { diseasesApiSlice} from '../disease/diseasesApiSlice'
import { vaccinesApiSlice} from "../vaccine/vaccinesApiSlice"

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing');

        // Initiate API requests for fetching all the data
        const clients = store.dispatch(clientsApiSlice.endpoints.getClients.initiate());
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
        const disease = store.dispatch(diseasesApiSlice.endpoints.getDiseases.initiate());
        const vaccine = store.dispatch(vaccinesApiSlice.endpoints.getVaccines.initiate());

        // Cleanup function to unsubscribe from initiated requests when component unmounts
        return () => {
            console.log('unsubscribing');
            clients.unsubscribe();
            users.unsubscribe();
            disease.unsubscribe();
            vaccine.unsubscribe();
        };
    }, []);

    return <Outlet />;
};

// The component is responsible for prefetching data by initiating API requests for notes and users when the component mounts.
export default Prefetch;
