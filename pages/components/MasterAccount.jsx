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
