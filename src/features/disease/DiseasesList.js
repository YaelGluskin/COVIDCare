import { useGetDiseasesQuery } from "./diseasesApiSlice"
import Disease from "./Disease"; // Import the Disease component
const DiseasesList = () => {
    const {
        data: diseases, // Rename 'data' to 'diseases' for clarity
        isLoading,
        isSuccess,
        isError,
        error  
     } = useGetDiseasesQuery(
        undefined, {
            pollingInterval: 60000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        });
    
     let content // Define content variable to render based on loading and success states
     if(isLoading) content = <p>Louding diseases...</p>// Display loading message while fetching data
     // Display error message if fetching data results in an error
     if(isError) content = (<p className="errmsg">{error?.data?.message}</p>

     )
    
     if (isSuccess) { // If data fetching is successful, render the diseases list table
         const { ids } = diseases // Generate table rows for each disease
         const tableContent = ids?.length // It has to have a key
             ? ids.map(diseaseId => <Disease key={diseaseId} diseaseId={diseaseId} />)
             : null
 
         content = ( // Render the diseases list table
        
             <table className="tableV table--diseases">
                 <thead className="table__thead">
                     <tr>
                         <th scope="col" className="table__th disease__diseasename">Date of receiving a positive result</th>
                         <th scope="col" className="table__th disease__roles">Date of recovery</th>
                         <th scope="col" className="table__th disease__edit">Client name and ID</th>
                         <th scope="col" className="table__th disease__edit">Edit</th>
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
export default DiseasesList