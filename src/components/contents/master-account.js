import ModalButton from '../buttons/modalButton';
import CreateBotAccount from '../forms/createBotAccount';
import TableFlex, { TableFlexData } from '../displays/tableFlex';

export default function MasterAccount({ pageData }) {
    const { master } = pageData || {};

    return (
        <div className="container">
            <section className="content-fullwidth">
                <div className="section-header">
                    <h2>{master.name} - {master.pnl.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}</h2>
                    <ModalButton className="add-button" ModalContent={CreateBotAccount}>Editar</ModalButton>
                </div>
                <hr />
            </section>
            <section className="content-sidebar">
                <div className="content">
                    <div className="section-header">
                        <h2>Gráfico PNL Acumulado</h2>
                    </div>
                    <hr />

                    <div className="section-header">
                        <h2>Bots da conta</h2>
                        <ModalButton className="add-button" ModalContent={CreateBotAccount} pageData={pageData}>Criar</ModalButton>
                    </div>
                    <hr />

                    <div className="standard-grid grid columns-1">
                        {master.botAccounts.map(botAcc => {
                            let state = '';
                            if(botAcc.pnl > 0) state = 'profit';
                            if(botAcc.pnl < 0) state = 'loss';

                            return (
                                <div key={botAcc._id} className="no-padding item card bot-account-display">
                                    <div className="tile-content">
                                        <span className="title">{botAcc.cod} - {botAcc.name}</span> <span className="badge" type={botAcc.status}>{botAcc.status}</span>
                                        <p><b>Moeda:</b> {botAcc.assets}</p>
                                    </div>
                                    <div className="tile-value" state={state}>
                                        <span className="pnl">{botAcc.pnl.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="sidebar">
                    <div className="wallet card">
                        <h3 className="title">Minha Carteira</h3>

                        <TableFlex
                            data={Object.keys(master.futuresWallet).map(key => new TableFlexData({ lable: key, value: master.futuresWallet[key] }))}
                            lableClass="label"
                            valueClass="value"
                            exclude={['_id']}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
