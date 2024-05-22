import React from 'react';
import { Link } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

const Welcom = () => {
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-IL', { dateStyle: 'long', timeStyle: 'short' }).format(date);
    const {username, isManager, isAdmin} = useAuth()
    
    return (
        <section className="welcome">
            <p>{today}</p>
            <h1>Welcome {username} !</h1>
            
            {(isAdmin || isManager ) && ( <div> 
            <p><Link to="/dash/users">View Users</Link></p>
            <p><Link to="/dash/users/new">Create new User</Link></p>
            <br></br> 
            </div>)}
            <p><Link to="/dash/clients">View Current Clients</Link></p>

            <p><Link to="/dash/clients/new">Create new Client</Link></p>
            <br></br>
            <p><Link to="/dash/vaccines">View Vaccines</Link></p>
            {/* <p><Link to="/dash/vaccines/new">Create new Vaccine</Link></p> */}

            <p><Link to="/dash/diseases">View Disease</Link></p>
            {/* Render the LastMonthDiary component */}
            
        </section>
    );
}

export default Welcom;
