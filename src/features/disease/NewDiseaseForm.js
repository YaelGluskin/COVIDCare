import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { useAddNewDiseaseMutation } from "./diseasesApiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useDateValidation } from '../../hooks/useDateValidation'

// Define a functional component called NewDiseaseForm
const NewDiseaseForm = () => {
    
    const { id } = useParams() // Get the disease ID from the route parameters
    
    // Custom hook to add a new disease mutation
    const [addNewDisease, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewDiseaseMutation();

    // Hook for navigation
    const nav = useNavigate();

    // State variables to store positive date, recovery date, and client ID
    const [datePositive, setDatePositive] = useDateValidation();// useState('');
    const [dateRecovery, setDateRecovery] = useDateValidation();// useState('');
   
    // Effect hook to navigate to the diseases page after successful addition of a new disease
    useEffect(() => {
        if (isSuccess) {
            setDatePositive('');
            setDateRecovery('');
            nav('/dash/diseases');
        }
    }, [isSuccess, nav]);

    //
    
    
    // Event handlers for input changes
    const onPosChanged = e => setDatePositive(e.target.value);
    const onRecChanged = e => setDateRecovery(e.target.value);
    const onBackClientClicked = () => nav(`/dash/${id}`);
    

    // Check if all required fields are filled and the form is not loading
    const canSave = [datePositive, dateRecovery].every(Boolean) && !isLoading;


    // Function to handle saving of a new disease
    const onSaveDiseaseClicked = async (e) => {
        e.preventDefault();

        // Check if recovery date is at least 10 days after positive date
        const positiveDateObj = new Date(datePositive);
        const recoveryDateObj = new Date(dateRecovery);

        const timeDiff = recoveryDateObj.getTime() - positiveDateObj.getTime();
        const diffDays = timeDiff / (1000 * 60 * 60 * 24);
        
        if (diffDays < 10) {
            alert("Recovery date must be at least 10 days after the diagnose date.");
            return;
        }

        // If all conditions are met, add the new disease
        if (canSave) {
            await addNewDisease({ client: id, datePositive, dateRecovery });
        }
    };

    // Determine error class based on whether there is an error
    const errClass = isError ? "errmsg" : "offscreen";
    // Determine CSS classes for input validation
    const validPosClass = !datePositive ? "form__input--incomplete" : '';
    const validRecClass = !dateRecovery ? "form__input--incomplete" : '';

    // JSX content for the form
    const content = (
        <>
            {/* Display error message if there is an error */}
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveDiseaseClicked}>
                <div className="form__title-row">
                    {/* Form title and save button */}
                    <h2>New Disease</h2>
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
                    Date of receiving a positive result:</label>
                <input
                    className={`form__input ${validPosClass}`}
                    id="title"
                    name="title"
                    type="date"
                    autoComplete="off"
                    value={datePositive}
                    onChange={onPosChanged}
                />

                {/* Input field for recovery date */}
                <label className="form__label" htmlFor="text">
                    Date of recovery:</label>
                <input
                    className={`form__input form__input--text ${validRecClass}`}
                    id="text"
                    name="text"
                    type="date"
                    value={dateRecovery}
                    onChange={onRecChanged}
                />


            </form>
        </>
    );

    // Return JSX content
    return content;
};

export default NewDiseaseForm;
