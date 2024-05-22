import { useSelector } from 'react-redux'
import { selectAllClients} from '../clients/clientsApiSlice'
import NewDiseaseForm from './NewDiseaseForm'

const NewDisease = () => { // Component for creating a new disease
  const clients = useSelector(selectAllClients) // Select all clients from the Redux store
  if (!clients?.length) return <p>Not Currently Available</p>
  const content = clients? <NewDiseaseForm users={clients} /> : <p>Loading...</p>
  return content
}

export default NewDisease