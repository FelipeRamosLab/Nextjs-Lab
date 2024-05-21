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

export default function ChatWindow({ user, socket, onlineUsers = [], roomsList = [], chatHistory = [] }) {
    const [message, setMessage] = useState('');
    const [currentRoom, setCurrentRoom] = useState('');
    const [openCreateRoom, setOpenCreateRoom] = useState(false);

    class Message {
        constructor(userName, message, room) {
            this.room = room;
            room && (this.group = room);
            this.user = userName;
            this.message = message;

            setMessage('');
        }
    }

    function sendMessage(ev) {
        ev.preventDefault();

        socket.current.emit('message', new Message(user?.userName, message, currentRoom), (err) => {
            alert(err.message);
        });
    }

    function createRoom(roomID) {
        socket.current.emit('rooms:create', roomID);
        setOpenCreateRoom(false);
    }

    function joinRoom(room) {
        if (currentRoom && currentRoom === room?._id) {
            socket.current.emit('chat:load');
            return setCurrentRoom('');
        }

        socket.current.emit('rooms:join', room, ({ error }) => {
            if (error) {
                throw 'We got an error trying t join the room.';
            }

            socket.current.emit('chat:load', { group: room._id });
            setCurrentRoom(room._id);
        });
    }

    useEffect(() => {
        if (currentRoom) {
            socket.current.emit('chat:load', { group: currentRoom });
        } else {
            socket.current.emit('chat:load');
        }
    }, []);

    return (
        <div className="chat-window card">
            <div className="content">
                <div className="chat-history column">
                    {chatHistory.map((chat, i) => <ChatMessage
                        key={chat._id}
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

                        {roomsList.map(room => {
                            return (
                                <div
                                    key={room._id}
                                    className={`chat-tile ${currentRoom === room._id ? 'selected' : ''}`}
                                    onClick={() => joinRoom(room)}
                                >{room.name}</div>
                            )
                        })}
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
