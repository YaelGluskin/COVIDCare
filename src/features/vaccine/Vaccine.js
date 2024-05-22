import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectVaccineById } from './vaccinesApiSlice'

// React component representing a vaccine row in a table
const Vaccine = ({ vaccineId }) => {
    const vaccine = useSelector(state => selectVaccineById(state, vaccineId)) // Select vaccine from Redux store by vaccineId
    const navigate = useNavigate() // Hook to navigate to different routes
    if (vaccine) { // If vaccine exists, render vaccine details
        // Function to handle edit button click, navigates to vaccine edit page
        const handleEdit = () => navigate(`/dash/vaccines/${vaccineId}`)
        const vaccineDate = new Date(vaccine.date).toLocaleString('en-IL', { day: 'numeric', month: 'long', year: 'numeric' })
        // const clientId = new String(vaccine.client)
        return ( // Render vaccine row
            <tr className="table__row vaccine">
                <td className="table__cell accineDate">{vaccineDate}</td>
                <td className={`table__cell `}>{vaccine.name} </td>
                <td className={`table__cell `}>
                    <li>{vaccine.clientName} {vaccine.clientLastName} </li> 
                    <li> id: {vaccine.clientID} </li>
                </td>
                <td className={`table__cell `}>
                    {/* Edit button */}
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        {/* Edit icon */}
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null  // If vaccine does not exist, return null (no rendering)
};

export default Vaccine;