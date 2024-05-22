import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import { DASH_REGEX, CLIENTS_REGEX, USERS_REGEX, DISEASES_REGEX, VACCINES_REGEX } from "../config/dash";

const DashHeader = () => {

    const {isManager, isAdmin} = useAuth();
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isSuccess,
        isLoading,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onLogoutClicked = () => sendLogout()
        
    if (isLoading) { 
        return <p>Logging Out...</p>
    } 
    // Handlers for navigation
    const onNewClientsClicked = () => navigate('/dash/clients/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onClientsClicked = () => navigate('/dash/clients')
    const onUsersClicked = () => navigate('/dash/users')

    // if (isError) return <p>Error: {error.data?.message}</p>

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !CLIENTS_REGEX.test(pathname) && !USERS_REGEX.test(pathname) && !DISEASES_REGEX.test(pathname) && !VACCINES_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }
    let newClientButton = null
    if (CLIENTS_REGEX.test(pathname)) {
        newClientButton = (
            <button
                className="icon-button"
                title="New Client"
                onClick={onNewClientsClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let clientsButton = null
    if (!CLIENTS_REGEX.test(pathname) && pathname.includes('/dash')) {
        clientsButton = (
            <button
                className="icon-button"
                title="Clientes"
                onClick={onClientsClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }




    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={onLogoutClicked}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const errClass = isError ? "errmsg" : "offscreen"
    let buttonContent
    if (isLoading) {
        buttonContent = <p>Logging Out...</p>
    } else {
        buttonContent = (
            <>
                {newClientButton}
                {newUserButton}
                {clientsButton}
                {userButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <header className="dash-header">
                <div className={`dash-header__container ${dashClass}`}>
                    {/* 
                        Link component is used to create a navigation link to the "/dash" path.
                        Clicking on the title navigates to the dashboard.
                    */}
                    <Link to="/dash">
                        <h1 className="dash-header__title">COVIDCare</h1>
                    </Link>
                    {/* 
                        Placeholder for navigation buttons. 
                        You can add navigation buttons here later.
                    */}
                    <nav className="dash-header__nav">
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
        
    )
    return content
}
export default DashHeader