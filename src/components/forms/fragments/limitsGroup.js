import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export default function LimitsGroupFormFragment({formState, fieldName, label, description}) {
    const [form, setForm] = formState;

    function handleLimitField(limitType, value) {
        setForm(prev => {
            return { ...prev, limits: {
                ...prev.limits,
                [fieldName]: {
                    ...prev.limits[fieldName],
                    [limitType]: Number(value)
                }
            }
        }});
    }

    return (
        <div className="limits-group">
            {label && <h4>{label}</h4>}
            {description && <p>{description}</p>}

            <div className="fields-group">
                <FormControl margin="dense">
                    <TextField
                        type="number"
                        inputMode="numeric"
                        label="Porcentagem"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">%</InputAdornment>
                        }}
                        variant="standard"
                        value={form.limits[fieldName] ? form.limits[fieldName].percent || '' : ''}
                        onInput={(ev) => handleLimitField('percent', ev.target.value)}
                    />
                </FormControl>

                <FormControl margin="dense">
                    <TextField
                        type="number"
                        inputMode="numeric"
                        label="Valor fixo"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        variant="standard"
                        value={form.limits[fieldName] ? form.limits[fieldName].money || '' : ''}
                        onInput={(ev) => handleLimitField('money', ev.target.value)}
                    />
                </FormControl>
            </div>
        </div>
    );
}
