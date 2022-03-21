import axios from "axios";
import React, { useState, useEffect } from 'react';
import $ from "jquery";
import CreateBotAccount from './components/CreateBotAccount';
import TransferMoney from './components/TransferMoney';
import config from '../config.json';
import Trade from "./components/Trade";
import Chart from './chart/BotAccount';
import MasterAccount from './components/MasterAccount';

const root = config[config.root];

export default function Home({ data, success }) {
  const [accounts, setAccounts] = useState(data ? data.accounts : []);
  const [formAddMaster, setFormAddMaster] = useState({
    name: "---",
    totalBalance: 500,
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

  return (<>
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
          return <MasterAccount
            key={acc.name + index}
            acc={acc}
            methods={{
              runBotAccount,
              stopBotAccount,
              handleCheckbox,
              handleKeyUp,
              setAccounts
            }}
          />;
        })}
      </div>
    </section>
  </>);
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
