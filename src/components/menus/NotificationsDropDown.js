import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Notifications from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import AJAX from '../../utils/ajax';

export default function NotificationsDropDown({ pageData }) {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const { user, notificationsCount } = Object(pageData);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} className="std-round-btns">
                <Tooltip title="Notificações">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'notifications-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Badge badgeContent={notificationsCount} color="error">
                            <Notifications />
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Box>

            <Menu
                anchorEl={anchorEl}
                id="notifications-menu"
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
                {user && Array.isArray(user.notifications) && user.notifications.map((note, i) => {
                    return (<MenuItem key={i}>
                        <ListItemIcon>
                            <Avatar />
                        </ListItemIcon>
                        
                        <div>
                            <h4>{note.subject}</h4>
                            <p>{note.message}</p>
                        </div>
                    </MenuItem>);
                })}
                
                
            </Menu>
        </React.Fragment>
    );
}