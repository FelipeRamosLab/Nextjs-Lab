import {useState} from 'react';
import TransferMoney from './TransferMoney';
import Trade from "./Trade";
import Chart from '../chart/BotAccount';

export default function BotAccount({acc, bot, methods}){
    const {runBotAccount, stopBotAccount, handleKeyUp} = methods;
    const [toggle, setToggle] = useState(false);

    return (<div className="bot-account">
        <summary className="bot" onClick={()=>setToggle(!toggle)}>{bot.assets} ($ {bot.pnl.money && bot.pnl.money.toFixed(2)}) - {bot.status}</summary>

        {toggle && <>
            <table>
                <tbody>                       
                <tr>
                    <td>
                    <label>Status: </label>
                    </td>
                    <td>{bot.status}</td>
                </tr>
                <tr>
                    <td>
                    <label>Coins: </label>
                    </td>
                    <td>{bot.assets} <a href={`https://www.binance.com/en/futures/${Array.isArray(bot.assets) && typeof bot.assets[0] === 'string' && bot.assets[0].replace('USDT', '_USDT')}`} target="_blank" rel="noreferrer">See chart</a></td>
                </tr>
                <tr>
                    <td>
                    <label>Interval: </label>
                    </td>
                    <td>{bot.interval}</td>
                </tr>
                <tr>
                    <td>
                    <label>Market type: </label>
                    </td>
                    <td>{bot.marketType}</td>
                </tr>
                <tr>
                    <td>
                    <label>Disable short term: </label>
                    </td>
                    <td>{bot.disableShortPosition ? 'true' : 'false'}</td>
                </tr>
                <tr>
                    <td>
                    <label>Free balance: </label>
                    </td>
                    <td>$ {bot.freeBalance.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>
                    <label>Available balance: </label>
                    </td>
                    <td>{bot.availableBalance.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                </tr>
                <tr>
                    <td>
                    <label>PNL: </label>
                    </td>
                    <td>$ {bot.pnl.money.toFixed(2)} ({bot.pnl.percentage && bot.pnl.percentage.toFixed(2)}%)</td>
                </tr>
                <tr>
                    <td>
                    <label>Total balance: </label>
                    </td>
                    <td>$ {bot.totalBalance.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>
                    <label>Commission: </label>
                    </td>
                    <td>$ {bot.commission.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>
                    <label>Bot name: </label>
                    </td>
                    <td>{bot.bot.name}</td>
                </tr>
                <tr>
                    <td>
                    <label>Number of trades: </label>
                    </td>
                    <td>{bot.trades.length}</td>
                </tr>
                <tr>
                    <td>
                    <button onClick={()=>runBotAccount(acc.id, bot.id)}>RUN BOT ACCOUNT</button>
                    <button onClick={()=>stopBotAccount(acc.id, bot.id)}>STOP BOT ACCOUNT</button>
                    <button onClick={()=>stopBotAccount(acc.id, bot.id, true)}>FORCESTOP BOT ACCOUNT</button>
                    </td>
                </tr>
                <tr>
                    <td>
                    <label>Deposit USDT: </label>
                    </td>
                    <td>
                    <TransferMoney
                        handleKeyUp={handleKeyUp}
                        masterID={acc.id}
                        botAccountID={bot.id}
                    />
                    </td>
                </tr>
                </tbody>
            </table>

            <Chart acc={bot} />

            {bot.trades.length ? bot.trades.map((trade, i)=>{
                if(trade.status === 'opened'){ 
                return (
                    <div key={trade.openTime + i}>
                    <Trade trade={trade}/>
                    </div>
                );
                }
            }) : <p key={Date.now()}>Any opened trade!</p>}
            <details>
                <summary>CLOSED TRADES</summary>
                {bot.trades.length && bot.trades.map((trade, i)=>{
                if(trade.status !== 'opened'){ 
                    return <Trade key={trade.openTime + i} trade={trade}/>
                }
                })}
            </details>
        </>}
    </div>);
}
