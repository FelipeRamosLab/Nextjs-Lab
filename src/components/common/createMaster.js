import { useState } from 'react';
import axios from 'axios';

export default function CreateMaster({pageData}) {
    const [spinner, setSpinner] = useState(false);
    const [form, setForm] = useState({
        type: 'demo',
        name: '',
        initialBalance: 0
    });

    async function create(ev) {
        ev.preventDefault();
        setSpinner(true);

        try {
            await axios.post('/api/master-account/create', {body: form});
            window.location.reload();
        } catch(err) {
            throw err;
        }
        
    }

    if (!spinner) {
        return (<form onSubmit={(ev)=>create(ev)}>
            <h2 className="title">Criar conta</h2>

            <fieldset>
                <label>Nome:</label>
                <input type="text" value={form.name} onChange={(ev)=>setForm({...form, name: ev.target.value})} />
            </fieldset>
            <fieldset>
                <label>Depósito inicial:</label>
                <input type="number" value={form.initialBalance} onChange={(ev)=>setForm({...form, initialBalance: ev.target.value})} />
            </fieldset>
            <fieldset>
                <label>Tipo de conta:</label>
                <select value={form.type} onChange={(ev)=>setForm({...form, type: ev.target.value})}>
                    <option value="demo">Demo account</option>
                    <option value="live">Live account</option>
                </select>
            </fieldset>

            <div className="buttons-wrap">
                <button type="submit" className="add-button">Confirmar</button>
            </div>
        </form>);
    } else {
        return (<div>
            <h2>Salvando...</h2>
        </div>)
    }
}
