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
                <MenuItem value="3m">3 minutos</MenuItem>
                <MenuItem value="5m">5 minutos</MenuItem>
                <MenuItem value="15m">15 minutos</MenuItem>
                <MenuItem value="30m">30 minutos</MenuItem>
                <MenuItem value="1h">1 hora</MenuItem>
                <MenuItem value="2h">2 horas</MenuItem>
                <MenuItem value="4h">4 horas</MenuItem>
                <MenuItem value="6h">6 horas</MenuItem>
                <MenuItem value="8h">8 horas</MenuItem>
                <MenuItem value="12h">12 horas</MenuItem>
                <MenuItem value="1d">1 dia</MenuItem>
                <MenuItem value="3d">3 dias</MenuItem>
                <MenuItem value="1w">1 semana</MenuItem>
            </Select>
        </FormControl>

        <FormControl margin="dense">
            <Typography gutterBottom>Margem em relação ao stoploss: <b style={{ fontSize: 16}}>{form.limits.marginRatioCommit}</b></Typography>
            <Slider
                size="medium"
                defaultValue={form.limits.marginRatioCommit}
                valueLabelDisplay="auto"
                max={85}
                min={1}
                value={form.limits.marginRatioCommit}
                onChange={(ev) => setForm(prev => {
                    return { ...prev, limits: { ...prev.limits, marginRatioCommit: ev.target.value } }
                })}
            />
        </FormControl>

        <FormControl margin="dense">
            <Typography gutterBottom>Alavancagem máxima: <b style={{ fontSize: 16 }}>{form.limits.leverege}</b></Typography>
            <Slider
                size="medium"
                defaultValue={maxLeverage}
                valueLabelDisplay="auto"
                max={maxLeverage}
                min={1}
                value={form?.limits?.leverege || maxLeverage}
                onChange={(ev) => setForm(prev => {
                    return { ...prev, limits: { ...prev.limits, leverege: ev.target.value } }
                })}
            />
        </FormControl>

        <FormControl margin="dense">
            <Typography gutterBottom>
                Pausa mínima entre operações: 
                <b style={{ fontSize: 16 }}>{form.limits.tradesMinInterval / 60}</b> h{form.limits.tradesMinInterval > 1 ? 's': ''}
            </Typography>
            <Slider
                size="medium"
                defaultValue={0.02}
                valueLabelDisplay="auto"
                max={12}
                min={0.02}
                step={0.01}
                value={(form.limits.tradesMinInterval || 0.02) / 60}
                onChange={(ev) => setForm(prev => {
                    return { ...prev, limits: { ...prev.limits, tradesMinInterval: ev.target.value * 60 } }
                })}
            />
        </FormControl>
    </div>);
}