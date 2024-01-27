import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

export default function SlotAssetConfigStep({formState, assets}) {
    const [form, setForm] = formState;
    const assetsList = assets.map(item => item.symbol);
    const currentSymbol = form.assets && form.assets.length ? form.assets[0] : null;
    const asset = form.assets && assets.find(item => item.symbol === form.assets[0]);
    const maxLeverage = asset && asset.maxLeverage;

    if (form.limits.leverege > maxLeverage || !form.limits.leverege) {
        form.limits.leverege = maxLeverage;
    }

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

        <FormControl margin="dense">
            <Typography gutterBottom>Alavancagem máxima: <b style={{ fontSize: 16}}>{form.limits.leverege}</b></Typography>
            <Slider
                size="medium"
                defaultValue={maxLeverage}
                valueLabelDisplay="auto"
                max={maxLeverage}
                min={1}
                value={form.limits.leverege}
                onChange={(ev) => setForm(prev => {
                    return { ...prev, limits: { ...prev.limits, leverege: ev.target.value } }
                })}
            />
        </FormControl>

        <FormControl margin="dense">
            <Typography gutterBottom>
                Pausa mínima entre operações: 
                <b style={{ fontSize: 16 }}>{form.limits.tradesMinInterval}</b> min{form.limits.tradesMinInterval > 1 ? 's': ''}
            </Typography>
            <Slider
                size="medium"
                defaultValue={1}
                valueLabelDisplay="auto"
                max={60}
                min={1}
                value={form.limits.tradesMinInterval}
                onChange={(ev) => setForm(prev => {
                    return { ...prev, limits: { ...prev.limits, tradesMinInterval: ev.target.value } }
                })}
            />
        </FormControl>
    </div>);
}