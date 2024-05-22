
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectClientById } from "./clientsApiSlice"
import ClientDetails from './ClientDetails'

const ClientData = () => {
  const {id} = useParams()
  const client = useSelector(state => selectClientById(state, id))
  const content = client ? <ClientDetails key={client.id} initialClientId={client.id} /> : <p>Loading...</p>
  return content;
}

export default ClientData;
