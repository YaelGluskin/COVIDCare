import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectDiseaseById } from './diseasesApiSlice'

// React component representing a disease row in a table
const Disease = ({ diseaseId }) => {
    const disease = useSelector(state => selectDiseaseById(state, diseaseId)) // Select disease from Redux store by diseaseId
    const navigate = useNavigate() // Hook to navigate to different routes
    if (disease) { // If disease exists, render disease details
        // Function to handle edit button click, navigates to disease edit page
        const handleEdit = () => navigate(`/dash/diseases/${diseaseId}`)
        const diseaseDate = new Date(disease.datePositive).toLocaleString('en-IL', { day: 'numeric', month: 'long', year: 'numeric' })
        const recoveryDate = new Date(disease.dateRecovery).toLocaleString('en-IL', { day: 'numeric', month: 'long', year: 'numeric' })
        
        return ( // Render disease row
            <tr className="table__row disease">
                <td className="table__cell ">{diseaseDate}</td>
                <td className={`table__cell `}>{recoveryDate}</td>
                <td className={`table__cell `}>
                    <li>{disease.clientName} {disease.clientLastName} </li> 
                    <li> id: {disease.clientID} </li>
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

    } else return null  // If disease does not exist, return null (no rendering)
};

export default Disease;