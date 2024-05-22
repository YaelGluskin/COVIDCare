import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectDiseaseById } from './diseasesApiSlice'
import { selectAllClients } from '../clients/clientsApiSlice'
import EditDiseaseForm from './EditDiseaseForm'

const EditDisease = () => { // Component for editing a disease
  const { id } = useParams() // Get the disease ID from the route parameters
  
  const disease = useSelector(state => selectDiseaseById(state, id))// Select disease by ID from the Redux store
  // Select all clients from the Redux store
  const clients = useSelector(selectAllClients)
  // Render EditDiseaseForm with disease and clients data if available, otherwise show loading message
  const content = disease && clients ? <EditDiseaseForm disease={disease} clients={clients} /> : <p>Loading...</p>

  return content
}

export default EditDisease