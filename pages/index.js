import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import ChatWindow from '../components/ChatWindow';
import GetInForm from '../components/GetInForm';

export default function Home() {
  const [ roomsList, setRoomsList ] = useState([]);
  const [ onlineUsers, setOnlineUsers ] = useState([]);
  const [ userLogged, setUserLogged ] = useState();
  const socket = useRef();

  function connect(user) {
    socket.current = io(`http://localhost:8888/?userName=${user.userName}`);

    socket.current.on('connect', () => {
      console.log('User connected:', user.userName);
      setUserLogged({...user, UID: socket.id });

      socket.current.on('online-users', usersList => {
        setOnlineUsers(usersList);
      });

      socket.current.on('rooms:update', list => {
        setRoomsList(list);
      });

      socket.current.on('chat:read', (loaded) => {
        setOnlineUsers(loaded.onlineUsers);
        setRoomsList(loaded.rooms);
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
        user={userLogged}
        socket={socket}
      />}
    </div>
  </>
}
