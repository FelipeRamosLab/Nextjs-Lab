'use client';

import { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function Sockets() {
    const [ displayData, setDisplayData ] = useState({content: []});
    const socket = useRef();
    const { current } = socket;

    useEffect(() => {
        if (!current) {
            socket.current = io('https://192.168.15.3:5000');

            socket.on('connect', () => {
                console.log('Socket connected!');

                socket.on('disconnect', () => {
                    console.log('Socket disconnected!');
                });

                socket.on('message', (data) => {
                    console.log('New data from server:', data);

                    setDisplayData(data);
                });
            });
        }
    }, []);

    return (<>
        {displayData.content.map(item => item)}
    </>);
}