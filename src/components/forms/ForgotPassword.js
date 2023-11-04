import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import UploadIcon from '@mui/icons-material/Upload';
import AJAX from '../../utils/ajax';

export default function ForgotPassword() {
    const [ email, setEmail ] = useState('');
    const [ sending, setSending ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    async function sendEmail(ev) {
        ev.preventDefault();
        setSending(true);

        try {
            const emailSent = await new AJAX('/auth/reset-password/send-email').post({ email });

            setSuccess(true);
        } catch (err) {
            setSuccess(false);
            throw err;
        } finally {
            setSending(false);
        }
    }

    return (<>
        {!success && <form className="flex-data" onSubmit={(ev) => sendEmail(ev)}>
            <h2 className="title">Esqueci minha senha</h2>

            <div className="row">
                <FormControl margin="dense" className="column">
                    <TextField
                        label="E-mail"
                        variant="standard"
                        value={email}
                        onInput={(ev) => setEmail(ev.target.value)}
                        type="email"
                        inputMode="email"
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
                    <UploadIcon /> Enviar E-mail
                </LoadingButton>
            </div>

        </form>}

        {success && <p className="email-sent-message">Um e-mail foi envido para o cadastro de uma nova senha!</p>}
    </>);
}
