import { useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function TransferPainel({master}) {
    const [transferValue, setTranferValue] = useState('');
    const [transferType, setTranferType] = useState(false);

    function transferInput(ev) {
        const value = Number(ev.target.value);

        if (!isNaN(value)) setTranferValue(value);
        else alert('Trasfer input is not a number!');
    }

    async function sendTransfer(ev) {
        ev.preventDefault();
        setTranferType('loading');
        const toSend = {
            userUID: master.user._id,
            masterUID: master._id,
            type: transferType,
            value: transferValue
        }
        
        try {
            await axios.post('/api/transfer/deposit-withdraw/', toSend);
            setTranferType('success');
            setTimeout(() => setTranferType(false), 3000);
        } catch(err) {
            setTranferType('error');
            setTimeout(() => setTranferType(false), 3000);
            console.error(err);
        }
    }

    return (<div className="content-wrap">
        {transferType && transferType !== 'loading' && transferType !== 'success' && transferType !== 'error' && (
            <form className="deposit-withdraw" onSubmit={(ev) => sendTransfer(ev)}>
                <input type="text" inputMode="numeric" value={transferValue} onChange={(ev) => transferInput(ev)} placeholder="Valor a depositar/sacar..." />

                <button type="submit" className="transfer-btn button transparent"><FaCheckCircle className="circle-button" btn-color="success" /></button>
                <button type="reset" className="transfer-btn button transparent" onClick={() => setTranferType(false)}><FaTimesCircle className="circle-button" btn-color="error" /></button>
            </form>
        )}

        {transferType === 'loading' && <div className="deposit-withdraw">
            <h4 className="callback">Enviando...</h4>
        </div>}

        {transferType === 'success' && <div className="deposit-withdraw">
            <h4 className="callback">Seu depósito foi realizado com sucesso!</h4>
        </div>}

        {transferType === 'error' && <div className="deposit-withdraw">
            <h4 className="callback">Ocorreu um erro ao realizar o depósito!</h4>
        </div>}

        {!transferType && <div className="deposit-withdraw">
            <button type="button" className="button full-width outlined transparent small" onClick={() => setTranferType('deposit')}>Depósito</button>
            <button type="button" className="button full-width outlined transparent small" onClick={() => setTranferType('withdraw')}>Saque</button>
        </div>}
    </div>);
}
