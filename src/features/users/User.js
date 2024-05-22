import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

// React component representing a user row in a table
const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId)) // Select user from Redux store by userId
    const navigate = useNavigate() // Hook to navigate to different routes

    if (user) { // If user exists, render user details
        // Function to handle edit button click, navigates to user edit page
        const handleEdit = () => navigate(`/dash/users/${userId}`)
        // Convert user roles array to string for display
        const userRolesDisplay = user.roles.toString().replaceAll(',', ', ') // For looking good
        const cellStatus = user.active ? '' : 'table__cell--inactive'  // Determine cell status based on user's active status

        return ( // Render user row
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{userRolesDisplay}</td>
                <td className={`table__cell ${cellStatus}`}>
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

    } else return null  // If user does not exist, return null (no rendering)
};

export default User;