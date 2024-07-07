import { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { io } from 'socket.io-client';
import ChatsList from './ChatsList';
import AJAX from '../utils/AJAXInstance';

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

export default function ChatWindow({ user }) {
    const [message, setMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [groups, setGroups] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [openCreateRoom, setOpenCreateRoom] = useState(false);
    const socketIO = useRef();

    class Message {
        constructor(from, to, message, chat) {
            this.from = from;
            this.to = to;
            this.message = message;
            this.chat = chat;

            setMessage('');
        }
    }

    async function sendMessage(ev) {
        ev.preventDefault();
        const myUID = user._id;
        
        try {
            const messageObj = new Message(myUID, currentChat.target, message, currentChat.UID);
            await new AJAX('/new-message', 'https://localhost:8000').post(messageObj);
        } catch (err) {
            alert(err?.message);
        }
        
    }

    async function selectChat(selected) {
        const myUID = user._id;
        const chatDoc = await new AJAX('/open-chat', 'https://localhost:8000').post({
            participants: [selected._id, myUID]
        });
        
        setCurrentChat({ ...chatDoc, target: selected._id });
        socketIO.current.emit('subscribe', {
            type: 'query',
            collection: 'chat_messages',
            filter: { chat: chatDoc.UID }
        }, (res) => {
            if (res?.error) {
                throw res;
            }

            socketIO.current.on(res?.id, (chatHistory) => {
                console.log(new Date().toLocaleString(), 'Chat History:', chatHistory);
                setChatHistory(chatHistory);
            });
        });
    }

    useEffect(() => {
        if (!socketIO.current) {
            socketIO.current = io('https://localhost:5000/subscribe-changes');

            socketIO.current.on('connect', () => {
                // Subscribing to USERS
                socketIO.current.emit('subscribe', {
                    type: 'query',
                    collection: 'users',
                    filter: { $nor: [{ _id: user._id }]}
                }, (res) => {
                    if (res?.error) {
                        throw res;
                    }

                    socketIO.current.on(res?.id, (users) => {
                        console.log(new Date().toLocaleString(), 'Users:', users);
                        setOnlineUsers(users);
                    });
                });

                // Subscribing to GROUPS
                socketIO.current.emit('subscribe', {
                    type: 'query',
                    collection: 'groups',
                    filter: {}
                }, (res) => {
                    if (res?.error) {
                        throw res;
                    }

                    socketIO.current.on(res?.id, (groups) => {
                        console.log(new Date().toLocaleString(), 'Groups:', groups);
                        setGroups(groups);
                    });
                });
            });
        }
    }, []);

    return (
        <div className="chat-window card">
            <div className="content">
                {!currentChat && <ChatsList />}

                {currentChat && <div className="chat-history column">
                    {chatHistory.map((chat, i) => <ChatMessage
                        key={chat._id}
                        currentUser={user?.userName}
                        chatMessage={chat}
                    />)}
                </div>}

                <div className="rooms column">
                    <section className="sidebar-section">
                        <h3 className="sidebar-title">Users</h3>

                        {onlineUsers.map(online => <div
                            key={online._id}
                            className="chat-tile"
                            onClick={() => selectChat(online)}
                        >
                            {online.firstName} {online.lastName}
                        </div>)}
                    </section>

                    <section className="sidebar-section">
                        <h3 className="sidebar-title">Groups</h3>

                        {groups.map(group => {
                            return (
                                <div
                                    key={group._id}
                                    className={`chat-tile ${currentChat === group._id ? 'selected' : ''}`}
                                    onClick={() => joinRoom(room)}
                                >{group.name}</div>
                            )
                        })}
                    </section>

                    <Button variant="contained" onClick={() => setOpenCreateRoom(true)}>Create Group</Button>
                    <CreateRoomDialog open={openCreateRoom} handleClose={() => setOpenCreateRoom(false)} />
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
