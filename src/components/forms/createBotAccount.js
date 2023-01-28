import { useState } from 'react';
import axios from 'axios';
import SuggestionsSelect from '../inputs/suggestionsSelect';
import ErrorList from '../common/errorList';
import Input from '../inputs/input';

export default function CreateBotAccount({pageData, setPageData, modalCtrl}) {
    const [error, setError] = useState();
    const [spinner, setSpinner] = useState(false);
    const [form, setForm] = useState({
        user: pageData && pageData.user._id,
        master: pageData && pageData.master._id,
        name: '',
        type: 'slot-demo',
        assets: [],
        interval: '15m',
        limits: {
            tradeLoss: { percent: 1 },
            dailyLoss: { percent: 3 },
            monthlyLoss: { percent: 9 },
            tradeGain: { percent: 3 },
            dailyGain: { percent: 6 },
            monthlyGain: { percent: 30 },
        },
        walletAllocation: 0
    });

    async function create(ev) {
        ev.preventDefault();
        setSpinner(true);

        try {
            const saved = await axios.post('/api/bot-account/create', form);

            setPageData(prev => {
                return {...prev, botAccounts: [...prev.master.botAccounts, saved.data.botAccount]}
            });
            modalCtrl(false);
        } catch({response: {data}}) {
            setError(data);
            throw data;
        } finally {
            setSpinner(false);
        }
    }

    if (error) {
        return (<div className="error">
            <ErrorList error={error} />
        </div>);
    }

    if (!spinner) {
        return (<form onSubmit={(ev)=>create(ev)}>
            <h2 className="title">Criar Slot</h2>

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
                    <option value="1s">1s</option>
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

            <div className="field-group">
                <Input
                    type="number"
                    label="Prejuízo Mensal (%):"
                    value={form?.limits?.monthlyLoss?.percent || 0}
                    formSetter={(ev) => setForm(prev => {
                        return {
                            ...prev,
                            limits: {
                                ...prev.limits,
                                monthlyLoss: {
                                    ...prev.limits.monthlyLoss,
                                    percent: Number(ev.target.value)
                                }
                            }
                        };
                    }) || ''}
                />
                <Input
                    type="number"
                    label="Prejuízo Mensal ($):"
                    value={form?.limits?.monthlyLoss?.money || 0}
                    formSetter={(ev) => setForm(prev => {
                        return {
                            ...prev,
                            limits: {
                                ...prev.limits,
                                monthlyLoss: {
                                    ...prev.limits.monthlyLoss,
                                    money: Number(ev.target.value)
                                }
                            }
                        };
                    }) || ''}
                />
            </div>
            <div className="field-group">
                <Input
                    type="number"
                    label="Prejuízo Diário (%):"
                    value={form?.limits?.dailyLoss?.percent || 0}
                    formSetter={(ev) => setForm(prev => {
                        return {
                            ...prev,
                            limits: {
                                ...prev.limits,
                                dailyLoss: {
                                    ...prev.limits.dailyLoss,
                                    percent: Number(ev.target.value)
                                }
                            }
                        };
                    }) || ''}
                />
                <Input
                    type="number"
                    label="Prejuízo Diário ($):"
                    value={form?.limits?.dailyLoss?.money || 0}
                    formSetter={(ev) => setForm(prev => {
                        return {
                            ...prev,
                            limits: {
                                ...prev.limits,
                                dailyLoss: {
                                    ...prev.limits.dailyLoss,
                                    money: Number(ev.target.value)
                                }
                            }
                        };
                    }) || ''}
                />
            </div>
            <div className="field-group">
                <Input
                    type="number"
                    label="Prejuízo por Trade (%):"
                    value={form?.limits?.tradeLoss?.percent || 0}
                    formSetter={(ev) => setForm(prev => {
                        return {
                            ...prev,
                            limits: {
                                ...prev.limits,
                                tradeLoss: {
                                    ...prev.limits.tradeLoss,
                                    percent: Number(ev.target.value)
                                }
                            }
                        };
                    }) || ''}
                />
                <Input
                    type="number"
                    label="Prejuízo por Trade ($):"
                    value={form?.limits?.tradeLoss?.money || 0}
                    formSetter={(ev) => setForm(prev => {
                        return {
                            ...prev,
                            limits: {
                                ...prev.limits,
                                tradeLoss: {
                                    ...prev.limits.tradeLoss,
                                    money: Number(ev.target.value)
                                }
                            }
                        };
                    }) || ''}
                />
            </div>
            <div className="field-group">
                <Input
                    type="number"
                    label="Lucro Mensal (%):"
                    value={form?.limits?.monthlyGain?.percent || 0}
                    formSetter={(ev) => setForm(prev => {
                        return {
                            ...prev,
                            limits: {
                                ...prev.limits,
                                monthlyGain: {
                                    ...prev.limits.monthlyGain,
                                    percent: Number(ev.target.value)
                                }
                            }
                        };
                    }) || ''}
                />
                <Input
                    type="number"
                    label="Lucro Mensal ($):"
                    value={form?.limits?.monthlyGain?.money || 0}
                    formSetter={(ev) => setForm(prev => {
                        return {
                            ...prev,
                            limits: {
                                ...prev.limits,
                                monthlyGain: {
                                    ...prev.limits.monthlyGain,
                                    money: Number(ev.target.value)
                                }
                            }
                        };
                    }) || ''}
                />
            </div>
            <div className="field-group">
                <Input
                    type="number"
                    label="Lucro Diário (%):"
                    value={form?.limits?.dailyGain?.percent || 0}
                    formSetter={(ev) => setForm(prev => {
                        return {
                            ...prev,
                            limits: {
                                ...prev.limits,
                                dailyGain: {
                                    ...prev.limits.dailyGain,
                                    percent: Number(ev.target.value)
                                }
                            }
                        };
                    }) || ''}
                />
                <Input
                    type="number"
                    label="Lucro Diário ($):"
                    value={form?.limits?.dailyGain?.money || 0}
                    formSetter={(ev) => setForm(prev => {
                        return {
                            ...prev,
                            limits: {
                                ...prev.limits,
                                dailyGain: {
                                    ...prev.limits.dailyGain,
                                    money: Number(ev.target.value)
                                }
                            }
                        };
                    }) || ''}
                />
            </div>
            <div className="field-group">
                <Input
                    type="number"
                    label="Lucro por Trade (%):"
                    value={form?.limits?.tradeGain?.percent || 0}
                    formSetter={(ev) => setForm(prev => {
                        return {
                            ...prev,
                            limits: {
                                ...prev.limits,
                                tradeGain: {
                                    ...prev.limits.tradeGain,
                                    percent: Number(ev.target.value)
                                }
                            }
                        };
                    }) || ''}
                />
                <Input
                    type="number"
                    label="Lucro por Trade ($):"
                    value={form?.limits?.tradeGain?.money || 0}
                    formSetter={(ev) => setForm(prev => {
                        return {
                            ...prev,
                            limits: {
                                ...prev.limits,
                                tradeGain: {
                                    ...prev.limits.tradeGain,
                                    money: Number(ev.target.value)
                                }
                            }
                        };
                    }) || ''}
                />
            </div>

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
