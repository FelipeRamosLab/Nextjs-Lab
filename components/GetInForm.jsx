import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function GetInForm({ connect }) {
    const [ user, setUser ] = useState({ userName: '' });

    function submit(ev) {
        ev.preventDefault();
        connect(user)
    }

    return (
        <div className="card getin-form">
            <form onSubmit={submit}>
                <TextField
                    label="Username"
                    variant="filled"
                    sx={{ width: '100%', marginBottom: '1rem' }}
                    value={user.userName}
                    onInput={(ev) => setUser(prev => ({ ...prev, userName: ev.target.value }))}
                />

                <Button type="submit" variant="contained" sx={{ width: '100%' }}>Connect</Button>
            </form>
        </div>
    )
}
