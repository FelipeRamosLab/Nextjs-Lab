import { useState } from 'react';
import axios from 'axios';
import SuggestionsSelect from '../inputs/suggestionsSelect';
import BotThread from '../botThread/BotThread';

const events = ['openLong', 'closeLong', 'openShort', 'closeShort']

export default function CreateBot({pageData}) {
    const [spinner, setSpinner] = useState(false);
    const [threadCtrl, setThreadCtrl] = useState([]);
    const [form, setForm] = useState({
        author: pageData && pageData.user._id,
        name: '',
        description: '',
        eval: {}
    });
    console.log(form)
    async function create(ev) {
        ev.preventDefault();
        setSpinner(true);

        try {
            const saved = await axios.post('/api/bot/create', form);
            window.location.reload();
        } catch(err) {
            throw err;
        }
    }

    if (!spinner) {
        return (<form onSubmit={(ev)=>create(ev)}>
            <h2 className="title">Criar Bot Configs</h2>

            <fieldset>
                <label>Nome:</label>
                <input type="text" value={form.name} onChange={(ev)=>setForm({...form, name: ev.target.value})} />
            </fieldset>
            <fieldset className="vertical-flex">
                <label>Descrição:</label>
                <textarea value={form.description} onChange={(ev)=>setForm({...form, description: ev.target.value})}></textarea>
            </fieldset>

            <fieldset className="vertical-flex">
                <div className="section-header">
                    <h3>Avaliações</h3>
                </div>
                <hr/>

                <label>Open Long:</label>
                <button type="button" className="button" onClick={() => setThreadCtrl('openLong')}>Editar Thread</button>
                <BotThread pageData={pageData} formState={[form, setForm]} actionEvent="openLong" threadCtrlState={[threadCtrl, setThreadCtrl]} />

                <label>Open Short:</label>
                <button type="button" className="button" onClick={() => setThreadCtrl('openShort')}>Editar Thread</button>
                <BotThread pageData={pageData} formState={[form, setForm]} actionEvent="openShort" threadCtrlState={[threadCtrl, setThreadCtrl]} />

                <label>Stop Loss: (Long)</label>
                <button type="button" className="button" onClick={() => setThreadCtrl('stopLossLong')}>Editar Thread</button>
                <BotThread pageData={pageData} formState={[form, setForm]} actionEvent="stopLossLong" threadCtrlState={[threadCtrl, setThreadCtrl]} />

                <label>Stop Loss: (Short)</label>
                <button type="button" className="button" onClick={() => setThreadCtrl('stopLossShort')}>Editar Thread</button>
                <BotThread pageData={pageData} formState={[form, setForm]} actionEvent="stopLossShort" threadCtrlState={[threadCtrl, setThreadCtrl]} />
            </fieldset>

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
