import ModalButton from '../buttons/modalButton';
import CreateBotAccount from '../forms/createBotAccount';
import TableFlex, {TableFlexData} from '../displays/tableFlex';

export default function MasterAccount({pageData}) {
    const {master} = pageData || {};

    return (
        <div className="container">
            <section className="content-fullwidth">
                <div className="section-header">
                    <h2>{master.name} - {master.pnl.toLocaleString('pt-BR', {style: 'currency', currency: 'USD'})}</h2>
                    <ModalButton className="add-button" ModalContent={CreateBotAccount}>Editar</ModalButton>
                </div>
                <hr/>
            </section>
            <section className="content-sidebar">
                <div className="content">
                    <div className="section-header">
                        <h2>Robôs da conta</h2>
                        <ModalButton className="add-button" ModalContent={CreateBotAccount} pageData={pageData}>Criar</ModalButton>
                    </div>
                    <hr/>

                    <div className="bot-accounts grid columns-1">
                        {master.botAccounts.map(botAcc=>{
                            return (
                                <div key={botAcc._id} className="item card">
                                    <h3 className="title">{botAcc.name}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="sidebar">
                    <div className="wallet card">
                        <h3 className="title">Minha Carteira</h3>

                        <TableFlex
                            data={Object.keys(master.futuresWallet).map(key=>new TableFlexData({lable: key, value: master.futuresWallet[key]}))}
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
