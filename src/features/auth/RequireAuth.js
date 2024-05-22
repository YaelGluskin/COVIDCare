import { useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// Component that checks if the user is authenticated and has the required roles 
const RequireAuth = ({ allowedRoles }) => {
    // Get the current location from the router
    const location = useLocation()

    // Get user information using the useAuth hook
    const { roles } = useAuth()

    // Check if the user has any of the allowed roles
    const content = (
        roles.some(role => allowedRoles.includes(role))
            ? <Outlet />  // Render child routes if the user has allowed roles
            : <Navigate to="/login" state={{ from: location }} replace />  // Redirect to login page if user doesn't have allowed roles
    )

    return content
}

export default RequireAuth
