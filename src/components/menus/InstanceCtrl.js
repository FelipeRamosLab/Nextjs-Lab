import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';

const ITEM_HEIGHT = 48;

export default function InstanceMenu({ setInstance, ...props }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChoose = async (action) => {
        await setInstance(action);
        handleClose();
    }

    return (
        <div {...props}>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    maxHeight: ITEM_HEIGHT * 4.5
                }}
            >
                <MenuItem onClick={() => handleChoose('restart')} sx={{ gap: '0.8rem' }}>
                    <RestartAltIcon />
                    RESTART
                </MenuItem>
                <MenuItem onClick={() => handleChoose('interrupt')} sx={{ gap: '0.8rem' }}>
                    <SettingsPowerIcon />
                    INTERRUPT
                </MenuItem>
            </Menu>
        </div>
    );
}
