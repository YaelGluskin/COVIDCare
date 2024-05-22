import { useGetVaccinesQuery } from "./vaccinesApiSlice"
import Vaccine from "./Vaccine"; // Import the Vaccine component

const VaccinesList = () => {
    const {
        data: vaccines, // Rename 'data' to 'vaccines' for clarity
        isLoading,
        isSuccess,
        isError,
        error  
     } = useGetVaccinesQuery(
        'VaccinesList', {
            pollingInterval: 60000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        });
     
 
     let content // Define content variable to render based on loading and success states     
     if(isLoading) content = <p>Louding vaccines...</p>// Display loading message while fetching data
     // Display error message if fetching data results in an error
     if(isError) content = <p className="errmsg">{error?.data?.message}</p>
     if (isSuccess) { // If data fetching is successful, render the vaccines list table
         const { ids } = vaccines // Generate table rows for each vaccine
         const tableContent = ids?.length // It has to have a key
             ? ids.map(vaccineId => <Vaccine key={vaccineId} vaccineId={vaccineId} />)
             : null
 
         content = ( // Render the vaccines list table
            
             <table className="tableV table--vaccines">
                 <thead className="table__thead">
                     <tr>
                         <th scope="col" className="table__th vaccine__vaccinename">Vaccine Date</th>
                         <th scope="col" className="table__th vaccine__roles">Vaccine Name</th>
                         <th scope="col" className="table__th vaccine__edit">Client INFO</th>
                         <th scope="col" className="table__th vaccine__edit">Edit</th>
                     </tr>
                 </thead>
                 <tbody>
                     {tableContent}
                 </tbody>
             </table>
             
            
         )
     }
    return content // Render the content based on the current state
}
export default VaccinesList