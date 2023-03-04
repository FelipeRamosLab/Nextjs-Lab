import { useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function FormFillModal({title, Content, saveAction, onClose, openState, defaultData, dialogProps, pageData}) {
    const spinnerWrap = useRef();
    const formState = useState(defaultData || {});
    const isLoadingState = useState(true);
    const [form] = formState;
    const [isLoading] = isLoadingState;
    const contentHeight = spinnerWrap && spinnerWrap.current && spinnerWrap.current.offsetHeight;

    return (
        <Dialog
            open={openState}
            maxWidth="lg"
            PaperProps={{
                sx: { width: '95%', maxWidth: 700, margin: 0}
            }}
            {...dialogProps}
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                {title || 'Preencha o formulário abaixo'}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>

            <DialogContent ref={spinnerWrap} dividers>
                {Content && <Content
                    pageData={pageData}
                    formState={formState}
                    onClose={onClose}
                    isLoadingState={isLoadingState}
                />}

                {isLoading && <Box
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    height={contentHeight}
                    sx={{ display: 'flex' }}
                >
                    <CircularProgress />
                </Box>}        
            </DialogContent>

            {saveAction && <DialogActions>
                <Button onClick={() => saveAction(form)}>
                    Salvar
                </Button>
            </DialogActions>}
        </Dialog>
    )
}
