import { useGetUsersQuery } from "./usersApiSlice"
import User from "./User"; // Import the User component'
// import { useNavigate } from "react-router-dom";

const UsersList = () => { // Component for displaying a list of users
    const {
       data: users, // Rename 'data' to 'users' for clarity
       isLoading,
       isSuccess,
       isError,
       error  
    } = useGetUsersQuery(
        undefined, {
            pollingInterval: 60000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
    });
    // const navigate = useNavigate()  // I add a new buttom in the headfooter
    // const handleNav = () => navigate(`/dash/users/new`);
    let content // Define content variable to render based on loading and success states
    if(isLoading) content = <p>Louding users...</p>// Display loading message while fetching data
    // Display error message if fetching data results in an error
    if(isError) content = <p className="errmsg">{error?.data?.message}</p>
    if (isSuccess) { // If data fetching is successful, render the users list table
        const { ids } = users // Generate table rows for each user
        const tableContent = ids?.length // It has to have a key
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = ( // Render the users list table 
            <div>
                <table className="table table--users">
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th user__username">Username</th>
                            <th scope="col" className="table__th user__roles">Roles</th>
                            <th scope="col" className="table__th user__edit">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
                {/* <button className="icon-button" title="Add new" onClick={handleNav} >  Add </button> */}
            </div>
        )
    }

    return content // Render the content based on the current state
}
export default UsersList


