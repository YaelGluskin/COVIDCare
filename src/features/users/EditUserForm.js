import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation} from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import {USER_REGEX, PWD_REGEX}  from "../../config/pwd"

const EditUserForm = ({user}) => {
    const [updateUser, 
        // Deliver the status after call to the func
        {isLoauding, isSuccess, isError, err
        }] = useUpdateUserMutation();

    const [deleteUser,{
        isSuccess: isDeleteSuccess ,
        isError: isDeleteError, 
        err: deleteError
    }] = useDeleteUserMutation();
    
    const nav = useNavigate();

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const[activestatus, setActivestatus] = useState(user.activestatus) // For disable an employee

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => { 
        if (isSuccess || isDeleteSuccess) { // Checking the 2 Mutation at once
            setUsername('')
            setPassword('')
            setRoles([])
            nav('/dash/users')
        }

    }, [isSuccess, isDeleteSuccess, nav])

    const onPwdChanged = e => setPassword(e.target.value)  
    const onNameChanged = e => setUsername(e.target.value)
    const onRolesChanged = e => { // Allowes more than one option to be selected
        const values = Array.from( // The array takes the values, and create an array stored in values        
            e.target.selectedOptions, (option) => option.value
        ) 
        setRoles(values) // Set the roles to the values
    }
    const onActChange = () => setActivestatus(prev => !prev) // Oppsite the chosen

    const onSaveUserClicked = async (e) => {
        if (password) { // It possible to update user detail with/wuthout the password
            await updateUser({ id: user.id, username, password, roles, activestatus })
        } else {
            await updateUser({ id: user.id, username, roles, activestatus })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }
    const onBackClientClicked = () => nav(`/dash/users/`);
    const options= Object.values(ROLES).map(role => {
        return ( <option key={role} value={role} > {role} </option > )
    })
    let goSave // Save with pwd or not.
    if (password) {
        goSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoauding
    } else {
        goSave = [roles.length, validUsername].every(Boolean) && !isLoauding
    }
    const errClass= (isError || isDeleteError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass= password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass= !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const errContent = (err?.data?.message || deleteError?.data?.message) ?? ''


    const content = (
        <>
            {/* If errors accur, the mesgge from the back-end will display*/}
      <p className={errClass}>{errContent}</p> 

      <form className="General_Form" onSubmit={e=> e.preventDefault()}>
        <div className="General_Form__title-row">
          <h2>Edit User</h2>
          <div className="General_Form__action-buttons">
            <button className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!goSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button className="icon-button" title="Delete" onClick={onDeleteUserClicked} >
                <FontAwesomeIcon icon={faTrash} /> </button>
                <button className="icon-button" title="Back"
              onClick={onBackClientClicked} >
              <FontAwesomeIcon icon={faArrowLeft} />
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

        <label className="form__label form__checkbox-container" htmlFor="user-active">
            ACTIVE: 
            <input className="form__checkbox" id="user-active"
                name="user-active" type="checkbox" checked={activestatus}
                onChange={onActChange} /> 
        </label>

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

export default EditUserForm