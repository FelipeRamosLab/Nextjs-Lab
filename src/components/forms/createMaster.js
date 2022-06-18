import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config.json';
import Input from '../inputs/input';
import ModalSelect, {ModalSelectOptionModel as SelectOption} from '../inputs/modalSelect';

export default function CreateMaster({pageData, initialData}) {
    const [spinner, setSpinner] = useState(false);
    const [limits, setLimits] = useState({
        monthlyLoss: {},
        dailyLoss: {},
        tradeLoss: {},
    });
    const [form, setForm] = useState({
        user: config.userTest,
        limits: limits
    });

    useEffect(()=>{
        setForm({...form, limits});
    }, [limits]);

    async function create(ev) {
        ev.preventDefault();
        setSpinner(true);

        try {
            await axios.post('/api/master-account/create', form);
            window.location.reload();
        } catch(err) {
            throw err;
        }
    }

    async function edit(ev) {
        ev.preventDefault();
    }

    if (!spinner) {
        return (<form onSubmit={(ev)=>{
            if (!initialData) create(ev);
            else edit(ev);
        }}>
            <h2 className="title">Criar conta</h2>

            <Input
                label="Nome:"
                value={validateProp(form, ['name']) || validateProp(initialData, ['name'])} 
                formSetter={(ev)=>setForm({...form, name: ev.target.value})} 
            />
            {!initialData && <Input
                type="number"
                label="Depósito inicial:"
                value={validateProp(form, ['initialBalance']) || validateProp(initialData, ['initialBalance'])}
                formSetter={(ev)=>setForm({...form, initialBalance: Number(ev.target.value)})}
            />}

            {!initialData && <ModalSelect
                label="Tipo de conta:"
                getter={validateProp(form, ['type']) || validateProp(initialData, ['type'])}
                setter={(value)=>setForm({...form, type: value})}
                options={[
                    new SelectOption({title: 'Conta Demo', value: 'demo'}),
                    new SelectOption({title: 'Conta Real', value: 'live'})
                ]}
            />}

            <div className="limits fields-wrap">
                <h4 className="group-title">Limites da conta</h4>

                <Input
                    type="number"
                    label="Alavancagem Máxima:"
                    value={validateProp(limits, ['leverege']) || validateProp(initialData, ['limits', 'leverege'])}
                    formSetter={(ev)=>setLimits({...limits, leverege: handleLeverege(ev.target.value)})}
                />

                <div className="field-group">
                    <Input
                        type="number"
                        label="Prejuízo Mensal (%):"
                        value={validateProp(limits, ['monthlyLoss', 'percent']) || ''}
                        formSetter={(ev)=>setLimits({...limits, monthlyLoss: {...limits.monthlyLoss, percent: handleNumber(ev.target.value)}})}
                    />
                    <Input
                        type="number"
                        label="Prejuízo Mensal ($):"
                        value={validateProp(limits, ['monthlyLoss', 'money'])  || ''}
                        formSetter={(ev)=>setLimits({...limits, monthlyLoss: {...limits.monthlyLoss, money: handleNumber(ev.target.value)}})}
                    />
                </div>
                <div className="field-group">
                    <Input
                        type="number"
                        label="Prejuízo Diário (%):"
                        value={validateProp(limits, ['dailyLoss', 'percent']) || ''}
                        formSetter={(ev)=>setLimits({...limits, dailyLoss: {...limits.dailyLoss, percent: handleNumber(ev.target.value)}})}
                    />
                    <Input
                        type="number"
                        label="Prejuízo Diário ($):"
                        value={validateProp(limits, ['dailyLoss', 'money']) || ''}
                        formSetter={(ev)=>setLimits({...limits, dailyLoss: {...limits.dailyLoss, money: handleNumber(ev.target.value)}})}
                    />
                </div>
            </div>

            <div className="buttons-wrap">
                <button type="submit" className="button">Salvar</button>
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
