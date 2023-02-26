import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function SlotBotSelectStep({formState, bots}) {
    const [form, setForm] = formState;

    return (<div className="step-fields">
        <FormControl variant="standard" margin="dense">
            <InputLabel id={'label-interval'}>Selecione uma opção</InputLabel>
            <Select
                labelId={'label-interval'}
                value={form.bot || ''}
                onChange={(ev) => setForm(prev => {
                    return {...prev, bot: ev.target.value}
                })}
            >
                {bots.map(bot => <MenuItem key={bot._id} value={bot._id}>{bot.name}</MenuItem>)}
            </Select>
        </FormControl>
    </div>);
}
