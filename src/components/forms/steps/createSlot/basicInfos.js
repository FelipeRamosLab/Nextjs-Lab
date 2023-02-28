import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';

export default function SlotBasicInfoStep({formState, master}) {
    const [form, setForm] = formState;

    return (<div className="step-fields">
        <FormControl margin="dense">
            <TextField
                required
                label="Nome de identificação"
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

        <FormControl margin="dense">
            <Typography gutterBottom>Alocação da Carteira</Typography>
            <Slider
                size="medium"
                defaultValue={master && master.availableAllocation || 0}
                valueLabelDisplay="auto"
                max={master && master.availableAllocation || 0}
                min={1}
                value={form.walletAllocation || master && master.availableAllocation}
                onChange={(ev) => setForm(prev => {
                    return { ...prev, walletAllocation: ev.target.value }
                })}
            />
        </FormControl>
    </div>);
}
