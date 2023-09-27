import { useState, useContext } from 'react';
import FormFillModal from '../../modals/formFill';
import CreateMasterForm from '../../forms/createMaster';
import ActivityDataContext from '../../../context/activityData';
import PageDataContext from '../../../context/pageData';
import CreateBotForm from '../../forms/createBot';
import SpeedDialButton from '../../buttons/speedDial';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BotsWidgets from './botsWidgets';
import MasterAcctountsGrid from './masterAccountsGrid';

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

    return (<div className="container">
        <MasterAcctountsGrid masterAccounts={masterAccounts || []} />
        <BotsWidgets myBots={myBots} />

        <FormFillModal
            openState={createMaster}
            title="Criar conta"
            Content={CreateMasterForm}
            onClose={() => setCreateMaster(false)}
        />
        <FormFillModal
            openState={createBot}
            title="Criar robô"
            Content={CreateBotForm}
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
