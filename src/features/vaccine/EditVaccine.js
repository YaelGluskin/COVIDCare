import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectVaccineById } from './vaccinesApiSlice'
import { selectAllClients } from '../clients/clientsApiSlice'
import EditVaccineForm from './EditVaccineForm'

const EditVaccine = () => {
  const { id } = useParams() // Get the vaccine ID from the route parameters
  const vaccine = useSelector(state => selectVaccineById(state, id))// Select vaccine by ID from the Redux store
  // Select all clients from the Redux store
  const clients = useSelector(selectAllClients)
  // Render EditVaccineForm with vaccine and clients data if available, otherwise show loading message
  const content = vaccine && clients ? <EditVaccineForm vaccine={vaccine} clients={clients} /> : <p>Loading...</p>
  return content

}

export default EditVaccine