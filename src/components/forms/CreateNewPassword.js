import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import UploadIcon from '@mui/icons-material/Upload';
import AJAX from '../../utils/ajax';

export default function CreateNewPasswordForm({ resettoken, useremail }) {
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ sending, setSending ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    async function create(ev) {
        ev.preventDefault();
        setSending(true);

        try {
            const created = await new AJAX('/auth/reset-password/create-new').put({
                newPassword,
                confirmPassword,
                resettoken,
                useremail
            });

            setSuccess(true);
        } catch (err) {
            setSuccess(false);
            throw err;
        } finally {
            setSending(false);
        }
    }

    return (<>
        {!success && <form className="flex-data" onSubmit={(ev) => create(ev)}>
            <h2 className="title">Criar nova senha</h2>

            <div className="row">
                <FormControl margin="dense" className="column">
                    <TextField
                        label="Nova Senha"
                        variant="standard"
                        value={newPassword}
                        onInput={(ev) => setNewPassword(ev.target.value)}
                        type="password"
                    />
                </FormControl>
            </div>
            <div className="row">
                <FormControl margin="dense" className="column">
                    <TextField
                        label="Confirmar Senha"
                        variant="standard"
                        value={confirmPassword}
                        onInput={(ev) => setConfirmPassword(ev.target.value)}
                        type="password"
                    />
                </FormControl>
            </div>

            <div className="wrap-btn-flex">
                <LoadingButton
                    loading={sending}
                    variant="contained"
                    aria-label="Change password"
                    type="submit"
                    className="cta"
                >
                    <UploadIcon /> Alterar senha
                </LoadingButton>
            </div>

        </form>}

        {success && <p className="email-sent-message">Um e-mail foi envido para o cadastro de uma nova senha!</p>}
    </>);
}
