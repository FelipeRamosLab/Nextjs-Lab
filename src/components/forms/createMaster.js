import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config.json';
import Input from '../inputs/input';

export default function CreateMaster({pageData}) {
    const [spinner, setSpinner] = useState(false);
    const [limits, setLimits] = useState({
        leverege: 120,
        monthlyLoss: {},
        dailyLoss: {},
        tradeLoss: {},
    });
    const [form, setForm] = useState({
        user: config.userTest,
        type: 'demo',
        name: '',
        initialBalance: 0,
        limits: limits
    });
    

    useEffect(()=>{
        setForm({...form, limits});
    }, [limits]);

    async function create(ev) {
        ev.preventDefault();
        setSpinner(true);

        try {
            const saved = await axios.post('/api/master-account/create', form);
            window.location.reload();
        } catch(err) {
            throw err;
        }
    }

    if (!spinner) {
        return (<form onSubmit={(ev)=>create(ev)}>
            <h2 className="title">Criar conta</h2>

            <fieldset>
                <label>Tipo de conta:</label>
                <select value={form.type} onChange={(ev)=>setForm({...form, type: ev.target.value})}>
                    <option value="demo">Demo account</option>
                    <option value="live">Live account</option>
                </select>
            </fieldset>

            <Input
                label="Nome:"
                value={form.name} 
                formSetter={(ev)=>setForm({...form, name: ev.target.value})} 
            />
            <Input
                type="number"
                label="Depósito inicial:"
                value={form.initialBalance}
                formSetter={(ev)=>setForm({...form, initialBalance: Number(ev.target.value)})}
            />
            <Input
                type="number"
                label="Alavancagem Máxima:"
                value={limits.leverege}
                formSetter={(ev)=>setLimits({...limits, leverege: handleLeverege(ev.target.value)})}
            />
            <Input
                type="number"
                label="Limite de Prejuízo (Mensal %):"
                value={limits.monthlyLoss.percent || ''}
                formSetter={(ev)=>setLimits({...limits, monthlyLoss: {...limits.monthlyLoss, percent: handleNumber(ev.target.value)}})}
            />
            <Input
                type="number"
                label="Limite de Prejuízo (Diário %):"
                value={limits.dailyLoss.percent || ''}
                formSetter={(ev)=>setLimits({...limits, dailyLoss: {...limits.dailyLoss, percent: handleNumber(ev.target.value)}})}
            />
            <Input
                type="number"
                label="Limite de Prejuízo (Mensal USDT):"
                value={limits.monthlyLoss.money || ''}
                formSetter={(ev)=>setLimits({...limits, monthlyLoss: {...limits.monthlyLoss, money: handleNumber(ev.target.value)}})}
            />
            <Input
                type="number"
                label="Limite de Prejuízo (Diário USDT):"
                value={limits.dailyLoss.money || ''}
                formSetter={(ev)=>setLimits({...limits, dailyLoss: {...limits.dailyLoss, money: handleNumber(ev.target.value)}})}
            />

            <div className="buttons-wrap">
                <button type="submit" className="button">Confirmar</button>
            </div>
        </form>);
    } else {
        return (<div>
            <h2>Salvando...</h2>
        </div>)
    }
}

function handleNumber(value, onlyPositive) {
    const result = Number(value);

    if (!isNaN(result)) {
        if (onlyPositive) return ''; 
        return result;
    } else {
        alert('Voce deve inserir somente números!');
    }
}

function handleLeverege(value){
    const result = Number(value);

    if(!isNaN(result)){
        if (result > 120) return 120;
        if (result < 1) return 1;
        return result;
    } else {
        return 1;
    }
}
