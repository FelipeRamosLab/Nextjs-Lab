import { useContext, useState, useEffect } from 'react';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import InstanceCtrl from '../menus/InstanceCtrl';
import Button from '@mui/material/Button';
import APIContext from '../../context/4handsAPI';
import AJAX from '../../utils/ajax';

const STATUS_MESSAGES = {
    starting: {
        title: 'User instance starting...',
        description: 'You can not start any slot until the user instance is fiully loaded.'
    },
    'starting-userstream': {
        title: 'Opening User Stream',
        description: 'The user data stream is opening to synchronize the Binance data.'
    },
    online: {
        title: 'User instance is online',
        description: 'The user instance is ONLINE and ready to use.'
    },
    offline: {
        title: 'User instance is offline',
        description: 'The user instance is OFFLINE at the moment, start it first to use it.'
    },
    error: {
        title: 'User instance is offline',
        description: 'The user instance is off-line at the moment, start it first to use it.'
    },
};

export default function UserInstance({ instanceUID }) {
    const API = (useContext(APIContext))();
    const [ instance, setInstance ] = useState();
    const isDisabled = instance?.status !== 'online' && instance?.status !== 'offline';

    function connectInstance() {
        if (instance || !instanceUID) {
            return;
        }

        API.dbQuery('user_instances', instanceUID).subscribeDoc({
            onData: (doc) => {
                console.log(new Date().toLocaleString(), 'Instance data:', doc);
                setInstance(doc);
            },
            onError: (err) => {
                throw err;
            }
        });
    }

    async function turnOnOff(customAction) {
        if (!instance) return;
        let action = customAction;

        try {
            if (!action) {
                if (instance.status === 'online') {
                    action = 'shutdown';
                }
    
                if (instance.status === 'offline') {
                    action = 'start';
                }
            }

            if (!action) {
                return alert(`The current instance status is "${instance.status}", but it's required that the status be "online" or "offline" to use this button!`);
            }

            const response = await new AJAX('/user/instance-control').post({ action });
            if (response?.error) {
                return alert(response.message);
            }

            return response;   
        } catch (err) {
            alert(err?.message || JSON.stringify(err));
        }
    }

    useEffect(() => {
        connectInstance();
    }, []);

    if (!instance) {
        return (
            <div className="user-instance card">
                <div className="painel">
                    <div className="painel-content column">
                        <h3>User instance not created yet</h3>
                        <p className="descr-message">It will be created automatically when you start your first slot!</p>
                    </div>
                </div>
            </div>
        );
    } else {
        const dummy = STATUS_MESSAGES[instance.status];

        return (
            <div className="user-instance card">
                <div className="painel">
                    <Button
                        className="badge status"
                        type={instance.status}
                        disabled={isDisabled}
                        onClick={() => turnOnOff()}
                    >
                        <PowerSettingsNewIcon />
                    </Button>

                    <div className="painel-content column">
                        <h3>{dummy.title}</h3>
                        <p className="descr-message">{dummy.description}</p>
    
                        <div className="error-list"></div>
                        <div className="warn-list"></div>
                        <div className="message-list"></div>
                    </div>
    
                    <div className="ctrl-buttons column">
                        <InstanceCtrl className="instance-tile" setInstance={() => turnOnOff()} />
                    </div>
                </div>
    
                {false && <div className="details">Details</div>}
            </div>
        );
    }
}
