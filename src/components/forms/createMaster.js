import { useEffect, useState } from 'react';
import axios from 'axios';
import Input from '../inputs/input';
import ModalSelect, {ModalSelectOptionModel as SelectOption} from '../inputs/modalSelect';

export default function CreateMaster({pageData, initialData}) {
    const [errCallback, setErrCallback] = useState();
    const [spinner, setSpinner] = useState(false);
    const [limits, setLimits] = useState({
        monthlyLoss: {},
        dailyLoss: {},
        tradeLoss: {},
        monthlyGain: {},
        dailyGain: {},
        tradeGain: {},
    });
    const [form, setForm] = useState({
        user: process.env.userTest,
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
        } catch({response: {data}}) {
            setErrCallback(data);
            throw data;
        } finally {
            setSpinner(false);
        }
    }

    async function edit(ev) {
        ev.preventDefault();
    }

    if (!spinner) {
        if (errCallback) {
            const validationErrors = errCallback.validationErrors;
            const errors = errCallback.errors;
            const errorsLength = errors && errCallback.errors.length;
            const valitationErrorsLength = validationErrors && validationErrors.length;

            return (<div className="error">
                <h3 className="title">{valitationErrorsLength ? 'Incorrect/Missing data' : 'Something went wrong!'}</h3>
                <div className="error-list">
                    {errorsLength && errors.map((err, i) => {
                        if (i === 0) return (<p key={errCallback.name + i}>{err.message}</p>);
                    })}
                    {errors.length && validationErrors.map((err, i) => {
                        return (<p key={errCallback.name + i}>{err.message}</p>);
                    })}
                </div>

                <button type="button" className="button" onClick={() => setErrCallback(null)}>Voltar</button>
            </div>);
        } else {
            return (<form onSubmit={(ev)=>{
                if (!initialData) create(ev);
                else edit(ev);
            }}>
                <h2 className="title">Criar conta</h2>

                <Input
                    label="Nome:"
                    value={validateProp(form, ['name']) || validateProp(initialData, ['name']) || ''} 
                    formSetter={(ev)=>setForm({...form, name: ev.target.value})} 
                />
                {!initialData && <Input
                    type="number"
                    label="Depósito inicial:"
                    value={validateProp(form, ['initialBalance']) || validateProp(initialData, ['initialBalance']) || ''}
                    formSetter={(ev)=>setForm({...form, initialBalance: Number(ev.target.value)})}
                />}

                {!initialData && <ModalSelect
                    label="Tipo de conta:"
                    getter={validateProp(form, ['type']) || validateProp(initialData, ['type']) || ''}
                    setter={(value)=>setForm({...form, type: value})}
                    options={[
                        new SelectOption({title: 'Conta Demo', value: 'master-demo'}),
                        new SelectOption({title: 'Conta Real', value: 'master-live'})
                    ]}
                />}

                <div className="limits fields-wrap">
                    <h4 className="group-title">Limites da conta</h4>

                    <Input
                        type="number"
                        label="Alavancagem Máxima:"
                        value={validateProp(limits, ['leverege']) || validateProp(initialData, ['limits', 'leverege']) || ''}
                        formSetter={(ev)=>setLimits({...limits, leverege: handleLeverege(ev.target.value)})}
                    />

                    <div className="field-group">
                        <Input
                            type="number"
                            label="Prejuízo Mensal (%):"
                            value={validateProp(limits, ['monthlyLoss', 'percent']) || ''}
                            formSetter={(ev)=>setLimits({...limits, monthlyLoss: {...limits.monthlyLoss, percent: handleNumber(ev.target.value)}}) || ''}
                        />
                        <Input
                            type="number"
                            label="Prejuízo Mensal ($):"
                            value={validateProp(limits, ['monthlyLoss', 'money'])  || ''}
                            formSetter={(ev)=>setLimits({...limits, monthlyLoss: {...limits.monthlyLoss, money: handleNumber(ev.target.value)}}) || ''}
                        />
                    </div>
                    <div className="field-group">
                        <Input
                            type="number"
                            label="Prejuízo Diário (%):"
                            value={validateProp(limits, ['dailyLoss', 'percent']) || ''}
                            formSetter={(ev)=>setLimits({...limits, dailyLoss: {...limits.dailyLoss, percent: handleNumber(ev.target.value)}}) || ''}
                        />
                        <Input
                            type="number"
                            label="Prejuízo Diário ($):"
                            value={validateProp(limits, ['dailyLoss', 'money']) || ''}
                            formSetter={(ev)=>setLimits({...limits, dailyLoss: {...limits.dailyLoss, money: handleNumber(ev.target.value)}}) || ''}
                        />
                    </div>
                    <div className="field-group">
                        <Input
                            type="number"
                            label="Prejuízo por Trade (%):"
                            value={validateProp(limits, ['tradeLoss', 'percent']) || ''}
                            formSetter={(ev)=>setLimits({...limits, tradeLoss: {...limits.tradeLoss, percent: handleNumber(ev.target.value)}}) || ''}
                        />
                        <Input
                            type="number"
                            label="Prejuízo por Trade ($):"
                            value={validateProp(limits, ['tradeLoss', 'money']) || ''}
                            formSetter={(ev)=>setLimits({...limits, tradeLoss: {...limits.tradeLoss, money: handleNumber(ev.target.value)}}) || ''}
                        />
                    </div>
                    <div className="field-group">
                        <Input
                            type="number"
                            label="Lucro Mensal (%):"
                            value={validateProp(limits, ['monthlyGain', 'percent']) || ''}
                            formSetter={(ev)=>setLimits({...limits, monthlyGain: {...limits.monthlyGain, percent: handleNumber(ev.target.value)}}) || ''}
                        />
                        <Input
                            type="number"
                            label="Lucro Mensal ($):"
                            value={validateProp(limits, ['monthlyGain', 'money'])  || ''}
                            formSetter={(ev)=>setLimits({...limits, monthlyGain: {...limits.monthlyGain, money: handleNumber(ev.target.value)}}) || ''}
                        />
                    </div>
                    <div className="field-group">
                        <Input
                            type="number"
                            label="Lucro Diário (%):"
                            value={validateProp(limits, ['dailyGain', 'percent']) || ''}
                            formSetter={(ev)=>setLimits({...limits, dailyGain: {...limits.dailyGain, percent: handleNumber(ev.target.value)}}) || ''}
                        />
                        <Input
                            type="number"
                            label="Lucro Diário ($):"
                            value={validateProp(limits, ['dailyGain', 'money']) || ''}
                            formSetter={(ev)=>setLimits({...limits, dailyGain: {...limits.dailyGain, money: handleNumber(ev.target.value)}}) || ''}
                        />
                    </div>
                    <div className="field-group">
                        <Input
                            type="number"
                            label="Lucro por Trade (%):"
                            value={validateProp(limits, ['tradeGain', 'percent']) || ''}
                            formSetter={(ev)=>setLimits({...limits, tradeGain: {...limits.tradeGain, percent: handleNumber(ev.target.value)}}) || ''}
                        />
                        <Input
                            type="number"
                            label="Lucro por Trade ($):"
                            value={validateProp(limits, ['tradeGain', 'money'])  || ''}
                            formSetter={(ev)=>setLimits({...limits, tradeGain: {...limits.tradeGain, money: handleNumber(ev.target.value)}}) || ''}
                        />
                    </div>
                </div>

                <div className="buttons-wrap">
                    <button type="submit" className="button">Salvar</button>
                </div>
            </form>);
        }
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
