import React, { useState, useEffect } from "react";
import { useUpdateClientMutation, useDeleteClientMutation } from "./clientsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash , faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import * as yup from 'yup';
import useAuth from "../../hooks/useAuth"; // Only admin and manger can delete clients

const EditClientForm = ({ client }) => {
  const [updateClient, { isLoading: updatingLoading, isSuccess: updateSuccess, isError: updateError, error: updateErrorData }] = useUpdateClientMutation();
  const [deleteClient, {  isSuccess: deleteSuccess, isError: deleteError, error: deleteErrorData }] = useDeleteClientMutation();
  const nav = useNavigate();
  const {isManager, isAdmin} = useAuth(); 
  const [clientData, setClientData] = useState({
    ...client
  });

  useEffect(() => {
    if (updateSuccess) {
      nav(`/dash/clients/${client.id}`); // Comeback to the client info
    }
    if (deleteSuccess) {
      nav(`/dash/clients`); // Comeback to the client info
    }
  }, [updateSuccess,deleteSuccess, nav]);

  const validationSchema = yup.object().shape({
    clientName: yup.string().matches(/^[\p{L}\s]+$/u, 'Name can only contain letters and spaces.').required(),
    clientLastName: yup.string().matches(/^[\p{L}\s]+$/u, 'Name can only contain letters and spaces.').required(),
    email: yup.string().email().required(),
    cellPhoneNumber: yup.string().matches(/^\d{10}$/, 'Cell Phone Number must be a string of ten digits.').required(),
    telephoneNumber: yup.string().matches(/^\d{9}$/, 'Telephone Number must be a string of nine digits.').required(),
    birthDate: yup.date().required().test('is-older-than-today', 'Date must be in the past (not before 1904)', function(value) {
      // Ensure the date is in the past
      if (!value) return false; // If no date is provided, fail validation
      const minDate = new Date('1904-01-01');
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set current time to midnight
      return value >= minDate && value <= today;
    })

  });
  //
  const validationAdressSchema = yup.object().shape({
    city: yup.string().matches(/^[\p{L}\s]+$/u, 'City can only contain letters and spaces.').required(),
    street: yup.string().matches(/^[\p{L}\s]+$/u, 'Street can only contain letters and spaces.').required(),
    house_number: yup.string().matches(/^\d{1,3}$/, 'House Number must be a string of 1 to 3 digits.').required()
  })
  const [errors, setErrors] = useState({});
  const [errorsA, setErrorsA] = useState({});

  const handleChange = async (e) => {
    const { name, value } = e.target;

    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors({ ...errors, [name]: '' });
    } catch (error) {
      setErrors({ ...errors, [name]: error.message });
    }

    setClientData({
      ...clientData,
      [name]: value
    });
  };
  // 
  const handleAdressChange = async (e) => {
    const { name, value } = e.target;
    
      const [parent, child] = name.split('.');

      try {
        await validationAdressSchema.validateAt(child, { [child]: value });
        setErrorsA({ ...errorsA, [child]: '' })
      } catch (error) {
        setErrorsA({ ...errorsA, [child]: error.message });
      }

      setClientData({
        ...clientData,
        address: {
          ...clientData.address,
          [child]: value
        }
      });
      
  };
  // Check if there are any errors
  const goSave = !Object.values(errors).some(error => error !== '') && !updatingLoading && !Object.values(errorsA).some(error => error !== '' );

  const onSaveClientClicked = async (e) => {
    e.preventDefault();

    if (goSave) {
      await updateClient(clientData);
    }
  };

  const onDeleteClientClicked = async () => {
    await deleteClient({id: client.id});
    nav(`/dash/clients`);
  };
  const onBackClientClicked = () => nav(`/dash/clients/${client.id}`);  // Comeback to the client info 

  const errClass = (updateError || deleteError) ? "errmsg" : "offscreen";
  const errorContent = updateErrorData?.message || deleteErrorData?.message;

  const content = (
    <>
      <p className={errClass}>{errorContent}</p>
      <form className="General_Form" onSubmit={onSaveClientClicked}>
        <div className="General_Form__title-row">
          <h2>Edit Client</h2>
          <div className="General_Form__action-buttons">
            {goSave && (
              <button
                className="icon-button"
                title="Save"
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
            )}

            {(isAdmin || isManager) && (
              <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteClientClicked}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}

            <button
              className="icon-button"
              title="Back"
              onClick={onBackClientClicked}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>
        </div>

        <label className="General_Form__label" htmlFor="clientName">Client Name:</label>
        <input
          className={`General_Form__input`}
          id="clientName"
          name="clientName"
          type="text"
          value={clientData.clientName}
          onChange={handleChange}
        />
        {errors.clientName && <span className="error-message">{errors.clientName}</span>}

        <label className="General_Form__label" htmlFor="clientLastName">Client Name:</label>
        <input
          className={`General_Form__input`}
          id="clientLastName"
          name="clientLastName"
          type="text"
          value={clientData.clientLastName}
          onChange={handleChange}
        />
        {errors.clientLastName && <span className="error-message">{errors.clientLastName}</span>}

        <label className="General_Form__label" htmlFor="email">Email:</label>
        <input
          className={`General_Form__input`}
          id="email"
          name="email"
          type="email"
          value={clientData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}

        <label className="General_Form__label" htmlFor="cellPhoneNumber">Cell Phone Number:</label>
        <input
          className={`General_Form__input`}
          id="cellPhoneNumber"
          name="cellPhoneNumber"
          type="text"
          value={clientData.cellPhoneNumber}
          onChange={handleChange}
        />
        {errors.cellPhoneNumber && <span className="error-message">{errors.cellPhoneNumber}</span>}

        <label className="General_Form__label" htmlFor="telephoneNumber">Telephone Number:</label>
        <input
          className={`General_Form__input`}
          id="telephoneNumber"
          name="telephoneNumber"
          type="text"
          value={clientData.telephoneNumber}
          onChange={handleChange}
        />
        {errors.telephoneNumber && <span className="error-message">{errors.telephoneNumber}</span>}

        <label className="General_Form__label" htmlFor="city">City:</label>
        <input
          className={`General_Form__input`}
          id="city"
          name="address.city"
          type="text"
          value={clientData.address.city}
          onChange={handleAdressChange}
        />
        {errorsA.city && <span className="error-message"  >{errorsA.city}</span>}

        <label className="General_Form__label" htmlFor="street">Street:</label>
        <input
          className={`General_Form__input`}
          id="street"
          name="address.street"
          type="text"
          value={clientData.address.street}
          onChange={handleAdressChange}
        />
        {errorsA.street && <span className="error-message"  >{errorsA.street}</span>}

        <label className="General_Form__label" htmlFor="houseNumber">House Number:</label>
        <input
          className={`General_Form__input`}
          id="houseNumber"
          name="address.house_number"
          type="text"
          value={clientData.address.house_number}
          onChange={handleAdressChange}
        />
        {errorsA.house_number && <span className="error-message"  >{errorsA.house_number}</span>}
              {/* I dont want to update birth day */}
        {/* <label className="General_Form__label" htmlFor="birthDate">Birth Date:</label>
        <input
          className={`General_Form__input`}
          id="birthDate"
          name="birthDate"
          type="date"
          value={clientData.birthDate}
          onChange={handleChange}
        />
                {errors.birthDate && <span className="error-message">{errors.birthDate}</span>} */}
      </form>
    </>
  );

  return content;
}

export default EditClientForm;

