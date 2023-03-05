import {useEffect, useState, useContext} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
import Checkbox from '@mui/material/Checkbox';
import ActivityDataContext from '../../../context/activityData';

export default function BotValueEdit({value, toggleEdit, currentIndex}) {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const {availableFunctions, bot } = activityData || {};
    const [updateLoading, setUpdateLoading] = useState(false);
    const [form, setForm] = useState(value);
    const textAreaDefault = {};

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

    availableFunctions.map(fn => {
        if (form.functionUID && (fn._id === form.functionUID || fn._id === form.functionUID._id)) {
            Object.entries(fn.options).map(([key, opt]) => {
                switch (opt.type) {
                    case 'string': textAreaDefault[key] = 'valueHere'; break;
                    case 'number': textAreaDefault[key] = 0; break;
                    case 'array': textAreaDefault[key] = []; break;
                    case 'object': textAreaDefault[key] = {}; break;
                }
            });
        }
    });

    async function updateBotValue() {
        const result = {
            functionUID: form?.functionUID?._id
        };

        setUpdateLoading(true);
        Object.entries(form || {}).map(([key, item]) => {
            if (value[key] !== item) {
                result[key] = form[key];
            }

            if (result.valueType) {
                if (result.valueType === 'function') {
                    result.primitiveType = '';
                    result.primitiveValue = '';
                }

                if (result.valueType === 'primitive') {
                    result.functionUID = null;
                    result.configs = '{}';
                }
            }

            delete result._id;
            delete result.slug;
        });

        try {
            const {data} = await axios.post('/api/bot/update-value', {
                _id: value._id,
                botUID: activityData.bot._id,
                toUpdate: result
            });
            
            if (data) {
                setActivityData(prev => {
                    return {...prev, bot: data}
                });
                setUpdateLoading(false);
                toggleEdit(value)
            }
        } catch(err) {
            setUpdateLoading(false);
            throw err;
        }
    }

    return (
        <div>
            <FormControl sx={{marginBottom: '10px'}}>
                <FormControlLabel
                    label={form.name ? 'Editar nome' : 'Adicionar nome'}
                    control={<Checkbox
                        checked={form.toSet ? true : false}
                        onChange={(ev) => setForm(prev => {
                            return {...prev, toSet: ev.target.checked}
                        })}
                    />}
                />

                {form.toSet && <TextField
                    sx={{width: '100%'}}
                    label="Nome do valor"
                    variant="standard"
                    type="text"
                    value={form.name || ''}
                    onChange={(ev) => setForm(prev => {
                        return {...prev, name: ev.target.value}
                    })}
                />}
            </FormControl>

            {(currentIndex === 1) && <FormControl variant="standard" sx={{marginBottom: '10px'}}>
                <InputLabel id={'label-' + value._id}>Sinal de comparação</InputLabel>
                <Select
                    labelId={'label-' + value._id}
                    defaultValue={form.toCompare}
                    value={form.toCompare || ''}
                    onChange={(ev) => setForm(prev => {
                        return {...prev, toCompare: ev.target.value}
                    })}
                >
                    <MenuItem value="=">Igual ({'='})</MenuItem>
                    <MenuItem value=">=">Maior ou Igual ({'>='})</MenuItem>
                    <MenuItem value="<=">Menor ou Igual ({'<='})</MenuItem>
                    <MenuItem value=">">Maior ({'>'})</MenuItem>
                    <MenuItem value="<">Menor ({'<'})</MenuItem>
                    <MenuItem value="!=">Diferente ({'!='})</MenuItem>
                </Select>
            </FormControl>}

            <FormControl variant="standard" sx={{marginBottom: '10px'}}>
                <InputLabel id={'label-' + value?._id}>Tipo de valor</InputLabel>
                <Select
                    labelId={'label-' + value?._id}
                    id=""
                    value={form.valueType || ''}
                    onChange={(ev) => setForm(prev => {
                        return {...prev, valueType: ev.target.value}
                    })}
                >
                    <MenuItem value="function">Dinâmico</MenuItem>
                    <MenuItem value="primitive">Valor Primitivo</MenuItem>
                    <MenuItem value="existent">Clonar</MenuItem>
                </Select>
            </FormControl>

            {form.valueType === 'existent' && <FormControl variant="standard" sx={{marginBottom: '10px'}}>
                <InputLabel id={'label-' + value?._id}>Escolha um valor:</InputLabel>
                <Select
                    labelId={'label-' + value?._id}
                    value={''}
                    onChange={(ev) => {
                        const dataStored = bot.values.find(item => item._id === ev.target.value);
                        setForm(dataStored);
                    }}
                >

                    {bot.values.map((item, index) => {
                        return <MenuItem
                            key={item._id + index}
                            value={item._id}
                        >[{item.cod}] {item.name || item.functionUID && item.functionUID.title}</MenuItem>
                    })}
                </Select>
            </FormControl>}

            {form.valueType === 'function' && <FormControl variant="standard" sx={{marginBottom: '10px'}}>
                <InputLabel id={'label-' + value?._id}>Nome da função</InputLabel>
                <Select
                    labelId={'label-' + value?._id}
                    value={typeof form.functionUID === 'string' ? form.functionUID : typeof form.functionUID === 'object' ? form.functionUID._id : ''}
                    onChange={(ev) => setForm(prev => {
                        return {...prev, configs: '{}', functionUID: ev.target.value}
                    })}
                >

                    {availableFunctions && availableFunctions.map((item, index) => {
                        return <MenuItem key={item._id + index} value={item._id}>{item.title}</MenuItem>
                    })}
                </Select>
            </FormControl>}

            {form.valueType === 'primitive' && <FormControl variant="standard" sx={{marginBottom: '10px'}}>
                <InputLabel id={'label-' + value?._id}>Tipo de primitivo</InputLabel>
                <Select
                    labelId={'label-' + value?._id}
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
                    value={form.primitiveValue || ''}
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
                    {form.primitiveType === 'string' && <TextField
                        sx={{width: '100%'}}
                        label="Valor de texto"
                        variant="standard"
                        type="text"
                        value={form.primitiveValue || ''}
                        onChange={(ev) => setForm(prev => {
                            return {...prev, primitiveValue: ev.target.value}
                        })}
                    />}
                    {form.primitiveType === 'number' && <TextField
                        sx={{width: '100%'}}
                        label="Valor de número"
                        variant="standard"
                        type="number"
                        value={form.primitiveValue || ''}
                        onChange={(ev) => setForm(prev => {
                            return {...prev, primitiveValue: Number(ev.target.value)}
                        })}
                    />}
                </Box>}
            </FormControl>}

            {form.valueType === 'function' && <FormControl sx={{marginBottom: '10px'}}>
                <TextField
                    value={form.configs}
                    minRows={7}
                    variant="standard"
                    multiline
                    onChange={(ev) => setForm(prev => {
                        try {
                            const parsed = JSON.parse(ev.target.value);
                            const stringify = JSON.stringify(parsed, null, 2);
                            return {...prev, configs: stringify}
                        } catch(err) {
                            return {...prev, configs: ev.target.value}
                        }
                    })}
                    onDoubleClick={()=> setForm(prev => {
                        return {...prev, configs: Object.keys(textAreaDefault).length ? JSON.stringify(textAreaDefault, null, 2) : '{}'}
                    })}
                />
            </FormControl>}

            <div className="wrap-btn-flex">
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
        </div>
    );
}
