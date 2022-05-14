export default function MiniMasterAccountTile({master}) {
    return (<div className="item card">
        <h3 className="title">{master.name}</h3>
        <span className="pnl">{master.pnl.toLocaleString('pt-BR', {style: 'currency', currency: 'USD'})}</span>
        <span className="roe"> - {master.roe.toLocaleString('pt-BR', {style: 'percent'})}</span>
    </div>)
}
