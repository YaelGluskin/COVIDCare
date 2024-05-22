import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { useAddNewVaccineMutation} from "./vaccinesApiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave , faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { useDateValidation } from '../../hooks/useDateValidation'

// Define a functional component called NewVaccineForm
const NewVaccineForm = ({ clientId }) => {
    const { id } = useParams() // Get the disease ID from the route parameters
    const [addNewVaccine, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewVaccineMutation();

    // Hook for navigation
    const nav = useNavigate();
    // State variables to store positive date, recovery date, and client ID
    const [date, setDate] = useDateValidation(); //useState('');
    const [name, setName] = useState('');
    
    
    // Effect hook to navigate to the vaccines page after successful addition of a new vaccine
    useEffect(() => {
        if (isSuccess) {
            setDate('');
            setName('');           
            nav(`/dash/clients/${id}`);
        }
    }, [isSuccess, nav]);

    // Event handlers for input changes
    const onDateChanged = e => setDate(e.target.value);
    const onNameChanged = e => setName(e.target.value);
    
    const onBackClientClicked = () => nav(`/dash/clients/${id}`);

    // Check if all required fields are filled and the form is not loading
    const canSave = [date, name].every(Boolean) && !isLoading;

    // Function to handle saving of a new vaccine
    const onSaveVaccineClicked = async (e) => {
        e.preventDefault();
            /*
        // Get today's date
        const today = new Date();
        const todayFormatted = today.toISOString().split('T')[0];

        // Check if the entered date is in the future
        if (date > todayFormatted ) {
            alert("Please enter a valid date, up to the present.");
            return;
        }*/
        
        
        // Check if the client has received more than three vaccinations
        if(id.nunOfVaccine > 3) { 
            alert("The client has already received four vaccinations.");
            return;
        }

        // If all conditions are met, add the new vaccine
        if (canSave) {
            await addNewVaccine({ client: id, date, name });
        }
    };

    // Determine error class based on whether there is an error
    const errClass = isError ? "errmsg" : "offscreen";
    // Determine CSS classes for input validation
    const validDateClass = !date ? "form__input--incomplete" : '';
    const validNameClass = !name ? "form__input--incomplete" : '';

    // JSX content for the form
    const content = (
        <>
            {/* Display error message if there is an error */}
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveVaccineClicked}>
                <div className="form__title-row">
                    <h1>{id.clientName} </h1>
                    {/* Form title and save button */}
                    <h2>New Vaccine</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>

                        <button
                            className="icon-button"
                            title="Back"
                            onClick={onBackClientClicked}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </div>
                </div>
                {/* Input field for positive date */}
                <label className="form__label" htmlFor="title">
                    Date of receiving Vaccine:</label>
                <input
                    className={`form__input ${validDateClass}`}
                    id="title"
                    name="title"
                    type="date"
                    autoComplete="off"
                    value={date}
                    onChange={onDateChanged}
                />

                {/* Input field for vaccine name */}
                <label className="form__label" htmlFor="text">
                    Name Of Vaccine:</label>
                <input
                    className={`form__input form__input--text ${validNameClass}`}
                    id="text"
                    name="text"
                    type="text"
                    value={name}
                    onChange={onNameChanged}
                />

                
               
            </form>
        </>
    );

    // Return JSX content
    return content;
};

export default NewVaccineForm;
