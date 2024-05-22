import{ useState, useEffect } from 'react'; // For disease details
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectClientById } from './clientsApiSlice'

import { selectAllDiseases } from '../disease/diseasesApiSlice';

// React component representing a client row in a table
const Client = ({ clientId }) => {
    const client = useSelector(state => selectClientById(state, clientId)) // Select client from Redux store by clientId
    const navigate = useNavigate() // Hook to navigate to different routes

    const allDiseases = useSelector(selectAllDiseases); // Disease
    const [diseases, setDiseases] = useState([]);
    useEffect(() => {
        if (client && allDiseases) {
            const clientDisease = allDiseases.filter(disease => disease.client === clientId);
            setDiseases(clientDisease);
        }
    }, [clientId, client, allDiseases]);
    
    if (!client) return null; // If client does not exist, return null (no rendering)
    // Function to handle edit button click, navigates to client edit page
    const handleEdit = () => navigate(`/dash/clients/${clientId}`);

    // Determine cell status based on client's active status
    const cellStatus = client.active ? '' : 'table__cell--inactive';
    function calculateAge(birthDate) {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
    
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
        // If the current month is before the birth month, or if it's the same month but the birth day hasn't occurred yet
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
    
        return age;
    }

    return ( // Render client row
        <tr className={`table__row client ${cellStatus}`}>
            <td className="table__cell">{client.clientName} {client.clientLastName}</td>
            <td className="table__cell">{client.clientID}</td>
            <td className="table__cell">{client.address.city}</td>
            <td className="table__cell">{calculateAge(client.birthDate)}</td>
            <td className="table__cell">{client.cellPhoneNumber}</td>
            {/* <td className="table__cell">{client.nunOfVaccine !== 0 ? client.nunOfVaccine : "Not vaccinated"}</td> */}
            <td className="table__cell">
                {client.nunOfVaccine !== 0 ? (
                <li> {client.nunOfVaccine} Vaccination </li>) : (
                <li>Not vaccinated</li> )
                }
                    
                {diseases.length > 0 ? (
                    <div>
                        {diseases.map(disease => (
                            <li key={disease.id}>
                                Diagnosed in {new Date(disease.datePositive).toLocaleDateString('en-IL', { month: 'long', year: 'numeric' })}  </li>
                        ))}
                    </div> ) : ( 
                    <li>Not Diagnosed </li>  )
                }
            </td>

            <td className="table__cell">
                {/* info button */}
                <button
                    className="icon-button table__button"
                    onClick={handleEdit}
                >
                    {/* Edit icon */}
                    <FontAwesomeIcon icon={faInfoCircle} />
                </button>
            </td>
        </tr>
    );
};

export default Client;