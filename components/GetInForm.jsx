import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function GetInForm({ login, register, sendChangePasswordEmail, createNewPassword, initType = 'login' }) {
    const [ user, setUser ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [ type, setType ] = useState(initType);

    function submitLogin(ev) {
        ev.preventDefault();
        login(user);
    }

    function submitRegister(ev) {
        ev.preventDefault();
        register(user);
    }

    async function submitForgotEmail(ev) {
        ev.preventDefault();
        const sent = await sendChangePasswordEmail(user);

        if (sent?.success) {
            setType('login');
        }
    }

    function submitNewPassword(ev) {
        ev.preventDefault();
        createNewPassword(user);
    }

    if (type === 'login') {
        return (
            <div className="card getin-form">
                <form onSubmit={submitLogin}>
                    <TextField
                        label="Username"
                        variant="filled"
                        sx={{ width: '100%', marginBottom: '1rem' }}
                        value={user.email}
                        onInput={(ev) => setUser(prev => ({ ...prev, email: ev.target.value }))}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="filled"
                        sx={{ width: '100%', marginBottom: '1rem' }}
                        value={user.password}
                        onInput={(ev) => setUser(prev => ({ ...prev, password: ev.target.value }))}
                    />
    
                    <Button type="submit" variant="contained" sx={{ width: '100%' }}>Login</Button>
                </form>

                <p className="link" onClick={() => setType('forgot-password')}>I forgot my password</p>
                <span>Don't have an account yet? <span className="link" onClick={() => setType('register')}>Register here</span></span>
            </div>
        );
    }

    if (type === 'register') {
        return (
            <div className="card getin-form">
                <form onSubmit={submitRegister}>
                    <TextField
                        label="First Name"
                        variant="filled"
                        sx={{ width: '100%', marginBottom: '1rem' }}
                        value={user.firstName}
                        onInput={(ev) => setUser(prev => ({ ...prev, firstName: ev.target.value }))}
                    />
                    <TextField
                        label="Last Name"
                        variant="filled"
                        sx={{ width: '100%', marginBottom: '1rem' }}
                        value={user.lastName}
                        onInput={(ev) => setUser(prev => ({ ...prev, lastName: ev.target.value }))}
                    />
                    <TextField
                        label="E-mail"
                        variant="filled"
                        sx={{ width: '100%', marginBottom: '1rem' }}
                        value={user.email}
                        onInput={(ev) => setUser(prev => ({ ...prev, email: ev.target.value }))}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="filled"
                        sx={{ width: '100%', marginBottom: '1rem' }}
                        value={user.password}
                        onInput={(ev) => setUser(prev => ({ ...prev, password: ev.target.value }))}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="filled"
                        sx={{ width: '100%', marginBottom: '1rem' }}
                        value={user.confirmPassword}
                        onInput={(ev) => setUser(prev => ({ ...prev, confirmPassword: ev.target.value }))}
                    />
    
                    <Button type="submit" variant="contained" sx={{ width: '100%' }}>Register</Button>
                </form>

                <span>Do you have an account already? <span className="link" onClick={() => setType('login')}>Login here</span></span>
            </div>
        );
    }

    if (type === 'forgot-password') {
        return (
            <div className="card getin-form">
                <form onSubmit={submitForgotEmail}>
                    <TextField
                        label="E-mail"
                        variant="filled"
                        sx={{ width: '100%', marginBottom: '1rem' }}
                        value={user.email}
                        onInput={(ev) => setUser(prev => ({ ...prev, email: ev.target.value }))}
                    />
    
                    <Button type="submit" variant="contained" sx={{ width: '100%' }}>Send E-mail</Button>
                </form>

                <span className="link" onClick={() => setType('login')}>Back</span>
            </div>
        );
    }

    if (type === 'new-password') {
        return (
            <div className="card getin-form">
                <form onSubmit={submitNewPassword}>
                    <TextField
                        label="Password"
                        type="password"
                        variant="filled"
                        sx={{ width: '100%', marginBottom: '1rem' }}
                        value={user.password}
                        onInput={(ev) => setUser(prev => ({ ...prev, password: ev.target.value }))}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="filled"
                        sx={{ width: '100%', marginBottom: '1rem' }}
                        value={user.confirmPassword}
                        onInput={(ev) => setUser(prev => ({ ...prev, confirmPassword: ev.target.value }))}
                    />
    
                    <Button type="submit" variant="contained" sx={{ width: '100%' }}>Change Password</Button>
                </form>

                <span className="link" onClick={() => setType('login')}>Back</span>
            </div>
        );
    }

    return <></>;
}
