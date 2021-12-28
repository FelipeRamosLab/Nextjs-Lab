import axios from "axios";
import { useState, useEffect } from "react";
import $ from "jquery";
import CreateBotAccount from './components/CreateBotAccount';

const rootDEV = 'http://localhost:80';
const rootPROD = 'https://feliperamos.uc.r.appspot.com';
const root = rootDEV;

export default function Home({ data, success }) {
  const [accounts, setAccounts] = useState(data ? data.accounts : []);
  const [formAddMaster, setFormAddMaster] = useState({
    name: "Felipe (Demo)",
    totalBalance: 10000,
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
    axios.post(root + '/run-botaccount', {acid: masterID, botac: botAccountID}).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.error(err);
    });
  }

  function handleKeyUp(ev, getter, setter) {
    const newGetter = { ...getter };
    const prop = $(ev.target).attr("name");

    newGetter[prop] = ev.target.value;
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
          {accounts.map((acc, index) => {
            return (
              <div key={acc.name + index} className="account">
                <h3>{acc.name}</h3>

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
                        <label>Free balance: </label>
                      </td>
                      <td>{acc.freeBalance}</td>
                    </tr>
                    <tr>
                      <td>
                        <label>Total balance: </label>
                      </td>
                      <td>{acc.totalBalance}</td>
                    </tr>
                  </tbody>
                </table>

                <h4>Bot accounts:</h4>
                {acc.botAccounts.map((bot, index) => {
                  return (
                    <div key={bot.name + index} className="bot-account">
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
                            <td>{bot.assets}</td>
                          </tr>
                          <tr>
                            <td>
                              <label>Free balance: </label>
                            </td>
                            <td>{bot.freeBalance}</td>
                          </tr>
                          <tr>
                            <td>
                              <label>Total balance: </label>
                            </td>
                            <td>{bot.totalBalance}</td>
                          </tr>
                          <tr>
                            <td>
                              <button onClick={()=>runBotAccount(acc.id, bot.id)}>RUN BOT ACCOUNT</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {bot.trades.map(trade=>{
                        <table>
                          <tbody>                       
                            <tr>
                              <td>
                                <label>Trade status: </label>
                              </td>
                              <td>{trade.status}</td>
                            </tr>
                            <tr>
                              <td>
                                <label>Trade balance: </label>
                              </td>
                              <td>{trade.totalBalance}</td>
                            </tr>
                          </tbody>
                        </table>
                      })}
                    </div>
                  );
                })}
                <CreateBotAccount masterID={acc.id} handleKeyUp={handleKeyUp} accountsSetter={setAccounts}/>

              </div>
            );
          })}

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
            />

            <label>Inicial balance (USDT):</label>
            <input
              name="totalBalance"
              type="number"
              inputMode="numeric"
              value={formAddMaster.totalBalance}
              onChange={(ev) =>
                handleKeyUp(ev, formAddMaster, setFormAddMaster)
              }
            />

            <button type="submit">ADD MASTER ACCOUNT</button>
          </form>
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
