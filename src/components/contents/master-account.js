import ModalButton from '../buttons/modalButton';
import CreateBotAccount from '../forms/createBotAccount';
import TableFlex from '../displays/tableFlex';
import SlotTile from '../tiles/slotTile';
import {toMoney} from '../../utils/numbers';

export default function MasterAccount({ pageData, setPageData }) {
    const { master, user } = pageData || {};

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
                        <span className="value">{'XXXXX'}</span>
                        <label>PNL em Aberto</label>
                    </div>
                    <div className="card card-grad">
                        <span className="value">{'XXXXX'}</span>
                        <label>Lucro Realizado</label>
                    </div>
                    <div className="card card-grad">
                        <span className="value">{'XXXXX'}</span>
                        <label>Acertos/Erros</label>
                    </div>
                </div>
            </section>

            <section className="content-sidebar">
                <div className="content">
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
