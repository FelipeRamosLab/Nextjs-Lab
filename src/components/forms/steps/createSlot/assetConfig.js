import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function SlotAssetConfigStep({formState, assets}) {
    const [form, setForm] = formState;
    const assetsList = assets.map(item => item.symbol);
    const currentSymbol = form.assets && form.assets.length ? form.assets[0] : null;

    return (<div className="step-fields">
        <Autocomplete
            options={assetsList}
            getOptionLabel={(option) => option || ''}
            value={currentSymbol}
            onChange={(event, symbol) => {
                setForm(prev => {
                    return { ...prev, assets: symbol ? [symbol] : [] }
                });
            }}
            renderInput={(params) => (
                <TextField {...params} label="Symbolo do ativo" variant="standard" />
            )}
        />
        <FormControl variant="standard" margin="dense">
            <InputLabel id={'label-interval'}>Intervalo gráfico</InputLabel>
            <Select
                labelId={'label-interval'}
                value={form.interval || ''}
                onChange={(ev) => setForm(prev => {
                    return {...prev, interval: ev.target.value}
                })}
            >
                <MenuItem value="1m">1 minuto</MenuItem>
                <MenuItem value="5m">5 minutos</MenuItem>
                <MenuItem value="15m">15 minutos</MenuItem>
                <MenuItem value="30m">30 minutos</MenuItem>
                <MenuItem value="1h">1 hora</MenuItem>
                <MenuItem value="4h">4 horas</MenuItem>
                <MenuItem value="1d">1 dia</MenuItem>
            </Select>
        </FormControl>
    </div>);
}