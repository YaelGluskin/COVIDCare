import { useSelector } from 'react-redux'
import { selectAllClients} from '../clients/clientsApiSlice'
import NewVaccineForm from './NewVaccineForm'

const NewVaccine = ({ clientId }) => {
  const clients = useSelector(selectAllClients) // Select all clients from the Redux store
  if (!clients?.length) return <p>Not Currently Available</p>

  const content = <NewVaccineForm users={clientId} />
  return content
}

export default NewVaccine