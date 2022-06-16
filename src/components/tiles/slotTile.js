import axios from 'axios';
import {toMoney} from '../../utils/numbers';

export default function SlotTile({slot}) {
    let state = '';
    if(slot.pnl > 0) state = 'profit';
    if(slot.pnl < 0) state = 'loss';

    async function runSlot() {
        try {
            const runned = await axios.post('/api/bot-account/run', {
                botAccountUID: slot._id,
                masterUID: slot.master._id,
                userUID: slot.user._id
            });
            
            if (runned.data.success) window.location.reload();
            else alert('Ocorreu um erro ao iniciar o slot!');
        } catch(err) {
            alert('Ocorreu um erro ao iniciar o slot!');
        }
    }

    return (
        <div className="slot-display item card">
            <div className="tile-header">
                <h4 className="title">{slot.name} <span className="badge" type={slot.status}>{slot.status}</span></h4>
                {slot.status !== 'stopped' && <button type="button" className="circle-button" btn-color="error">X</button>}
                {slot.status !== 'running' && <button type="button" className="circle-button" btn-color="success" onClick={() => runSlot(slot._id)}>{'>'}</button>}
            </div>

            <div className="tile-content">
                <div className="content-info">
                    <p><b>Bot:</b> {slot.bot ? slot.bot.name : '---'}</p>
                    <p><b>Moeda:</b> {slot.assets}</p>
                    <p><b>Intervalo:</b> {slot.interval}</p>
                    <p><b>Lucro Realizado:</b> {toMoney(slot.totalRealizedProfit)}</p>
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
