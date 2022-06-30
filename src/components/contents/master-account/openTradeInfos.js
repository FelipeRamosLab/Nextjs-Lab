import { useState } from 'react';
import MainModal from '../../modals/main';

export default function OpenTradeInfo({trade}) {
    const [ modal, setModal ] = useState(false);
    const createdAt = new Date(trade.createdAt);
    const side = validateProp(trade, ['positionType']) && trade.positionType === 'long' ? 'Long' : 'Short';

    return (
        <div className="tile-footer" onClick={() => setModal(!modal)}>
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

            <MainModal open={modal} modalCtrl={setModal} Content={()=>{
                console.log(trade)
                return (<>
                    gfsdghfhfdshdjkf
                </>)
            }} />
        </div>
    );
}