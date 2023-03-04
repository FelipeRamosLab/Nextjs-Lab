import { useState } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogPopUp from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmationModal({ title, message, openState, confirmText, cancelText, onConfirm }) {
    const [ isOpen, setIsOpen ] = openState;
    const [ loading, setLoading ] = useState(false);

    function confirmAction() {
        setLoading(true);
        onConfirm();
    }

    return (<DialogPopUp
        open={isOpen}
    >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {message}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setIsOpen(false)}>{cancelText || 'Cancelar'}</Button>
            <LoadingButton loading={loading} onClick={() => confirmAction()}>{confirmText || 'Confirmar'}</LoadingButton>
        </DialogActions>
    </DialogPopUp>);
}
