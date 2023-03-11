import { Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function BackdropLoading({open}) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: 999999 }}
            open={open || false}
        >
            <CircularProgress color="inherit" size={60} />
            <Typography fontSize={16} marginTop={2}>Carregando</Typography>
        </Backdrop>
    )
}
