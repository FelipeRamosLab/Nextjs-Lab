import Link from 'next/link';
import {toMoney} from '../../utils/numbers';

export default function MiniMasterAccountTile({master}) {
    if (master) {
        return (<Link href={'/master-account/?user=' + master.user + '&' + 'master=' + master._id}>
            <a className="item card">
                <div className="card-header">
                    <h3 className="title">{master.name}</h3>
                    <span className={'pnl ' + (master.pnl >= 0 ? 'profit' : 'loss')}> {toMoney(master.pnl)}</span>
                </div>
                <hr />

                <p><b>Rodando:</b> 5</p>
                <p><b>Posições abertas:</b> 15</p>
                <p><b>Total na carteira:</b> {toMoney(master.futuresWallet.totalWalletBalance)}</p>
            </a>
        </Link>);
    } else {
        return (
            <div className="loading-page">
                <h1>Carregando...</h1>
            </div>
        );
    }
}
