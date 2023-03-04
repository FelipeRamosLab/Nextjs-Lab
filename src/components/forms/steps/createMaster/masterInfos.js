import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

export default function MasterInfosStep({formState, isEditMode}) {
    const [form, setForm] = formState;

    return (<div className="step-fields">
        {!isEditMode && <FormControl>
            <FormLabel>Tipo de conta</FormLabel>
            <RadioGroup
                row
                value={form.type || ''}
                onChange={(ev) => {
                    setForm(prev => {
                        return {...prev, type: ev.target.value}
                    });
                }}
            >
                <FormControlLabel value="master-live" control={<Radio />} label="Live" disabled />
                <FormControlLabel value="master-demo" control={<Radio />} label="Demo" />
            </RadioGroup>
        </FormControl>}

        <FormControl margin="dense">
            <TextField
                label="Nome da conta"
                variant="standard"
                value={form.name || ''}
                onInput={(ev) => setForm(prev => {
                    return { ...prev, name: ev.target.value }
                })}
            />
        </FormControl>
    </div>);
}
