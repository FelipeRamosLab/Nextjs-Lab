import {useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function BotValueEdit({value, pageData, toggleEdit}) {
    const {availableFunctions} = pageData || {};
    const [form, setForm] = useState(value);
    const [updateLoading, setUpdateLoading] = useState(false);
    
    useEffect(() => {
        setForm(prev => {
            try {
                const parsed = JSON.parse(prev.configs);
                const stringify = JSON.stringify(parsed, null, 2);
                return {...prev, configs: stringify}
            } catch(err) {
                return {...prev, configs: prev.configs}
            }
        });
    }, []);

    async function updateBotValue() {
        const result = {};

        setUpdateLoading(true);
        Object.entries(value || {}).map(([key, item]) => {
            if (form[key] !== item) {
                result[key] = form[key];
            }
        });

        try {
            const {data} = await axios.post('/api/bot/update-botvalue', {
                _id: value._id,
                toUpdate: result
            });
            
            if (data.success) {
                window.location.reload();
            }
        } catch(err) {
            setUpdateLoading(false);
            throw new Error(err);
        }
    }

    return (
        <form>
            <FormControl variant="standard" sx={{marginBottom: '10px'}}>
                <InputLabel id={'label-' + value._id}>Tipo de valor</InputLabel>
                <Select
                    labelId={'label-' + value._id}
                    id=""
                    value={form.valueType || ''}
                    onChange={(ev) => setForm(prev => {
                        return {...prev, valueType: ev.target.value}
                    })}
                >
                    <MenuItem value="function">Dinâmico</MenuItem>
                    <MenuItem value="primitive">Valor primitivo</MenuItem>
                </Select>
            </FormControl>

            {form.valueType === 'function' && <FormControl variant="standard" sx={{marginBottom: '10px'}}>
                <InputLabel id={'label-' + value._id}>Nome da função</InputLabel>
                <Select
                    labelId={'label-' + value._id}
                    defaultValue={value.functionUID && value.functionUID._id}
                    value={value.functionUID && form.functionUID._id || form.functionUID || ''}
                    id=""
                    label=""
                    onChange={(ev) => setForm(prev => {
                        return {...prev, functionUID: ev.target.value}
                    })}
                >

                    {availableFunctions && availableFunctions.map((item, index) => {
                        return <MenuItem key={item._id + index} value={item._id}>{item.title}</MenuItem>
                    })}
                </Select>
            </FormControl>}

            {form.valueType === 'primitive' && <FormControl variant="standard" sx={{marginBottom: '10px'}}>
                <InputLabel id={'label-' + value._id}>Tipo de primitivo</InputLabel>
                <Select
                    labelId={'label-' + value._id}
                    id=""
                    value={form.primitiveType || ''}
                    onChange={(ev) => setForm(prev => {
                        return {...prev, primitiveType: ev.target.value}
                    })}
                >
                    <MenuItem value="boolean">Verdadeiro / Falso</MenuItem>
                    <MenuItem value="string">Texto</MenuItem>
                    <MenuItem value="number">Número</MenuItem>
                </Select>
            </FormControl>}

            {form.valueType === 'primitive' && form.primitiveType && <FormControl>
                {form.primitiveType === 'boolean' && <RadioGroup
                    row
                    name="boolean"
                    value={form.primitiveValue}
                    onChange={(ev) => setForm(prev => {
                        return {...prev, primitiveValue: ev.target.value === 'true' ? true : false}
                    })}
                >
                    <FormControlLabel value={true} control={<Radio />} label="Verdadeiro" />
                    <FormControlLabel value={false} control={<Radio />} label="Falso" />
                </RadioGroup>}

                {(form.primitiveType === 'string' || form.primitiveType === 'number') && <Box
                    noValidate
                    autoComplete="off"
                >
                    {form.primitiveType === 'string' && <TextField sx={{width: '100%'}} label="Valor de texto" variant="standard" type="text" onChange={(ev) => setForm(prev => {
                        return {...prev, primitiveValue: ev.target.value}
                    })} />}
                    {form.primitiveType === 'number' && <TextField sx={{width: '100%'}} label="Valor de número" variant="standard" type="number" onChange={(ev) => setForm(prev => {
                        return {...prev, primitiveValue: Number(ev.target.value)}
                    })} />}
                </Box>}
            </FormControl>}

            {form.valueType === 'function' && <FormControl variant="standard" sx={{marginBottom: '10px'}}>
                <TextareaAutosize
                    value={form.configs}
                    minRows={10}
                    onChange={(ev) => setForm(prev => {
                        try {
                            const parsed = JSON.parse(ev.target.value);
                            const stringify = JSON.stringify(parsed, null, 2);
                            return {...prev, configs: stringify}
                        } catch(err) {
                            return {...prev, configs: ev.target.value}
                        }
                    })}
                />
            </FormControl>}

            <div className="wrap-btns-flex">
                <Button variant="standard" onClick={() => toggleEdit(form)}>Cancelar</Button>
                <LoadingButton
                    loading={updateLoading}
                    variant="contained"
                    aria-label="save"
                    onClick={() => updateBotValue()}
                >
                    <SaveIcon /> Save
                </LoadingButton>
            </div>
        </form>
    );
}