import MiniMasterAccountTile from '../tiles/miniMasterAccount';
import ModalButton from '../buttons/modalButton';
import CreateMaster from '../common/createMaster';

export default function HomeContent({pageData}){
    const {user} = pageData || {};
    const {masterAccounts} = user || {};

    console.log(masterAccounts)
    return (<div className="container">
        <div className="section-header">
            <h2>Contas</h2>
            <ModalButton className="add-button" ModalContent={CreateMaster}>Criar</ModalButton>
        </div>
        <hr/>

        <section className="master-accounts grid columns-3">
            {masterAccounts && masterAccounts.map(master=>{
                return <MiniMasterAccountTile key={master.cod} master={master} />
            })}
        </section>
    </div>);
}
