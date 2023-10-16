import { useState, useContext } from 'react';
import AJAX from '../../utils/ajax';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import ActivityDataContext from '../../context/activityData';

export default function TransferPainel({master, transferType, setTransferType}) {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const [transferValue, setTranferValue] = useState('');

    function transferInput(ev) {
        const value = Number(ev.target.value);

        if (!isNaN(value)) setTranferValue(value);
        else alert('Trasfer input is not a number!');
    }

    async function sendTransfer(ev) {
        ev.preventDefault();
        setTransferType('loading');
        const toSend = {
            master: master._id,
            type: transferType,
            value: transferValue
        }
        
        try {
            const master = await new AJAX('/transfer/deposit-withdraw/').put(toSend);

            setTransferType('success');
            setActivityData({...activityData, master: master.data});
            setTimeout(() => setTransferType(false), 3000);
        } catch(err) {
            setTransferType('error');
            setTimeout(() => setTransferType(false), 3000);
            console.error(err);
        }
    }

    return (<div className="content-wrap">
        {transferType && transferType !== 'loading' && transferType !== 'success' && transferType !== 'error' && (
            <form className="deposit-withdraw" onSubmit={(ev) => sendTransfer(ev)}>
                <input type="text" inputMode="numeric" value={transferValue} onChange={(ev) => transferInput(ev)} placeholder="Valor a depositar/sacar..." />

                <button type="submit" className="transfer-btn button transparent">
                    <FaCheckCircle className="circle-button reverse" btn-color="success" />
                </button>
                <button type="reset" className="transfer-btn button transparent" onClick={() => setTransferType(false)}>
                    <FaTimesCircle className="circle-button reverse" btn-color="error" />
                </button>
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
    </div>);
}
