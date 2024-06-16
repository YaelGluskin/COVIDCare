import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AppBar, Toolbar, Typography, IconButton, Container } from '@mui/material';

const DashFooter = () => {
    const nav = useNavigate();
    const { pathname } = useLocation();
    const { username, status } = useAuth();

    const onGoHomeClicked = () => nav('');

    let goHomeBtn = null;
    if (pathname !== '/dash') {
        goHomeBtn = (
            <IconButton color="primary" title="Home" onClick={onGoHomeClicked}>
                <FontAwesomeIcon icon={faHouse} />
            </IconButton>
        );
    }

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="xl">
                <Toolbar>
                    {goHomeBtn}
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        Current User: {username}
                    </Typography>
                    <Typography variant="body1">
                        Status: {status}
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default DashFooter;
