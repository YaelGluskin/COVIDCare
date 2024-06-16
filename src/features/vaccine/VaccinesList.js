import { useGetVaccinesQuery } from "./vaccinesApiSlice";
import Vaccine from "./Vaccine"; // Import the Vaccine component
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, CircularProgress } from '@mui/material';

const VaccinesList = () => {
    const {
        data: vaccines, // Rename 'data' to 'vaccines' for clarity
        isLoading,
        isSuccess,
        isError,
        error  
     } = useGetVaccinesQuery('VaccinesList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
 
    let content; // Define content variable to render based on loading and success states     

    if (isLoading) content = <CircularProgress />; // Display loading spinner while fetching data

    if (isError) content = <Typography color="error">{error?.data?.message}</Typography>; // Display error message if fetching data results in an error

    if (isSuccess) { // If data fetching is successful, render the vaccines list table
        const { ids } = vaccines; // Generate table rows for each vaccine
        const tableContent = ids?.length // It has to have a key
            ? ids.map(vaccineId => <Vaccine key={vaccineId} vaccineId={vaccineId} />)
            : null;

        content = ( // Render the vaccines list table
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
        );
    }

    return content; // Render the content based on the current state
}

export default VaccinesList;
