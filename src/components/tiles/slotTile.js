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
            
            if (runned.data.success) slot.status = 'running';
        } catch(err) {
            throw err;
        }
    }

    return (
        <div className="item card slot-display">
            <div className="tile-header">
                <h4 className="title">{slot.name} <span className="badge" type={slot.status}>{slot.status}</span></h4>
                <button type="button" className="circle-button" btn-color="error">X</button>
                <button type="button" className="circle-button" btn-color="success" onClick={() => runSlot(slot._id)}>{'>'}</button>
            </div>

            <div className="tile-content">
                <div className="content-info">
                    <p><b>Moeda:</b> {slot.assets}</p>
                    <p><b>Intervalo:</b> {slot.interval}</p>
                    <p><b>Trades Abertos:</b> 1</p>
                    <p><b>Lucro Realizado:</b> {toMoney(slot.totalRealizedProfit)}</p>
                </div>
                <div className="results">
                    <span className="pnl" state={state}>{toMoney(slot.pnl)}</span>
                </div>
            </div>
        </div>
    );
}
