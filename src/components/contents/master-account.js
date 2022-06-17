import { useState } from 'react';
import ModalButton from '../buttons/modalButton';
import CreateBotAccount from '../forms/createBotAccount';
import TableFlex from '../displays/tableFlex';
import SlotTile from '../tiles/slotTile';
import {toMoney} from '../../utils/numbers';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function MasterAccount({ pageData, setPageData }) {
    const [transferValue, setTranferValue] = useState('');
    const [transferType, setTranferType] = useState(false);
    const { master, user } = pageData || {};

    function transferInput(ev) {
        const value = Number(ev.target.value);
        
        if (!isNaN(value)) setTranferValue(value);
        else alert('Trasfer input is not a number!');
    }

    return (
        <div className="container">
            <ModalButton className="circle-button add-button floating" ModalContent={CreateBotAccount} pageData={pageData} setPageData={setPageData}>+</ModalButton>
            
            <section className="content-fullwidth">
                <div className="section-header">
                    <h1>{master.name}</h1>
                    <ModalButton className="button transparent" ModalContent={CreateBotAccount}>Editar</ModalButton>
                </div>
                <div className="result-cards">
                    <div className="card card-grad">
                        <span className="value">{toMoney(master.pnl)}</span>
                        <label>PNL Acumulado</label>
                    </div>
                    <div className="card card-grad">
                        <span className="value">{toMoney(master.futuresWallet.totalMarginBalance)}</span>
                        <label>Margem Total</label>
                    </div>
                    <div className="card card-grad">
                        <span className="value">{toMoney(master.futuresWallet.totalUnrealizedProfit)}</span>
                        <label>Não Realizado</label>
                    </div>
                    <div className="card card-grad">
                        <span className="value">{toMoney(master.futuresWallet.totalRealizedPnl)}</span>
                        <label>Lucro Realizado</label>
                    </div>
                </div>
            </section>

            <section className="content-sidebar">
                <div className="content">
                    {transferType && <div className="deposit-withdraw">
                        <input type="text" inputMode="numeric" value={transferValue} onChange={(ev) => transferInput(ev)} placeholder="Valor a depositar/sacar..." />
                        <button className="transfer-btn button transparent"><FaCheckCircle className="circle-button" btn-color="success" /></button>
                        <button className="transfer-btn button transparent" onClick={() => setTranferType(false)}><FaTimesCircle className="circle-button" btn-color="error" /></button>
                    </div>}

                    {!transferType && <div className="deposit-withdraw">
                        <button type="button" className="button full-width outlined transparent small" onClick={() => setTranferType('deposit')}>Deposito</button>
                        <button type="button" className="button full-width outlined transparent small" onClick={() => setTranferType('withdraw')}>Saque</button>
                    </div>}

                    <div className="wallet">
                        <TableFlex
                            data={[
                                [ 'Avalancagem Max.', master.limits.leverege + 'x' ],
                                [ 'Prejuízo Max. (Mensal)', '10%' ],
                                [ 'Prejuízo Max. (Diário)', '5%' ]
                            ]}
                            lableClass="label"
                            valueClass="value"
                        />

                        <button type="button" className="button full-width top-border transparent small">Ver Mais</button>
                    </div>

                    <div className="section-header">
                        <h2>Gráfico PNL Acumulado</h2>
                    </div>

                    <div className="chart-wrap">
                        <button type="button" className="button full-width top-border transparent small">Abrir Gráfico</button>
                    </div>

                    <div className="section-header">
                        <h2>Slots</h2>
                    </div>

                    <div className="slots-list standard-grid grid columns-1">
                        {master.botAccounts.map(slot => <SlotTile key={slot._id} slot={slot}/> )}
                        <button
                            type="button"
                            className="button full-width top-border transparent small"
                        >Ver Mais</button>
                    </div>
                </div>

                <div className="sidebar">
                    
                </div>
            </section>
        </div>
    );
}
