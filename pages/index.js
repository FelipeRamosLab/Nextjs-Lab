import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import ChatWindow from '../components/ChatWindow';
import GetInForm from '../components/GetInForm';

export default function Home() {
  const [ roomsList, setRoomsList ] = useState([]);
  const [ onlineUsers, setOnlineUsers ] = useState([]);
  const [ chatHistory, setChatHistory ] = useState([]);
  const [ userLogged, setUserLogged ] = useState();
  const socket = useRef();
  const subscribe = useRef();

  function connect(user) {
    const baseURL = new URL('https://localhost:8888');
    baseURL.searchParams.set('userName', user.userName);

    socket.current = io(baseURL.toString());
    socket.current.on('connect', () => {
      console.log('User connected:', user.userName);
      setUserLogged({...user, UID: socket.id });

      socket.current.on('online-users', usersList => {
        setOnlineUsers(usersList);
      });

      socket.current.on('chat:read', (loaded) => {
        setOnlineUsers(loaded.onlineUsers);
      });
    });

    const subscribeURL = new URL('https://localhost:8888/subscribe-changes');

    subscribe.current = io(subscribeURL.toString());
    subscribe.current.on('connect', () => {
      subscribe.current.emit('subscribe', {
        type: 'query',
        collection: 'groups',
        filter: {}
      }, (subs) => {
        subscribe.current.on(subs.id, (snapshot) => {
          setRoomsList(snapshot);
        });
      });

      subscribe.current.emit('subscribe', {
        type: 'query',
        collection: 'chat_messages',
        filter: {}
      }, (subs) => {
        subscribe.current.on(subs.id, (snapshot) => {
          setChatHistory(snapshot);
        });
      });
    });
  }

  return <>
    <div className="container">
      <h1>Socket.io Chat</h1>

      {!userLogged && <GetInForm connect={connect} />}
      {userLogged && <ChatWindow
        onlineUsers={onlineUsers}
        roomsList={roomsList}
        chatHistory={chatHistory}
        user={userLogged}
        socket={socket}
      />}
    </div>
  </>
}
