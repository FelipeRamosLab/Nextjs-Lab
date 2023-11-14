import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import UploadIcon from '@mui/icons-material/Upload';
import AJAX from '../../../utils/ajax';

export default function ConfirmationSent({ queryParams, pageData }) {
    const [sending, setSending] = useState(false);
    const { userEmail } = Object(queryParams);

    const sendEmail = async () => {
        setSending(true);
        const url = new URL(window.location.origin + '/dashboard/confirmation-sent');

        try {
            const sent = await new AJAX('/auth/send-email-confirm').post({ userEmail });

            if (!sent.success) {
                throw sent;
            }

            url.searchParams.set('userEmail', userEmail);
            window.location.href = url.toString();
        } catch (err) {
            throw err;
        } finally {
            setSending(false);
        }
    }

    return (
        <div className="confirmation-sent container">
            <div className="content">
                <h2 className="title">Confirmação enviada com sucesso!</h2>
                <p className="text">Um e-mail de confirmação foi envido para o seu endereço de e-mail cadastrado!</p>

                <LoadingButton
                    loading={sending}
                    variant="contained"
                    aria-label="Re-enviar e-mail"
                    type="submit"
                    className="cta"
                    onClick={sendEmail}
                    fullWidth={true}
                    sx={{ marginTop: 2 }}
                >
                    <UploadIcon /> Re-enviar e-mail
                </LoadingButton>
            </div>
        </div>
    );
}
