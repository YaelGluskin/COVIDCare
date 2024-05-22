import React, {useEffect } from "react";
import { useUpdateDiseaseMutation, useDeleteDiseaseMutation } from "./diseasesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDateValidation } from '../../hooks/useDateValidation' // Date validation

// Define a functional component called EditDiseaseForm
const EditDiseaseForm = ({ disease, clients }) => {
    // Mutation hook for updating disease
    const [updateDisease, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateDiseaseMutation();

    // Mutation hook for deleting disease
    const [deleteDisease, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteDiseaseMutation();

    // Hook for navigation
    const navigate = useNavigate();

    // State variables to store positive date and recovery date
    const [positiveDate, setPositiveDate] = useDateValidation(); //useState('');
    const [recoveryDate, setRecoveryDate] = useDateValidation(); // useState('');

    // Effect hook to navigate to the diseases page after successful addition of a new disease or deletion
    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            navigate(-1);
        }
    }, [isSuccess, isDelSuccess, navigate]);

    // Function to handle saving of edited disease
    const onSaveDiseaseClicked = async () => {
        // Get today's date
        const today = new Date();
        const todayFormatted = today.toISOString().split('T')[0];

        // Check if positiveDate or recoveryDate is in the future
        if (positiveDate > todayFormatted || recoveryDate > todayFormatted) {
            // If any date is in the future, show an error message
            alert("Please enter a valid date, up to the present.");
            return;
        }

        // Convert positiveDate and recoveryDate to Date objects
        const positiveDateTime = new Date(positiveDate).getTime();
        const recoveryDateTime = new Date(recoveryDate).getTime();

        // Calculate the difference in milliseconds
        const differenceInMs = recoveryDateTime - positiveDateTime;

        // Calculate the difference in days
        const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

        // Check if the difference is at least 10 days
        if (differenceInDays < 10) {
            alert("Recovery date must be at least 10 days after the positive date.");
            return;
        }

        // Update the disease with new dates
        await updateDisease({ 
            id: disease.id, 
            datePositive: positiveDate || disease.datePositive,
            dateRecovery: recoveryDate || disease.dateRecovery
        });
    };

    // Function to handle deletion of a disease
    const onDeleteDiseaseClicked = async () => {
        // Delete the disease by its ID
        await deleteDisease({ id: disease.id });
    };
    const onBackClientClicked = () => navigate(-1);
    // Determine error class based on whether there is an error in updating or deleting
    const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
    // Combine error messages from both update and delete operations
    const errContent = (error?.data?.message || delerror?.data?.message) ?? '';

    // JSX content for the edit disease form
    return (
        <>
            {/* Display error message if there is an error in updating or deleting */}
            <p className={errClass}>{errContent}</p>

            <div className="form">
                <div className="form__title-row">
                    {/* Form title and action buttons */}
                    <h2>Edit Disease </h2>
                    <div className="form__action-buttons">
                        {/* Save button */}
                        {(recoveryDate || positiveDate) && (
                            <button
                                className="icon-button"
                                title="Save"
                                onClick={onSaveDiseaseClicked}
                                disabled={isLoading}
                                value={new Date(disease.datePositive).toLocaleDateString()}
                            >
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                        )}
                        {/* Delete button */}
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteDiseaseClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        <button className="icon-button" title="Back" onClick={onBackClientClicked}  >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
         
                    </div>
                </div>
                {/* Input field for positive date */}
                <label className="form__label" htmlFor="positive-date">
                    Date of receiving a positive result:
                </label>
                <input
                    className="form__input"
                    id="positive-date"
                    type="date"
                    value={positiveDate}
                    onChange={(e) => setPositiveDate(e.target.value)}
                />
                {/* Input field for recovery date */}
                <label className="form__label" htmlFor="recovery-date">
                    Date of recovery:
                </label>
                <input
                    className="form__input"
                    id="recovery-date"
                    type="date"
                    value={recoveryDate}
                    onChange={(e) => setRecoveryDate(e.target.value)}
                />
                {/* Divider section to display current dates */}
                <div className="form__divider">
                    <p className="form__positive">Current Date of receiving a positive result:<br />{new Date(disease.datePositive).toLocaleDateString()}</p>
                    <p className="form__updated">Current Date of recovery:<br />{new Date(disease.dateRecovery).toLocaleDateString()}</p>
                </div>
            </div>
        </>
    );
};

// Export the EditDiseaseForm component as default
export default EditDiseaseForm;
