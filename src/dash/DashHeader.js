import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../hooks/useAuth';
import { DASH_REGEX, CLIENTS_REGEX, USERS_REGEX, DISEASES_REGEX, VACCINES_REGEX } from "../config/dash";
import { AppBar, Toolbar, Typography, IconButton, Button, Container, CircularProgress, Alert } from '@mui/material';

const DashHeader = () => {
    const { isManager, isAdmin } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [sendLogout, {
        isSuccess,
        isLoading,
        isError,
        error
    }] = useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess, navigate]);

    const onLogoutClicked = () => sendLogout();

    if (isLoading) {
        return <CircularProgress />;
    }

    // Handlers for navigation
    const onNewClientsClicked = () => navigate('/dash/clients/new');
    const onNewUserClicked = () => navigate('/dash/users/new');
    const onClientsClicked = () => navigate('/dash/clients');
    const onUsersClicked = () => navigate('/dash/users');

    let newClientButton = null;
    if (CLIENTS_REGEX.test(pathname)) {
        newClientButton = (
            <IconButton color="primary" title="New Client" onClick={onNewClientsClicked}>
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </IconButton>
        );
    }

    let newUserButton = null;
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <IconButton color="primary" title="New User" onClick={onNewUserClicked}>
                <FontAwesomeIcon icon={faUserPlus} />
            </IconButton>
        );
    }

    let userButton = null;
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <IconButton color="primary" title="Users" onClick={onUsersClicked}>
                    <FontAwesomeIcon icon={faUserGear} />
                </IconButton>
            );
        }
    }

    let clientsButton = null;
    if (!CLIENTS_REGEX.test(pathname) && pathname.includes('/dash')) {
        clientsButton = (
            <IconButton color="primary" title="Clients" onClick={onClientsClicked}>
                <FontAwesomeIcon icon={faFilePen} />
            </IconButton>
        );
    }

    const logoutButton = (
        <IconButton color="primary" title="Logout" onClick={onLogoutClicked}>
            <FontAwesomeIcon icon={faRightFromBracket} />
        </IconButton>
    );

    const errClass = isError ? "errmsg" : "offscreen";
    let buttonContent;
    if (isLoading) {
        buttonContent = <CircularProgress />;
    } else {
        buttonContent = (
            <>
                {newClientButton}
                {newUserButton}
                {clientsButton}
                {userButton}
                {logoutButton}
            </>
        );
    }

    return (
        <>
            {isError && <Alert severity="error">{error?.data?.message}</Alert>}
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to="/dash" style={{ textDecoration: 'none', color: 'inherit' }}>COVIDCare</Link>
                        </Typography>
                        <nav>
                            {buttonContent}
                        </nav>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default DashHeader;
