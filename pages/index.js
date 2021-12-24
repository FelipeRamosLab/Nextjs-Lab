import axios from "axios";
import { useState } from "react";
import $ from "jquery";

export default function Home({ data, success }) {
  const [accounts, setAccounts] = useState(data.accounts);
  const [formAddMaster, setFormAddMaster] = useState({
    name: "",
    totalBalance: 0,
  });

  async function addMasterAccount(ev) {
    ev.preventDefault();
    console.log(formAddMaster);

    axios.post('http://192.168.15.3:8080/add-masteraccount', formAddMaster).then(res=>{
      console.log(res);
      setAccounts(res.data.data.accounts);
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

      {success ? (
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
                      </div>
                    );
                  })}
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
      ) : (
        <h2>Error on load accounts!</h2>
      )}
    </>
  );
}

export async function getServerSideProps() {
  try {
    const accounts = await axios.get("http://192.168.15.3:8080/get-accounts");

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
