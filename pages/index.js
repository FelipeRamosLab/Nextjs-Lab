import axios from "axios";
import React, { useState, useEffect } from 'react';
import $ from "jquery";
import CreateBotAccount from './components/CreateBotAccount';
import TransferMoney from './components/TransferMoney';
import config from '../config.json';
import Trade from "./components/Trade";

const root = config[config.root];

export default function Home({ data, success }) {
  const [accounts, setAccounts] = useState(data ? data.accounts : []);
  const [formAddMaster, setFormAddMaster] = useState({
    name: "Felipe (Demo)",
    totalBalance: 1000,
  });

  useEffect(()=>{
    setInterval(()=>{
      axios.get(root + "/get-accounts").then(acc=>{
        setAccounts(acc.data);
      }).catch(err=>{
        console.error(err);
      })
    }, 2000);
  }, []);

  async function addMasterAccount(ev) {
    ev.preventDefault();
    console.log(formAddMaster);

    axios.post(root + '/add-masteraccount', formAddMaster).then(res=>{
      console.log(res);
      setAccounts(res.data.data.accounts);
    }).catch(err=>{
      console.error(err);
    });
  }

  function runBotAccount(masterID, botAccountID){
    axios.post(root + '/run-botaccount', {acid: masterID, botac: botAccountID }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.error(err);
    });
  }

  function stopBotAccount(masterID, botAccountID, forcingStop){
    axios.post(root + '/stop-botaccount', { type: forcingStop ? 'forced' : 'normal', masterID, botAccountID }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.error(err);
    });
  }

  function handleKeyUp(ev, getter, setter, type) {
    const newGetter = { ...getter };
    const prop = $(ev.target).attr("name");

    newGetter[prop] = type === 'number' ? Number(ev.target.value) : ev.target.value;
    setter(newGetter);
  }

  function handleCheckbox(ev, getter, setter) {
    const newGetter = { ...getter };
    const prop = $(ev.target).attr("name");

    newGetter[prop] = ev.target.checked;
    setter(newGetter);
  }

  return (
    <>
      <header>
        <h1>Bot Store</h1>
      </header>

      <section>
        <h2>Master accounts</h2>
        <p>Check below the master accounts currently active:</p>

        <div className="master-accounts">
          <form onSubmit={addMasterAccount}>
            <h3>Create master account:</h3>

            <label>Account name:</label>
            <input
              name="name"
              type="text"
              autoCapitalize="true"
              value={formAddMaster.name}
              onChange={(ev) =>
                handleKeyUp(ev, formAddMaster, setFormAddMaster)
              }
            /><br/>

            <label>Inicial balance (USDT):</label>
            <input
              name="totalBalance"
              type="number"
              inputMode="numeric"
              value={formAddMaster.totalBalance}
              onChange={(ev) =>
                handleKeyUp(ev, formAddMaster, setFormAddMaster)
              }
            /><br/>

            <button type="submit">ADD MASTER ACCOUNT</button>
          </form>
          {accounts.map((acc, index) => {
            return (
              <details key={acc.name + index} className="account">
                <summary>{acc.name}</summary>

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
                  return (
                    <details key={bot.name + index} className="bot-account">
                      <summary>{bot.assets} ({bot.pnl.percentage && bot.pnl.percentage.toFixed(2)}%) - {bot.status}</summary>

                      <h5>{bot.name}</h5>

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
                            <td>{bot.assets} <a href={`https://www.binance.com/en/trade/${Array.isArray(bot.assets) && typeof bot.assets[0] === 'string' && bot.assets[0].replace('USDT', '_USDT')}`} target="_blank" rel="noreferrer">See chart</a></td>
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
                    </details>
                  );
                })}
                <CreateBotAccount masterID={acc.id} masterAccount={acc} handleKeyUp={handleKeyUp} handleCheckbox={handleCheckbox} accountsSetter={setAccounts}/>

              </details>
            );
          })}
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const accounts = await axios.get(root + "/get-accounts");

    return {
      props: {
        success: true,
        data: {
          accounts: accounts.data,
        },
      },
    };
  } catch (err) {
    return {
      props: {
        success: false,
      },
    };
  }
}
