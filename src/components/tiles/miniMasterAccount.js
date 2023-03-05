import Link from 'next/link';

export default function MiniMasterAccountTile({master}) {
    if (master) {
        const masterAccountURL = createURL('/master-account', { user: master.user, master: master._id});

        return (
            <a href={masterAccountURL} className="item card">
                <div className="card-header">
                    <h3 className="title">{master.name}</h3>
                    <span className={'pnl ' + (master.pnl >= 0 ? 'profit' : 'loss')}> {toMoney(master, ['pnl'])}</span>
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
