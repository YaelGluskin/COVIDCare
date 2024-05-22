import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateVaccineMutation, useDeleteVaccineMutation } from "./vaccinesApiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan , faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { useDateValidation } from '../../hooks/useDateValidation';

// Define a functional component called EditVaccineForm
const EditVaccineForm = ({ vaccine, clients }) => {
    // Mutation hook for updating vaccine
    const [updateVaccine, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateVaccineMutation();

    // Mutation hook for deleting vaccine
    const [deleteVaccine, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteVaccineMutation();

    // Hook for navigation
    const navigate = useNavigate();

    // State variables to store vaccine date and name
    const [date, setDate] = useDateValidation();// useState('');
    const [name, setName] = useState('');

    // Effect hook to navigate to the vaccines page after successful addition of a new vaccine or deletion
    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            navigate(-1); 
        }
    }, [isSuccess, isDelSuccess, navigate]);

    // Function to handle saving of edited vaccine
    const onSaveVaccineClicked = async () => {
        // Get today's date
        /*
        const today = new Date();
        const todayFormatted = today.toISOString().split('T')[0];

        // Check if the vaccine date is in the future
        if (date > todayFormatted ) {
            // If the date is in the future, show an error message
            alert("Please enter a valid date, up to the present.");
            return;
        }*/
        
        // Update the vaccine with new dates
        await updateVaccine({ 
            id: vaccine.id, 
            date: date || vaccine.date,
            name: name || vaccine.name
        });
    };

    // Function to handle deletion of a vaccine
    const onDeleteVaccineClicked = async () => {
        // Delete the vaccine by its ID
        await deleteVaccine({ id: vaccine.id });
    };
    const onBackClientClicked = () => navigate(-1);
    // Determine error class based on whether there is an error in updating or deleting
    const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
    // Combine error messages from both update and delete operations
    const errContent = (error?.data?.message || delerror?.data?.message) ?? '';

    // JSX content for the edit vaccine form
    return (
        <>
            {/* Display error message if there is an error in updating or deleting */}
            <p className={errClass}>{errContent}</p>

            <div className="form">
                <div className="form__title-row">
                    {/* Form title and action buttons */}
                    <h2>Edit Vaccine </h2>
                    <div className="form__action-buttons">
                        {/* Save button */}
                         {/* Conditional rendering of the save button */}
                        {(date || name) && (
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveVaccineClicked}
                            disabled={isLoading}
                            value={new Date(vaccine.date).toLocaleDateString()}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        )}
                        {/* Delete button */}
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteVaccineClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>

                        <button
                        className="icon-button"
                        title="Back"
                        onClick={onBackClientClicked}  >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </div>
                </div>
                {/* Input field for vaccine date */}
                <label className="form__label" htmlFor="date">
                    Date of receiving Vaccine:
                </label>
                <input
                    className="form__input"
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                {/* Input field for vaccine name */}
                <label className="form__label" htmlFor="vaccine-name">
                    Name Of Vaccine:
                </label>
                <input
                    className="form__input"
                    id="vaccine-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            {/* Display current date and vaccine name */}
            <div className="form__divider">
                    <p className="form__positive">Current Date:<br />{new Date(vaccine.date).toLocaleDateString()}</p>
                    <p className="form__updated">Current Name:<br />{vaccine.name}</p>
                </div>
        </>
    );
};

// Export the EditVaccineForm component as default
export default EditVaccineForm;
