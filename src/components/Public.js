import { Link } from "react-router-dom";
import { Container, Typography, Paper } from '@mui/material';

const Public = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to <span className="nowrap">COVIDCare!</span>
                </Typography>
                <Typography variant="body1" paragraph>
                    COVIDCare is a secured platform intended for registered users who are employees of the health insurance fund.
                </Typography>
                <Typography variant="body1" paragraph>
                    Please note that COVIDCare contains sensitive patient data and is designed for authorized personnel only.
                </Typography>
                <Typography variant="body1" paragraph>
                    <address>
                        Health Insurance Fund<br />
                        123 Secure Data Avenue<br />
                        City, State 12345<br />
                        <a href="tel:+1234567890">(123) 456-7890</a>
                    </address>
                </Typography>
                <Typography variant="body1" paragraph>
                    System Administrator: Israel Israeli
                </Typography>
                <footer>
                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h6" color="primary">Employee Login</Typography>
                    </Link>
                </footer>
            </Paper>
        </Container>
    );
};

export default Public;
