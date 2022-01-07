
export default function Trade({ trade }) {
    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <label>Asset: </label>
                    </td>
                    <td>{trade.symbol}</td>
                </tr>
                <tr>
                    <td>
                        <label>Last price: </label>
                    </td>
                    <td>$ {trade.currentPrice.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>
                        <label>Trade status: </label>
                    </td>
                    <td>{trade.status}</td>
                </tr>
                <tr>
                    <td>
                        <label>Trade PNL: </label>
                    </td>
                    <td>$ {trade.pnl.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>
                        <label>Trade balance: </label>
                    </td>
                    <td>$ {trade.tradeBalance.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    )
}
