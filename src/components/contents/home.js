import MiniMasterAccountTile from '../tiles/miniMasterAccount';
import ModalButton from '../buttons/modalButton';
import CreateMaster from '../forms/createMaster';
import CreateBot from '../forms/createBot';
import CardSlider from '../sliders/card-slider';

export default function HomeContent({pageData}){
    const {user, myBots} = pageData || {};
    const {masterAccounts} = user || {};

    console.log(pageData);
    return (<div className="container">
        <div className="section-header">
            <h2 className="title">Contas</h2>
            <ModalButton className="button" ModalContent={CreateMaster} pageData={pageData}>Criar</ModalButton>
        </div>
        <section className="standard-grid grid columns-3">
            {masterAccounts && masterAccounts.map(master=>{
                return <MiniMasterAccountTile key={master.cod} master={master} />
            })}
        </section>

        <div className="section-header">
            <h2>Meus Bots</h2>
            <ModalButton className="button" ModalContent={CreateBot} pageData={pageData}>Criar</ModalButton>
        </div>
        
        <CardSlider data={myBots} pageData={pageData} />
    </div>);
}
