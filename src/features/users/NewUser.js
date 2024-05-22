import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import {USER_REGEX, PWD_REGEX}  from "../../config/pwd"

const NewUser = () => {
  // Unlike a query, It is called when we calle it (and not immediately)
  // addNewUser - Gives an add new user fnction
  const [addNewUser, 
    // Deliver the status after call to the func
    {isLoauding, isSuccess, isError, err}] = useAddNewUserMutation();
  const nav = useNavigate();

  const [username, setUsername] = useState('') // 
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(["Employee"])

  useEffect(() => { 
    setValidUsername(USER_REGEX.test(username)) 
  }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            nav('/dash/users') // Otherwith a warning
        }
    }, [isSuccess, nav])

  const onPwdChanged = e => setPassword(e.target.value)  
  const onNameChanged = e => setUsername(e.target.value)
  const onRolesChanged = e => {
    // Allowes more than one option to be selected
    const values = Array.from( // The array takes the values, and create an array stored in values        
      e.target.selectedOptions, (option) => option.value )
    setRoles(values) // Set the roles to the values
  }
  // Set all to boolean by sticking all to the array 'goSave', it will be true if we are not louding
  const goSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoauding;

  const onSaveUserClicked = async (e) => {
    e.preventDefault()
    if (goSave) {
        await addNewUser({ username, password, roles }) // Call to addNewUser and sent the 3 elements.
    }
  } 

  const options = Object.values(ROLES).map(role => {
    return ( <option key={role} value={role} > {role} </option > )
  })

  // Classes for no apply
  const errClass = isError ? "errmsg" : "offscreen"
  const validUserClass = !validUsername ? 'form__input--incomplete' : ''
  const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
  const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : '' // If Yes, we didnt aplly nothing

  let content = (
    <>
      {/* If errors accur, the mesgge from the back-end will display*/}
      <p className={errClass}>{err?.data?.message}</p> 
      <form className="General_Form" onSubmit={onSaveUserClicked}>
        <div className="General_Form__title-row">
          <h2>New User</h2>
          <div className="General_Form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!goSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="General_Form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`General_Form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onNameChanged}
        />

        <label className="General_Form__label" htmlFor="password">
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`General_Form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPwdChanged}
        />

        <label className="General_Form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select id="roles" name="roles"
          className={`General_Form__select ${validRolesClass}`}
          multiple={true} size="3" value={roles}
          onChange={onRolesChanged} >
          {options}
        </select>
      </form>

    </>
  )

  return content;
}

export default NewUser
