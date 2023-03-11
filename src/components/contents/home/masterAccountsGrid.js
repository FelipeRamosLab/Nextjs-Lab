import {useState} from 'react';
import MiniMasterAccountTile from '../../tiles/miniMasterAccount';
import SectionHeader from '../../headers/sectionHeader';
import { CircularProgress } from '@mui/material';

export default function MasterAcctountsGrid({masterAccounts}) {
    const [loading, setLoading] = useState(true);

    if (Array.isArray(masterAccounts)) {
        if (loading) setLoading(false);

        return (<>
            <SectionHeader title="Minhas contas" />
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
