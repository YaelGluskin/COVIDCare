import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "./authApiSlice"
import usePersist from '../../hooks/usePersist'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"

// Define the PersistLogin component
const PersistLogin = () => {
    // Retrieve persist function from custom hook
    const [persist] = usePersist()
    // Retrieve current token from Redux store
    const token = useSelector(selectCurrentToken)
    // Initialize a ref to track whether the effect has run
    const effectRan = useRef(false)
    // Initialize state to track true success
    const [trueSuccess, setTrueSuccess] = useState(false)
    // Initialize refresh mutation hook
    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    // useEffect hook to handle refresh token verification
    useEffect(() => {
        // Check if effect has already run or in production environment
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
            // Define function to verify refresh token
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    // Call refresh mutation hook
                    await refresh()
                    // Set true success state
                    setTrueSuccess(true)
                } catch (err) {
                    console.error(err)
                }
            }

            // Check if token is not present and persist is enabled
            if (!token && persist) verifyRefreshToken()
        }

        // Clean up function to update effect ran status
        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])

    // Define content based on various conditions
    let content
    if (!persist) { // persist: no
        console.log('no persist')
        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
        console.log('loading')
        content = <p>Loading...</p>
    } else if (isError) { //persist: yes, token: no
        console.log('error')
        content = (
            <p className='errmsg'>
                {`${error?.data?.message} -`}
                <Link to="/login"> Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }

    // Return the content
    return content
}

// Export the PersistLogin component
export default PersistLogin
