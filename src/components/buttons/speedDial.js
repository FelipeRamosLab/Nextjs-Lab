import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

export default function SpeedDialButton({actions,  className}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (<>
        <Backdrop open={open} />
        <SpeedDial
            className={className} 
            ariaLabel="SpeedDial tooltip example"
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={() => {}}
            open={open}
            FabProps={{
                onClick: handleOpen
            }}
        >
            {actions.map((item) => (
                <SpeedDialAction
                    key={item.name}
                    icon={item.icon}
                    tooltipTitle={item.name}
                    tooltipOpen
                    onClick={() => {
                        item.action();
                        handleClose();
                    }}
                />
            ))}
        </SpeedDial>
  </>);
}
