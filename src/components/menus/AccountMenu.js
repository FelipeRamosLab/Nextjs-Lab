import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import Badge from '@mui/material/Badge';
import AJAX from '../../utils/ajax';

export default function AccountMenu({ pageData }) {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToLink = (link) => {
        window.location.href = link;
    };

    const signOut = async () => {
        try {
            const response = await new AJAX('/auth/signout').post();
    
            if (response.success) {
                await cookieStore.delete('token');
                window.location.href = '/';
            } else {
                alert(response.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Minha Conta">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>FR</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 28,
                            height: 28,
                            mr: 1.2,
                            ml: -0.2
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => goToLink('/dashboard/my-profile')}>
                    <ListItemIcon>
                        <Avatar />
                    </ListItemIcon>
                    Meu Perfil
                </MenuItem>
                
                <Divider />

                <MenuItem onClick={() => goToLink('/logs')}>
                    <ListItemIcon>
                        <Badge badgeContent={pageData?.logsCount || 0} color="error">
                            <LogoDevIcon sx={{ ml: -0.2 }} />
                        </Badge>
                    </ListItemIcon>
                    DEV Logs
                </MenuItem>
                
                <MenuItem onClick={signOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Sair
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}