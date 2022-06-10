import ModalButton from '../buttons/modalButton';
import CreateBotAccount from '../forms/createBotAccount';
import TableFlex from '../displays/tableFlex';
import SlotTile from '../tiles/slotTile';

export default function MasterAccount({ pageData }) {
    const { master } = pageData || {};

    return (
        <div className="container">
            <section className="content-fullwidth">
                <div className="section-header">
                    <h1>{master.name}</h1>
                    <ModalButton className="add-button" ModalContent={CreateBotAccount}>Editar</ModalButton>
                </div>
                <hr/>
            </section>
            <section className="content-sidebar">
                <div className="content">
                    <div className="section-header">
                        <h2>Gráfico PNL Acumulado</h2>
                    </div>

                    <div className="section-header">
                        <h2>Slots</h2>
                        <ModalButton className="add-button" ModalContent={CreateBotAccount} pageData={pageData}>Criar</ModalButton>
                    </div>

                    <div className="standard-grid grid columns-1">
                        {master.botAccounts.map(slot => <SlotTile key={slot._id} slot={slot}/> )}
                    </div>
                </div>
                <div className="sidebar">
                    <div className="wallet">
                        <TableFlex
                            data={[
                                ['Avalancagem Max.', master.limits.leverege + 'x' ]
                            ]}
                            lableClass="label"
                            valueClass="value"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
