import MiniMasterAccountTile from '../../tiles/miniMasterAccount';
import SectionHeader from '../../headers/sectionHeader';

export default function MasterAcctountsGrid({masterAccounts}) {
    return (<>
        <SectionHeader title="Minhas contas" />
        <section className="standard-grid grid columns-2">
            {masterAccounts && masterAccounts.map(master=>{
                return <MiniMasterAccountTile key={master.cod} master={master} />
            })}
        </section>
    </>);
}
