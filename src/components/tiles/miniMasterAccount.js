export default function MiniMasterAccountTile({master}) {
    if (master) {
        const masterAccountURL = createURL('/master-account', { masteruid: master._id});
        let state = '';

        if(master.pnl > 0) state = 'profit';
        if(master.pnl < 0) state = 'loss';

        return (
            <a href={masterAccountURL} className="item card">
                <div className="pnl-indicator" pnl-state={state}></div>
                <div className="card-header">
                    <h3 className="title">{master.name}</h3>
                    <span className="pnl" state={state}> {toMoney(master, ['pnl'])}</span>
                </div>

                <p><b>Rodando:</b> {master.runningSlotsCount}</p>
                <p><b>Posições abertas:</b> {master.openTradesCount}</p>
                <p><b>Total na carteira:</b> {toMoney(master, ['futuresWallet', 'totalWalletBalance'])}</p>
            </a>);
    } else {
        return (
            <div className="loading-page">
                <h1>Carregando...</h1>
            </div>
        );
    }
}
