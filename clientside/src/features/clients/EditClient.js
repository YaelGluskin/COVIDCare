import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectClientById } from "./clientsApiSlice"
import EditClientForm from './EditClientForm'

const EditClient = () => {
  const {id} =useParams()
  const client = useSelector(state => selectClientById(state, id))
  console.log(client)
  const content =client? <EditClientForm client={client} /> :<p> Louding ...</p>
  return content;
}

export default EditClient