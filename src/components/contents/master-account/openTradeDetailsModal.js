export default function OpenTradeDetailsModal({trade}) {
    const openTime = new Date(validateProp(trade, ['openTime']));
    const data = {
        'COD': validateProp(trade, ['cod']),
        'Moeda': validateProp(trade, ['symbol']),
        'Aberto em': openTime.toLocaleString(),
        'Preço atual': toMoney(trade, ['currentPrice']),
        'PNL': toMoney(trade, ['pnl']),
        'ROE': toPercent(trade, ['roe']),
        'Stop loss': toMoney(trade, ['stopPrice']),
        'Take profit': toMoney(trade, ['gainPrice']),
        'Quantidade': validateProp(trade, ['quantity']),
        'Alavancagem': validateProp(trade, ['usedLeverege']),
        'Tamanho atual': toMoney(trade, ['grossBalance']),
        'Tamanho inicial': toMoney(trade, ['initialGrossBalance']),
        'Margem inicial': toMoney(trade, ['initialMargin']),
        'Stop spread inicial': toMoney(trade, ['initialStopSpread']),
        'Tipo de posição': validateProp(trade, ['positionType']),
        'Margem atual': toMoney(trade, ['tradeBalance']),
        'Corretagem': toMoney(trade, ['tradeFee']),
        'Valor alavancado': toMoney(trade, ['usedLeveregeAmount'])
    };
    
    return (<div className="opentrade-details container">
        <h3>Detalhes da Posição</h3>

        <div className="flex-data">
            {Object.keys(data).map(key=>{
                const currValue = data[key];

                return (<div key={getUID()} className="row">
                    <div className="column">
                        <label>{key}:</label>
                    </div>
                    <div className="column align-right">
                        <p>{currValue}</p>
                    </div>
                </div>);
            })}
        </div>   
    </div>)
}
