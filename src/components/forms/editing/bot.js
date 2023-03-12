import TextField from '@mui/material/TextField';
import { useRef } from 'react';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/base/TextareaAutosize';

export default function EditBotForm({formState}) {
    const [form, setForm] = formState;

    return <form>
        <FormControl variant="standard" sx={{marginBottom: '10px'}}>
            <TextField
                sx={{width: '100%'}}
                label="Nome do bot"
                variant="standard"
                type="text"
                value={form?.name || ''}
                onChange={(ev) => setForm(prev => {
                    return {...prev, name: ev.target.value}
                })}
            />
        </FormControl>
        <FormControl variant="standard" sx={{marginBottom: '10px'}}>
            <TextField
                variant="standard"
                value={form?.description || ''}
                minRows={10}
                multiline
                onInput={(ev) => setForm(prev => {
                    return {...prev, description: ev.target.value}
                })}
                onFocus={(ev) => ev.target.value === '--empty--' && ev.target.select()}
            />
        </FormControl>
    </form>
}
