import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BotThread from '../botThread/BotThread';
import BotValue from '../../core/EvalThread/BotValue';
import BotValueEl from '../../components/botThread/BotValueEl';

const events = {
    openLong: 'Open long', 
    openShort: 'Open short', 
    closeLong: 'Close long', 
    closeShort: 'Close short',
    trailingStop: 'Trailing stop'
};

export default function CreateBot({pageData}) {
    const takeProfitDOM = useRef();
    const [spinner, setSpinner] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState({});
    const [threadCtrl, setThreadCtrl] = useState();
    const [error, setError] = useState();
    const [form, setForm] = useState({
        author: pageData && pageData.user._id,
        name: '',
        description: '',
        values: {},
        eval: {}
    });

    console.log('createBot form:', form);

    useEffect(() => {
        addBotValue('stoploss_long');
        addBotValue('stoploss_short');
    }, []);

    async function create(ev) {
        ev.preventDefault();
        setSpinner(true);

        try {
            const saved = await axios.post('/api/bot/create', form);
            window.location.reload();
        } catch({response: {data}}) {
            setError(data);
            throw data;
        } finally {
            setSpinner(false);
        }
    }

    function handleCheckbox(ev, botEvent) {
        if (ev.target.checked){
            setSelectedEvents(prev => new Object({...prev, [botEvent]: true }));
        } else {
            setSelectedEvents(prev => new Object({...prev, [botEvent]: false }));
            setForm(prev => {
                delete prev.eval[botEvent];
                return prev;
            });
        }
    }

    function addBotValue(propName) {
        const self = this;

        setForm(prev => {
            prev.values[propName] = new BotValue({slug: propName, state: [form, setForm]}, () => self);
            return {...prev};
        });
    }

    if (!spinner) {
        if (!error) {
            return (<form className="form-create-bot" onSubmit={(ev)=>create(ev)}>
                <h2 className="title">Criar Bot Configs</h2>

                <fieldset>
                    <label>Nome:</label>
                    <input type="text" value={form.name} onChange={(ev)=>setForm({...form, name: ev.target.value})} />
                </fieldset>
                <fieldset className="vertical-flex">
                    <label>Descrição:</label>
                    <textarea value={form.description} onChange={(ev)=>setForm({...form, description: ev.target.value})}></textarea>
                </fieldset>

                <fieldset className="vertical-flex eval-fields">
                    <div className="section-header">
                        <h3>Valores</h3>
                    </div>
                    <hr/>

                    <details className="card bot-value stop-loss">
                        <summary>
                            Stoploss
                            <button type="button" className="add-button button transparent" onClick={() => {
                                addBotValue('stoploss_long');
                                addBotValue('stoploss_short');
                            }}>Reset</button>
                        </summary>
                        
                        <div className="wrap-config">
                            <h4 className="title">Long position</h4>

                            {form.values['stoploss_long'] && <BotValueEl
                                pageData={pageData}
                                currentEl={form.values['stoploss_long']}
                            />}
                        </div>
                        <div className="wrap-config">
                            <h4 className="title">Short position</h4>

                            {form.values['stoploss_short'] && <BotValueEl
                                pageData={pageData}
                                currentEl={form.values['stoploss_short']}
                            />}
                        </div>
                    </details>

                    <details ref={takeProfitDOM} className="card bot-value take-profit">
                        <summary>
                            Takeprofit

                            <button type="button" className="add-button button transparent" onClick={() => {
                                addBotValue('takeprofit_long');
                                addBotValue('takeprofit_short');
                                takeProfitDOM.current.setAttribute('open', 'true');
                            }}>Add</button>
                        </summary>

                        <div className="wrap-config">
                            <h4 className="title">Long position</h4>

                            {form.values['takeprofit_long'] && <BotValueEl
                                pageData={pageData}
                                currentEl={form.values['takeprofit_long']}
                            />}
                        </div>
                        <div className="wrap-config">
                            <h4 className="title">Short position</h4>

                            {form.values['takeprofit_short'] && <BotValueEl
                                pageData={pageData}
                                currentEl={form.values['takeprofit_short']}
                            />}
                        </div>
                    </details>
                </fieldset>

                <fieldset className="vertical-flex eval-fields">
                    <div className="section-header">
                        <h3>Avaliações</h3>
                    </div>
                    <hr/>

                    {Object.keys(events).map((key, i) => (
                        <div key={key + i} className="bot-thread">
                            <input id={key + i} type="checkbox" onClick={(ev) => handleCheckbox(ev, key)} defaultChecked={selectedEvents[key] || false} />
                            <label htmlFor={key + i}>{events[key]}</label>

                            {selectedEvents[key] && (<>
                                <button type="button" className="edit-button button" onClick={() => setThreadCtrl(key)}>Editar Thread</button>
                                <BotThread pageData={pageData} formState={[form, setForm]} actionEvent={key} threadCtrlState={[threadCtrl, setThreadCtrl]} />
                            </>)}
                        </div>
                    ))}
                </fieldset>

                <div className="buttons-wrap">
                    <button type="submit" className="button">Confirmar</button>
                </div>
            </form>);
        } else {
            return (<div className="error">
                <ul className="error-list">
                    {error.errors && error.errors.map((err, i) => {
                        return (<li key={error.name + i}>{err.message}</li>);
                    })}
                </ul>

                <button type="button" className="button" onClick={() => setError(null)}>Voltar</button>
            </div>);
        }
    } else {
        return (<div>
            <h2>Salvando...</h2>
        </div>)
    }
}
