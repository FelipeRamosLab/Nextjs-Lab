import { useState } from 'react';
import PositionDetails from '../../modals/PositionDetails';

export default function OpenTradeInfo({trade, ...props}) {
    const [ positionModal, setPositionModal ] = useState(null);
    const createdAt = new Date(trade.createdAt);
    const side = validateProp(trade, ['positionType']) && trade.positionType === 'long' ? 'Long' : 'Short';

    if (Object.keys(trade).length) {
        return (<>
            <div key={Math.random()} className="tile-footer" onClick={() => setPositionModal(trade)}>
                <div className="footer-col align-left position-side" btn-color={side === 'Long' ? 'success' : 'error'}></div>
                <div className="footer-col align-left">
                    <label>COD</label>
                    <p className="value">{validateProp(trade, ['cod'])}</p>
                </div>
                <div className="footer-col stretch">
                    <label>Abertura</label>
                    <p className="value">{createdAt.toLocaleDateString()} - {createdAt.toLocaleTimeString()}</p>
                </div>
                <div className="footer-col">
                    <label>Cotação</label>
                    <p className="value">{toMoney(trade, ['currentPrice'])}</p>
                </div>
                <div className="footer-col">
                    <label>PNL</label>
                    <p className="value">{toMoney(trade, ['pnl'])}</p>
                </div>
            </div>

            <PositionDetails positionModal={positionModal} setPositionModal={setPositionModal} />
        </>);
    } else {
        return <input key={trade.cod} type="hidden" />;
    }
}