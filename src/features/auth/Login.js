import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const nav = useNavigate()
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            nav('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response')
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg(err.data?.message)
            }
            errRef.current.focus()
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)
    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <Typography>Loading...</Typography>

    const content = (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <Typography component="h1" variant="h5">
                    Employee Login
                </Typography>
                {errMsg && (
                    <Alert severity="error" ref={errRef} aria-live="assertive">
                        {errMsg}
                    </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="off"
                        autoFocus
                        value={username}
                        onChange={handleUserInput}
                        inputRef={userRef}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePwdInput}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={persist}
                                onChange={handleToggle}
                                color="primary"
                            />
                        }
                        label="Trust This Device"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Link component={RouterLink} to="/" variant="body2">
                        Back to Home
                    </Link>
                </Box>
            </Box>
        </Container>
    )
    return content
}

export default Login