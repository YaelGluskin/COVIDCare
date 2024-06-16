import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectVaccineById } from './vaccinesApiSlice';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

// Style for the TableRow
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Vaccine = ({ vaccineId }) => {
    const vaccine = useSelector(state => selectVaccineById(state, vaccineId)); 
    const navigate = useNavigate(); 
    
    if (vaccine) { 
        const handleEdit = () => navigate(`/dash/vaccines/${vaccineId}`);
        const vaccineDate = new Date(vaccine.date).toLocaleString('en-IL', { day: 'numeric', month: 'long', year: 'numeric' });

        return ( 
            <StyledTableRow>
                <TableCell>{vaccineDate}</TableCell>
                <TableCell>{vaccine.name}</TableCell>
                <TableCell>
                    <div>{vaccine.clientName} {vaccine.clientLastName}</div>
                    <div>id: {vaccine.clientID}</div>
                </TableCell>
                <TableCell>
                    <IconButton
                        color="primary"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </IconButton>
                </TableCell>
            </StyledTableRow>
        );
    } else {
        return null;
    }
};

export default Vaccine;
