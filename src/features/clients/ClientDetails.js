import{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectClientById } from './clientsApiSlice';
import { selectAllVaccines } from '../vaccine/vaccinesApiSlice';
import { selectAllDiseases } from '../disease/diseasesApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faArrowLeft} from "@fortawesome/free-solid-svg-icons";

import {useClientDataQuery}  from '../../hooks/useClientDataQuery';

 const ClientDetails = ({ initialClientId }) => {

  const { } = useClientDataQuery(); // Fetching data

    const [clientId, setClientId] = useState(initialClientId);
    const client = useSelector(state => selectClientById(state, clientId));
    const navigate = useNavigate();
    
    const allVaccines = useSelector(selectAllVaccines);
    const [vaccines, setVaccines] = useState([]);

    const allDiseases = useSelector(selectAllDiseases);
    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
        if (client && allVaccines) {
            const clientVaccines = allVaccines.filter(vaccine => vaccine.client === clientId);
            setVaccines(clientVaccines);
        }
    }, [clientId, client, allVaccines]);

    useEffect(() => {
        if (client && allDiseases) {
            const clientDisease = allDiseases.filter(disease => disease.client === clientId);
            setDiseases(clientDisease);
        }
    }, [clientId, client, allDiseases]);
    

    if (!client) return null;

    const handleEdit = () => navigate(`/dash/clients/${clientId}/edit`);

    const handleNewVac = () => navigate(`/dash/clients/${clientId}/newVac`);
    // const handleEditVac = ({client,id}) => navigate(`/dash/vaccines/${clientId}/edit`);
    const handleNewDis = () => navigate(`/dash/clients/${clientId}/newDis`);
    // const handleEditDis = ({clientId}) => navigate(`/dash/diseases/${clientId}`);
    // Work
    const handleEditVaccine = (vaccineId) => { navigate(`/dash/vaccines/${vaccineId}`) };
    const handleEditDisease = (diseaseId) => { navigate(`/dash/diseases/${diseaseId}`) };
    const onBackClientClicked = () => navigate(`/dash/clients`);





    return (
        <div className="client-details-container">
          <h2>Client Details</h2>
          <div className="General_Form__action-buttons">
          <button
              className="icon-button"
              title="Edit"
              onClick={handleEdit}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>

          <button
              className="icon-button"
              title="Back"
              onClick={onBackClientClicked}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>

          <div className="client-details">
            <div className="detail">
              <span className="label">Client Name:</span>
              <span className="value">{client.clientName} {client.clientLastName}</span>
            </div>
            
            <div className="detail">
              <span className="label">Client ID:</span>
              <span className="value">{client.clientID}</span>
            </div>
            <div className="detail">
              <span className="label">Email:</span>
              <span className="value">{client.email}</span>
            </div>
            <div className="detail">
              <span className="label">Cell Phone Number:</span>
              <span className="value">{client.cellPhoneNumber}</span>
            </div>
            <div className="detail">
              <span className="label">Telephone Number:</span>
              <span className="value">{client.telephoneNumber}</span>
            </div>
            <div className="detail">
              <span className="label">Address:</span>
              <span className="value">{client.address.street}, {client.address.city}, {client.address.house_number}</span>
            </div>
            <div className="detail">
              <span className="label">Birth Date:</span>
              <span className="value">{new Date(client.birthDate).toLocaleDateString()}</span>
            </div>
            <div className="detail">
              <span className="label">Number of Vaccines:</span>
              <span className="value">{client.nunOfVaccine}</span>
            </div>
          </div>

          {(client.nunOfVaccine !== 0) &&(
            <ul>
                {vaccines.map(vaccine => (
                    <li key={vaccine.id}>
                        Date:{new Date(vaccine.date).toLocaleDateString()}, Name: {vaccine.name}
                        <button onClick={() => handleEditVaccine(vaccine.id)}>Edit Vaccine</button>
                    </li>
                ))}
            </ul>
          )}
          {(client.nunOfVaccine !== 4)&& (
            <button  onClick={handleNewVac}>
            Add new Vaccine
          </button>
          )}
            

            
            {diseases.length > 0 ? (
                <div>
                    <h3>Details of the client's covid disease</h3>
                    <ul>
                        {diseases.map(disease => (
                            <li key={disease.id}>
                                Date Positive: {new Date(disease.datePositive).toLocaleDateString()},
                                Date Recovery: {disease.dateRecovery ? new Date(disease.dateRecovery).toLocaleDateString() : 'Not recovered yet'}
                                <br></br>
                                <button onClick={() => handleEditDisease(disease.id)}>Edit Disease</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
              <div>
                <h3>The client did not had covid</h3>
                <br></br>
                <button onClick={() => handleNewDis(client.id)}>Add Disease</button>
                </div>
            )}

          
          
                
        </div>
      );
      
}

export default ClientDetails;
