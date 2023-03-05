import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default function BotBasicInfoStep({formState}) {
    const [form, setForm] = formState;

    return (<div className="step-fields">
        <FormControl margin="dense">
            <TextField
                label="Nome do Robô"
                variant="standard"
                value={form.name || ''}
                onInput={(ev) => setForm(prev => {
                    return { ...prev, name: ev.target.value }
                })}
            />
        </FormControl>

        <FormControl margin="dense">
            <TextField
                label="Descrição"
                variant="standard"
                multiline
                minRows={3}
                value={form.description || ''}
                onInput={(ev) => setForm(prev => {
                    return { ...prev, description: ev.target.value }
                })}
            />
        </FormControl>
    </div>);
}
