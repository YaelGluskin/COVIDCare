import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode';

// Custom hook to handle authentication related logic
const useAuth = () => {
    // Select the current token from the Redux store
    const token = useSelector(selectCurrentToken)
    
    // Initialize variables to store user role information
    let isManager = false
    let isAdmin = false
    let status = "Employee"

    // Check if a token is present
    if (token) {
        // Decode the token to extract user information
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        // Check if user has Manager or Admin role
        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')

        // Update user status based on roles
        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        // Return user information
        return { username, roles, status, isManager, isAdmin }
    }

    // Return default values if no token is present
    return { username: '', roles: [], isManager, isAdmin, status }
}

export default useAuth
