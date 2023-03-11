import { useState, useContext } from 'react';

import MiniMasterAccountTile from '../tiles/miniMasterAccount';
import CardSlider from '../sliders/card-slider';
import FormFillModal from '../modals/formFill';
import CreateMasterForm from '../forms/createMaster';
import ActivityDataContext from '../../context/activityData';
import PageDataContext from '../../context/pageData';
import CreateBotForm from '../forms/createBot';
import SpeedDialButton from '../buttons/speedDial';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function HomeContent(){
    const {activityData} = useContext(ActivityDataContext);
    const {pageData} = useContext(PageDataContext);
    const {user} = pageData || {};
    const {myBots} = activityData || {};
    const {masterAccounts} = user || {};
    const createMasterState = useState(false);
    const [ createMaster, setCreateMaster ] = createMasterState;
    const createBotState = useState(false);
    const [ createBot, setCreateBot ] = createBotState;

    return (<>
        <div className="container section-header">
            <h2 className="title">Contas</h2>

            <FormFillModal
                openState={createMaster}
                title="Criar conta"
                Content={CreateMasterForm}
                onClose={() => setCreateMaster(false)}
            />
        </div>
        <section className="container standard-grid grid columns-2">
            {masterAccounts && masterAccounts.map(master=>{
                return <MiniMasterAccountTile key={master.cod} master={master} />
            })}
        </section>

        <div className="container section-header">
            <h2>Meus Bots</h2>

            <FormFillModal
                openState={createBot}
                title="Criar robô"
                Content={CreateBotForm}
                onClose={() => setCreateBot(false)}
            />
        </div>

        <section className="container">
            <CardSlider data={myBots} />
        </section>

        <SpeedDialButton
            actions={[
                { icon: <SmartToyIcon/>, name: 'Robô', action: () => setCreateBot(true) },
                { icon: <AccountBalanceWalletIcon/>, name: 'Conta', action: () => setCreateMaster(true) }
            ]}
            className="home-page"
        />
    </>);
}
