
export default function Trade({ trade }) {
    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <label>Asset: </label>
                    </td>
                    <td>{trade && trade.symbol}</td>
                </tr>
                <tr>
                    <td>
                        <label>Position type: </label>
                    </td>
                    <td>{trade && trade.positionType}</td>
                </tr>
                <tr>
                    <td>
                        <label>Open time: </label>
                    </td>
                    <td>{trade && new Date(trade.openTime).toDateString()} - {trade && new Date(trade.openTime).toTimeString()}</td>
                </tr>
                {trade.closeTime && <tr>
                    <td>
                        <label>Close time: </label>
                    </td>
                    <td>{trade && new Date(trade.closeTime).toDateString()} - {trade && new Date(trade.closeTime).toTimeString()}</td>
                </tr>}
                <tr>
                    <td>
                        <label>Last price: </label>
                    </td>
                    <td>$ {trade && trade.currentPrice.toFixed(5)}</td>
                </tr>
                <tr>
                    <td>
                        <label>Trade status: </label>
                    </td>
                    <td>{trade && trade.status}</td>
                </tr>
                <tr>
                    <td>
                        <label>Trade PNL: </label>
                    </td>
                    <td>$ {trade && trade.pnl.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>
                        <label>Trade balance: </label>
                    </td>
                    <td>$ {trade && trade.tradeBalance.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    )
}
