import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const cookieAge = 3600000;

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [sending, setSending] = useState(false);

    async function createUser(ev) {
        ev.preventDefault();
        setSending(true);
        
        try {
            const response = await ajax(process.env.NEXT_PUBLIC_HOST_RUNNER + '/auth/register', formData).post();
            
            setSending(false);
            cookieStore.set({ name: 'token', value: response.token, expires: Date.now() + cookieAge });

            window.location.href = '/dashboard';
        } catch (error) {
            setSending(false);
            console.error(error?.response?.data || error);   
        }
    }

    return <form className="sign-form flex-data" onSubmit={(ev) => createUser(ev)}>
        <div className="row">
            <FormControl margin="dense" className="column">
                <TextField
                    label="First Name"
                    variant="standard"
                    value={formData.firstName || ''}
                    onInput={(ev) => setFormData(prev => ({ ...prev, firstName: ev.target.value }))}
                    type="text"
                    inputMode="text"
                />
            </FormControl>
        </div>

        <div className="row">
            <FormControl margin="dense" className="column">
                <TextField
                    label="Last Name"
                    variant="standard"
                    value={formData.lastName || ''}
                    onInput={(ev) => setFormData(prev => ({ ...prev, lastName: ev.target.value }))}
                    type="text"
                    inputMode="text"
                />
            </FormControl>
        </div>

        <div className="row">
            <FormControl margin="dense" className="column">
                <TextField
                    label="E-mail"
                    variant="standard"
                    value={formData.email || ''}
                    onInput={(ev) => setFormData(prev => ({ ...prev, email: ev.target.value }))}
                    type="email"
                    inputMode="email"
                />
            </FormControl>
        </div>
        
        <div className="row">
            <FormControl margin="dense" className="column">
                <TextField
                    label="Phone"
                    variant="standard"
                    value={formData.phone || ''}
                    onInput={(ev) => setFormData(prev => ({ ...prev, phone: ev.target.value }))}
                    type="tel"
                    inputMode="tel"
                />
            </FormControl>
        </div>

        <div className="row">
            <div className="column">
                <FormControl margin="dense">
                    <TextField
                        label="Password"
                        variant="standard"
                        value={formData.password || ''}
                        onInput={(ev) => setFormData(prev => ({ ...prev, password: ev.target.value }))}
                        type="password"
                    />
                </FormControl>
            </div>

            <div className="column">
                <FormControl margin="dense">
                    <TextField
                        label="Confirm Password"
                        variant="standard"
                        value={formData.confirmPassword || ''}
                        onInput={(ev) => setFormData(prev => ({ ...prev, confirmPassword: ev.target.value }))}
                        type="password"
                    />
                </FormControl>
            </div>
        </div>

        <div className="wrap-btn-flex">
            <LoadingButton
                loading={sending}
                variant="contained"
                aria-label="Create User"
                type="submit"
                className="cta"
            >
                <SaveIcon /> Create User
            </LoadingButton>
        </div>
    </form>;
}
