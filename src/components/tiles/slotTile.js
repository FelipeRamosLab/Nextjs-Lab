import {toMoney} from '../../utils/numbers';

export default function SlotTile({slot}) {
    let state = '';
    if(slot.pnl > 0) state = 'profit';
    if(slot.pnl < 0) state = 'loss';

    return (
        <div className="no-padding item card bot-account-display">
            <div className="tile-header"></div>

            <div className="tile-content">
                <span className="title">{slot.cod} - {slot.name}</span> <span className="badge" type={slot.status}>{slot.status}</span>
                <p><b>Moeda:</b> {slot.assets}</p>
            </div>
        </div>
    );
}
