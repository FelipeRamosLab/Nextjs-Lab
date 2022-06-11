import { useState } from 'react';
import axios from 'axios';
import SuggestionsSelect from '../inputs/suggestionsSelect';

export default function CreateBotAccount({pageData, setPageData, modalCtrl}) {
    const [spinner, setSpinner] = useState(false);
    const [form, setForm] = useState({
        user: pageData && pageData.user._id,
        master: pageData && pageData.master._id,
        name: '',
        type: 'demo',
        assets: [],
        interval: '1h',
        limits: {},
        walletAllocation: 0
    });

    async function create(ev) {
        ev.preventDefault();
        setSpinner(true);

        try {
            const saved = await axios.post('/api/bot-account/create', form);
            const updateState = {...pageData};
            updateState.master.botAccounts.push(saved.data.botAccount);

            setPageData(updateState);
            modalCtrl(false);
        } catch(err) {
            throw err;
        }
    }

    if (!spinner) {
        return (<form onSubmit={(ev)=>create(ev)}>
            <h2 className="title">Criar Bot</h2>

            <fieldset>
                <label>Nome:</label>
                <input type="text" value={form.name} onChange={(ev)=>setForm({...form, name: ev.target.value})} />
            </fieldset>

            <fieldset>
                <label>Moeda:</label>
                <input type="text" value={form.assets} onChange={(ev)=>setForm({...form, assets: [ev.target.value.toUpperCase()]})} />
            </fieldset>

            <fieldset>
                <label>Alocação da carteira (%):</label>
                <input type="number" value={form.walletAllocation} onChange={(ev)=>setForm({...form, walletAllocation: Number(ev.target.value)})} />
            </fieldset>

            <fieldset>
                <label>Tempo gráfico:</label>
                <select value={form.interval} onChange={(ev)=>setForm({...form, interval: ev.target.value.toLowerCase()})}>
                    <option value="1m">1m</option>
                    <option value="3m">3m</option>
                    <option value="5m">5m</option>
                    <option value="15m">15m</option>
                    <option value="30m">30m</option>
                    <option value="1h">1h</option>
                    <option value="2h">2h</option>
                    <option value="4h">4h</option>
                    <option value="6h">6h</option>
                    <option value="8h">8h</option>
                    <option value="12h">12h</option>
                    <option value="1d">1d</option>
                    <option value="3d">3d</option>
                </select>
            </fieldset>

            <SuggestionsSelect
                label="Escolher bot:"
                valueLabel="name"
                mySuggestionsPath="/api/bot/myBots"
                setValue={(item)=>{
                    setForm({...form, bot: item._id})
                }}
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
