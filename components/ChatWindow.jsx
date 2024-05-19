import { useState, useEffect } from 'react';
import ChatMessage from '../components/ChatMessage';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function CreateRoomDialog({ handleCreate, open, handleClose }) {
    const [ roomID, setRoomID ] = useState('');

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (ev) => {
                    ev.preventDefault();
                    handleCreate(roomID);
                }
            }}
        >
            <DialogTitle>Enter a name</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    name="email"
                    label="Room name"
                    fullWidth
                    variant="standard"
                    value={roomID}
                    onInput={(ev) => setRoomID(ev.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default function ChatWindow({ user, socket, onlineUsers = [], roomsList = [] }) {
    const [message, setMessage] = useState('');
    const [currentRoom, setCurrentRoom] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [openCreateRoom, setOpenCreateRoom] = useState(false);

    class Message {
        constructor(userName, message, room) {
            this.room = room;
            this.user = userName;
            this.message = message;
            this.date = Date.now();

            setMessage('');
        }
    }

    function sendMessage(ev) {
        ev.preventDefault();

        if (currentRoom) {
            socket.current.emit('rooms:send', currentRoom, new Message(user?.userName, message, currentRoom));
        } else {
            socket.current.emit('message', new Message(user?.userName, message));
        }
    }

    function createRoom(roomID) {
        socket.current.emit('rooms:create', roomID);
        setOpenCreateRoom(false);
    }

    function joinRoom(roomID) {
        if (currentRoom) {
            return setCurrentRoom('');
        }

        socket.current.emit('rooms:join', roomID, ({ error }) => {
            if (error) {
                throw 'We got an error trying t join the room.';
            }

            setCurrentRoom(roomID);
        });
    }

    useEffect(() => {
        socket.current.emit('chat:load');
        socket.current.on('message', (data) => {
            setChatHistory(prev => ([...prev, data]));
        });
    }, []);

    return (
        <div className="chat-window card">
            <div className="content">
                <div className="chat-history column">
                    {chatHistory.map((chat, i) => <ChatMessage
                        key={String(chat.date) + i}
                        currentUser={user?.userName}
                        chatMessage={chat}
                    />)}
                </div>

                <div className="rooms column">
                    <section className="sidebar-section">
                        <h3 className="sidebar-title">Online Users</h3>

                        {onlineUsers.map(online => <div key={online.UID} className="chat-tile">{online.userName}</div>)}
                    </section>

                    <section className="sidebar-section">
                        <h3 className="sidebar-title">Rooms</h3>

                        {roomsList.map(room => (
                            <div
                                key={room.id}
                                className={`chat-tile ${currentRoom === room.id ? 'selected' : ''}`}
                                onClick={() => joinRoom(room.id)}
                            >{room.id}</div>
                        ))}
                    </section>

                    <Button variant="contained" onClick={() => setOpenCreateRoom(true)}>Create Room</Button>
                    <CreateRoomDialog handleCreate={createRoom} open={openCreateRoom} handleClose={() => setOpenCreateRoom(false)} />
                </div>
            </div>

            <div className="content footer">
                <form className="chat-prompt column" onSubmit={sendMessage}>
                    <textarea onInput={(ev) => setMessage(ev.target.value)} value={message}></textarea>
                    <Button variant="contained" type="submit">Send</Button>
                </form>
            </div>
        </div>
    );
}
