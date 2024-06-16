import { useGetVaccinesQuery } from "./vaccinesApiSlice";
import Vaccine from "./Vaccine"; 
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, CircularProgress, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled component for the table container
const StyledPaper = styled(Paper)(({ theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const VaccinesList = () => {
    const {
        data: vaccines, 
        isLoading,
        isSuccess,
        isError,
        error  
     } = useGetVaccinesQuery('VaccinesList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content; 

    if (isLoading) content = <CircularProgress />;

    if (isError) content = <Typography color="error">{error?.data?.message}</Typography>;

    if (isSuccess) { 
        const { ids } = vaccines; 
        const tableContent = ids?.length 
            ? ids.map(vaccineId => <Vaccine key={vaccineId} vaccineId={vaccineId} />)
            : null;

        content = ( 
            <StyledPaper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Vaccine Date</TableCell>
                            <TableCell>Vaccine Name</TableCell>
                            <TableCell>Client INFO</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableContent}
                    </TableBody>
                </Table>
            </StyledPaper>
        );
    }

    return content; 
}

export default VaccinesList;
