import {useState} from 'react';
import MiniMasterAccountTile from '../../tiles/miniMasterAccount';
import SectionHeader from '../../headers/sectionHeader';
import { CircularProgress } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function MasterAcctountsGrid({masterAccounts}) {
    const [loading, setLoading] = useState(true);

    if (Array.isArray(masterAccounts)) {
        if (loading) setLoading(false);

        return (<>
            <SectionHeader title="Minhas Carteiras" Icon={AccountBalanceWalletIcon} />
            <section className="master-accounts standard-grid grid columns-3">
                {masterAccounts.map(master=>{
                    return <MiniMasterAccountTile key={master.cod} master={master} />
                })}
            </section>
        </>);
    } else {
        return (<>
            {loading && <div className="spinner-wrap">
                <CircularProgress />
            </div>}
        </>);
    }
}
