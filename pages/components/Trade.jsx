
export default function Trade({ trade }) {
    return (
        <table>
            <tbody>
                <tr className="open-trade">
                    <td>
                        <label>Asset: </label>
                    </td>
                    <td>{trade && trade.symbol}</td>
                </tr>
                <tr className="open-trade">
                    <td>
                        <label>Position type: </label>
                    </td>
                    <td>{trade && trade.positionType}</td>
                </tr>
                <tr className="open-trade">
                    <td>
                        <label>Open time: </label>
                    </td>
                    <td>{trade && new Date(trade.openTime).toDateString()} - {trade && new Date(trade.openTime).toTimeString()}</td>
                </tr>
                {trade && trade.closeTime && <tr className="open-trade">
                    <td>
                        <label>Close time: </label>
                    </td>
                    <td>{trade && new Date(trade.closeTime).toDateString()} - {trade && new Date(trade.closeTime).toTimeString()}</td>
                </tr>}
                <tr className="open-trade">
                    <td>
                        <label>Open price: </label>
                    </td>
                    <td>$ {trade && trade.openPrice.toFixed(5)}</td>
                </tr>
                <tr className="open-trade">
                    <td>
                        <label>Last price: </label>
                    </td>
                    <td>$ {trade && trade.currentPrice.toFixed(5)}</td>
                </tr>
                <tr className="open-trade">
                    <td>
                        <label>Gain price: </label>
                    </td>
                    <td>$ {trade && trade.gainPrice && trade.gainPrice.toFixed(5)}</td>
                </tr>
                <tr className="open-trade">
                    <td>
                        <label>Loss price: </label>
                    </td>
                    <td>$ {trade && trade.stopPrice && trade.stopPrice.toFixed(5)}</td>
                </tr>
                <tr className="open-trade">
                    <td>
                        <label>Levered used: </label>
                    </td>
                    <td>{trade && trade.usedLeverage && trade.usedLeverage.toFixed(0)}</td>
                </tr>
                <tr className="open-trade">
                    <td>
                        <label>Levered used amount: </label>
                    </td>
                    <td>$ {trade && trade.usedLeverageAmount && trade.usedLeverageAmount.toFixed(2)}</td>
                </tr>
                <tr className="open-trade">
                    <td>
                        <label>Cost: </label>
                    </td>
                    <td>$ {trade && trade.cost && trade.cost.toFixed(2)}</td>
                </tr>
                <tr className="open-trade">
                    <td>
                        <label>Trade status: </label>
                    </td>
                    <td>{trade && trade.status}</td>
                </tr>
                <tr className="open-trade">
                    <td>
                        <label>Trade PNL: </label>
                    </td>
                    <td>$ {trade && trade.pnl.toFixed(2)}</td>
                </tr>
                <tr className="open-trade">
                    <td>
                        <label>Trade balance: </label>
                    </td>
                    <td>$ {trade && trade.tradeBalance.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    )
}
