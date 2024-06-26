import { createContext, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import configs from '../../config.json';

const SubscribeChangesContext = createContext();

export function SubscribeChangesProvider({ children }) {
    const socket = useRef();

    useEffect(() => {
        if (!socket.current) {
            socket.current = io(configs.socketHost + '/subscribe-changes');
        }
    }, []);

    return <SubscribeChangesContext.Provider
        value={() => socket}
    >
        {children}
    </SubscribeChangesContext.Provider>
}

export default SubscribeChangesContext;
