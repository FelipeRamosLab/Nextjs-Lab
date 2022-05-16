import MiniMasterAccountTile from '../tiles/miniMasterAccount';
import BotTile from '../tiles/botTile';
import ModalButton from '../buttons/modalButton';
import CreateMaster from '../forms/createMaster';
import CreateBot from '../forms/createBot';

export default function HomeContent({pageData}){
    const {user, myBots} = pageData || {};
    const {masterAccounts} = user || {};
    console.log(pageData)
    return (<div className="container">
        <div className="section-header">
            <h2>Contas</h2>
            <ModalButton className="add-button" ModalContent={CreateMaster} pageData={pageData}>Criar</ModalButton>
        </div>
        <hr/>
        <section className="standard-grid grid columns-3">
            {masterAccounts && masterAccounts.map(master=>{
                return <MiniMasterAccountTile key={master.cod} master={master} />
            })}
        </section>

        <div className="section-header">
            <h2>Meus Bots</h2>
            <ModalButton className="add-button" ModalContent={CreateBot} pageData={pageData}>Criar</ModalButton>
        </div>
        <hr/>
        <section className="standard-grid grid columns-2">
            {myBots && myBots.map(bot=>{
                return <BotTile key={bot._id} pageData={pageData} bot={bot} />
            })}
        </section>
    </div>);
}
