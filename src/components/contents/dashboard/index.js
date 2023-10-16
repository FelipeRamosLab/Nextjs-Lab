import { useState, useContext, useEffect } from 'react';
import FormFillModal from '../../modals/formFill';
import CreateMasterForm from '../../forms/createMaster';
import ActivityDataContext from '../../../context/activityData';
import CreateBotForm from '../../forms/createBot';
import SpeedDialButton from '../../buttons/speedDial';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BotsWidgets from './botsWidgets';
import MasterAcctountsGrid from './masterAccountsGrid';

export default function Dashboard({ pageData }){
    const { myProfile, myBots } = Object(pageData);
    const {masterAccounts, bots} = Object(myProfile);
    const createMasterState = useState(false);
    const [ createMaster, setCreateMaster ] = createMasterState;
    const createBotState = useState(false);
    const [ createBot, setCreateBot ] = createBotState;

    return (<div className="container">
        <MasterAcctountsGrid masterAccounts={masterAccounts || []} />
        <BotsWidgets myBots={myBots | []} pageData={pageData} />

        <FormFillModal
            openState={createMaster}
            title="Criar conta"
            Content={CreateMasterForm}
            pageData={pageData}
            onClose={() => setCreateMaster(false)}
        />
        <FormFillModal
            openState={createBot}
            title="Criar robô"
            Content={CreateBotForm}
            pageData={pageData}
            onClose={() => setCreateBot(false)}
        />
        <SpeedDialButton
            className="home-page"
            actions={[
                { icon: <SmartToyIcon/>, name: 'Robô', action: () => setCreateBot(true) },
                { icon: <AccountBalanceWalletIcon/>, name: 'Conta', action: () => setCreateMaster(true) }
            ]}
        />
    </div>);
}
