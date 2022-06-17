import axios from 'axios';
import { useState } from 'react';
import {toMoney} from '../../utils/numbers';
import MainModal from '../modals/main';

export default function SlotTile({slot}) {
    const [stopSelect, setStopSelect] = useState(false);
    let state = '';
    if(slot.pnl > 0) state = 'profit';
    if(slot.pnl < 0) state = 'loss';

    async function runSlot() {
        try {
            const runned = await axios.post('/api/bot-account/run', {
                botAccountUID: slot._id,
                masterUID: slot.master,
                userUID: slot.user
            });
            
            if (runned.data.success) window.location.reload();
            else alert('Ocorreu um erro ao iniciar o slot!');
        } catch(err) {
            alert('Ocorreu um erro ao iniciar o slot!');
        }
    }

    async function stopSlot(type) {
        switch (type) {
            case 'await':
            case 'forced': break;
            default: {
                alert('The type of stop provided should be "await" or "forced"! But received ' + type);
                return;
            }
        }

        try {
            const stopping = await axios.post('/api/bot-account/stop', {
                type,
                slotUID: slot._id,
                masterUID: slot.master,
                userUID: slot.user
            });

            if (stopping.hasError) alert('Ocorreu um erro ao parar o slot!');
            setStopSelect(false);

        } catch(err) {
            alert('Ocorreu um erro ao parar o slot!');
        }
    }

    return (
        <div className="slot-display item card">
            <MainModal
                open={stopSelect}
                modalCtrl={setStopSelect}
                Content={()=>{
                    return (<>
                        <h4>Qual método de encerramento deseja utilizar:</h4>
                        <div className="options-list">
                            <button type="button" onClick={()=>stopSlot('await')}>
                                <p className="title">Esperar trades abertos</p>
                                <p>O slot só será desligado depois que a operação fechar normalmente.</p>
                            </button>
                            <button type="button" onClick={()=>stopSlot('forced')}>
                                <p className="title">Fechar trades</p>
                                <p>Todos os trades abertos no slot serão fechados.</p>
                            </button>
                        </div>
                    </>);
                }}
            />

            <div className="tile-header">
                <h4 className="title">{slot.name} <span className="badge" type={slot.status}>{slot.status}</span></h4>
                {slot.status !== 'stopped' && <button type="button" className="circle-button" btn-color="error" onClick={() => setStopSelect(true)}>X</button>}
                {slot.status !== 'running' && <button type="button" className="circle-button" btn-color="success" onClick={() => runSlot(slot._id)}>{'>'}</button>}
            </div>

            <div className="tile-content">
                <div className="content-info">
                    <p><b>Bot:</b> {slot.bot ? slot.bot.name : '---'}</p>
                    <p><b>Moeda:</b> {slot.assets}</p>
                    <p><b>Intervalo:</b> {slot.interval}</p>
                    <p><b>Lucro Realizado:</b> {toMoney(slot.totalRealizedPnl)}</p>
                </div>
                <div className="results">
                    <span className="pnl" state={state}>{toMoney(slot.pnl)}</span>
                </div>
            </div>

            {slot.trades.map(trade => {
                const createdAt = new Date(trade.createdAt);

                return (
                    <div key={trade._id} className="tile-footer">
                        <div className="trade-date footer-col">
                            <label>Abertura</label>
                            <p className="value">{createdAt.toLocaleDateString()} - {createdAt.toLocaleTimeString()}</p>
                        </div>
                        <div className="footer-col">
                            <label>Cotação</label>
                            <p className="value">{toMoney(trade.currentPrice)}</p>
                        </div>
                        <div className="footer-col">
                            <label>PNL</label>
                            <p className="value">{toMoney(trade.pnl)}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
