import {useState} from 'react';
import BotAccount from './BotAccount';
import CreateBotAccount from './CreateBotAccount';

export default function MasterAccount({acc, methods}){
    const [toggle, setToggle] = useState(false);
    const {stopBotAccount, handleCheckbox, handleKeyUp, setAccounts} = methods;

    return (<div className="account">
        <summary className="master" onClick={()=>setToggle(!toggle)}>{acc.name}</summary>
        
        {toggle && <>
            <table>
                <tbody>
                    <tr>
                    <td>
                        <label>Type: </label>
                    </td>
                    <td>{acc.type}</td>
                    </tr>
                    <tr>
                    <td>
                        <label>Commission: </label>
                    </td>
                    <td>$ {acc.commission.toFixed(2)}</td>
                    </tr>
                    <tr>
                    <td>
                        <label>Free balance: </label>
                    </td>
                    <td>$ {acc.freeBalance.toFixed(2)}</td>
                    </tr>
                    <tr>
                    <td>
                        <label>PNL: </label>
                    </td>
                    <td>$ {Number(acc.pnl.money).toFixed(2)} ({Number(acc.pnl.percentage).toFixed(2)}%)</td>
                    </tr>
                    <tr>
                    <td>
                        <label>Total balance: </label>
                    </td>
                    <td>$ {Number(acc.totalBalance).toFixed(2)}</td>
                    </tr>
                    <tr>
                    <td>
                        <label>Stop bot accounts: </label>
                    </td>
                    <td>
                        <button onClick={()=>stopBotAccount(acc.id)}>STOP ALL BOT ACCOUNTS</button>
                        <button onClick={()=>stopBotAccount(acc.id, false, true)}>FORCESTOP ALL BOT ACCOUNTS</button>
                    </td>
                    </tr>
                    <tr>
                        <td>Available balance:</td>
                        <td>{acc.futuresWallet.availableBalance.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                    </tr>
                    <tr>
                        <td>Max withdraw amount:</td>
                        <td>{acc.futuresWallet.maxWithdrawAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                    </tr>
                    <tr>
                        <td>Total cross unpnl:</td>
                        <td>{acc.futuresWallet.totalCrossUnPnl.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                    </tr>
                    <tr>
                        <td>Total initial margin:</td>
                        <td>{acc.futuresWallet.totalInitialMargin.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                    </tr>
                    <tr>
                        <td>Total margin balance:</td>
                        <td>{acc.futuresWallet.totalMarginBalance.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                    </tr>
                    <tr>
                        <td>Total unrealized profit:</td>
                        <td>{acc.futuresWallet.totalUnrealizedProfit.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                    </tr>
                    <tr>
                        <td>Total wallet balance:</td>
                        <td>{acc.futuresWallet.totalWalletBalance.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                    </tr>
                </tbody>
            </table>

            <h4>Bot accounts:</h4>
            {acc.botAccounts.map((bot, index) => {
                return <BotAccount
                    key={bot.name + index}
                    acc={acc}
                    bot={bot}
                    methods={methods}
                />
            })}
            <CreateBotAccount masterID={acc.id} masterAccount={acc} handleKeyUp={handleKeyUp} handleCheckbox={handleCheckbox} accountsSetter={setAccounts}/>
        </>}

    </div>)
}
