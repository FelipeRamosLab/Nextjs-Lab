import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import UploadIcon from '@mui/icons-material/Upload';

const cookieAge = 3600000;

export default function LoginForm() {
    const [formData, setFormData] = useState({});
    const [sending, setSending] = useState(false);

    async function loginUser(ev) {
        ev.preventDefault();
        setSending(true);
        
        try {
            const response = await ajax(process.env.NEXT_PUBLIC_HOST_RUNNER + '/auth/login', formData).post();
            
            setSending(false);
            cookieStore.set({ name: 'token', value: response.token, expires: Date.now() + cookieAge });

            open('/dashboard', '_self');
        } catch (error) {
            setSending(false);
            console.error(error?.response?.data || error);   
        }
    }

    return <form className="sign-form flex-data" onSubmit={(ev) => loginUser(ev)}>
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
                    label="Password"
                    variant="standard"
                    value={formData.password || ''}
                    onInput={(ev) => setFormData(prev => ({ ...prev, password: ev.target.value }))}
                    type="password"
                />
            </FormControl>
        </div>

        <div className="wrap-btn-flex">
            <LoadingButton
                loading={sending}
                variant="contained"
                aria-label="Create User"
                type="submit"
                className="cta"
            >
                <UploadIcon /> Entrar
            </LoadingButton>
        </div>
    </form>;
}
