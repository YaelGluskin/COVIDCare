import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist'
// Define Login component
const Login =() => {
    // Define refs for user input and error message
    const userRef = useRef() // Reference for username input field
    const errRef = useRef() // Reference for error message

    // Define state variables for username, password, and error message
    const [username, setUsername] = useState('') // State variable for username
    const [password, setPassword] = useState('') // State variable for password
    const [errMsg, setErrMsg] = useState('') // State variable for error message
    const [persist, setPersist] = usePersist()

    // Get navigation function from React Router
    const nav = useNavigate() // Function to navigate to different routes
    const dispatch = useDispatch() // Function to dispatch actions to Redux store

    // Use login mutation hook from API slice
    const [login, { isLoading }] = useLoginMutation() // Mutation hook for login operation

    // Effect to focus on username input field when component mounts
    useEffect(() => {
        userRef.current.focus() // Focus on username input field
    }, [])

    // Effect to clear error message when username or password changes
    useEffect(() => {
        setErrMsg(''); // Clear error message
    }, [username, password])

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault() // Prevent default form submission behavior
        try {
            // Attempt login using entered username and password
            const { accessToken } = await login({ username, password }).unwrap() // Unwrap the result of login mutation
            // Dispatch action to set credentials in Redux store
            dispatch(setCredentials({ accessToken })) // Set access token in Redux store
            setUsername('') // Clear username input field
            setPassword('') // Clear password input field
            nav('/dash') // Navigate to dashboard page
        } catch (err) { // Catch any errors during login
            if (!err.status) { // If no status code in error
                setErrMsg('No Server Response'); // Set error message
            } else if (err.status === 400) { // If bad request
                setErrMsg('Missing Username or Password'); // Set error message
            } else if (err.status === 401) { // If unauthorized
                setErrMsg('Unauthorized'); // Set error message
            } else { // For other errors
                setErrMsg(err.data?.message); // Set error message from response data
            }
            errRef.current.focus(); // Focus on error message
        }
    }

    // Function to handle username input change
    const handleUserInput = (e) => setUsername(e.target.value) // Update username state with input value
    // Function to handle password input change
    const handlePwdInput = (e) => setPassword(e.target.value) // Update password state with input value
    
    const handleToggle = () => setPersist(prev => !prev)
    // Determine CSS class for error message display
    const errClass = errMsg ? "errmsg" : "offscreen" // CSS class for error message

    // Render loading message if login mutation is in progress
    if (isLoading) return <p>Loading...</p> // Render loading message if login is in progress



    const content = (
        <section className="public">
            <header>
                <h1>Employee Login</h1>
            </header>
            <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <button className="form__submit-button">Sign In</button>
                    
                    <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </label>
                </form>
            </main>
            <footer>
                <Link to="/">Back to Home</Link>
            </footer>
        </section>
    )
    return content
}

// Export username separately
export default Login;