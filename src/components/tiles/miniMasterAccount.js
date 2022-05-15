import Link from 'next/link';

export default function MiniMasterAccountTile({master}) {
    return (<Link href={'/master-account/?user=' + master.user + '&' + 'master=' + master._id}>
        <a className="item card">
            <h3 className="title">{master.name}</h3>
            <span className="pnl">{master.pnl.toLocaleString('pt-BR', {style: 'currency', currency: 'USD'})}</span>
            <span className="roe"> - {master.roe.toLocaleString('pt-BR', {style: 'percent'})}</span>
        </a>
    </Link>);
}
