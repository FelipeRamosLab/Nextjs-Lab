import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config.json';

const root = config[config.root];

export default function CreateBotAccount({masterID, handleKeyUp, handleCheckbox, accountsSetter, masterAccount}){
  const [formData, setFormData] = useState({
    name: '---------------------------------',
    totalBalance: 0,
    bot: 'Old Strategy (5 candles)',
    assets: 'BTCUSDT',
    interval: '1m',
    marketType: 'future',
    limits: {
      tradeLoss: {
        percentage: 2
      },
      dailyLoss: {
        percentage: 4
      },
      monthlyLoss: {
        percentage: 10
      },
      leverage: 120
    },
    disableShortPosition: false,
  });
  const [tradeLoss, setTradeLoss] = useState(formData.limits.tradeLoss.percentage);
  const [leverage, setLeverage] = useState(formData.limits.leverage);
  
  useEffect(()=>{
    let result = {...formData};
    
    result.limits.tradeLoss.percentage = tradeLoss;
    result.limits.leverage = leverage;

    setFormData(result);
  }, [tradeLoss, leverage])

  async function createBotAccount(ev, postParams){
      ev.preventDefault();
      if(!Array.isArray(postParams.botAccountConfig.assets)) postParams.botAccountConfig.assets = [postParams.botAccountConfig.assets];

      try {
          const created = await axios.post(root + '/create-botaccount', postParams);
          accountsSetter(created.data.data)
          console.log(formData)
        } catch(err){
          console.error(err);
        }
      }
      
      function handleObj(ev){
        let name = ev.target.name;
        switch(name){
      case 'leverage': {
        setLeverage(Number(ev.target.value))
        break;
      }
      case 'tradeLoss': {
        setTradeLoss(Number(ev.target.value))
        break;
      }
    }
  }

  return (
      <form method="POST" onSubmit={(ev)=>createBotAccount(ev, {accountID: masterID, botAccountConfig: formData})}>
          <label>Name:</label>
          <input
            name="name"
            type="text"
            autoCapitalize="true"
            value={formData.name}
            onChange={(ev) =>
              handleKeyUp(ev, formData, setFormData)
            }
          />

          <label>Asset:</label>
          <input
            name="assets"
            type="text"
            autoCapitalize="true"
            value={formData.assets}
            onChange={(ev) =>
              handleKeyUp(ev, formData, setFormData)
            }
          />

          <label>Max leverage:</label>
          <input
            name="leverage"
            type="number"
            value={formData.limits.leverage}
            onChange={(ev) => handleObj(ev)}
          />

          <label>Max loss per trade:</label>
          <input
            name="tradeLoss"
            type="number"
            value={formData.limits.tradeLoss.percentage}
            onChange={(ev) =>handleObj(ev)}
          />

          <label>Interval:</label>
          <select
            name="interval"
            value={formData.interval}
            onChange={(ev) =>
              handleKeyUp(ev, formData, setFormData)
            }
          >
            <option value="1m">1m</option>
            <option value="3m">3m</option>
            <option value="5m">5m</option>
            <option value="15m">15m</option>
            <option value="30m">30m</option>
            <option value="1h">1h</option>
            <option value="4h">4h</option>
            <option value="1d">1d</option>
            <option value="1w">1w</option>
          </select>
          
          <label>Market:</label>
          <select
            name="marketType"
            value={formData.marketType}
            onChange={(ev) =>
              handleKeyUp(ev, formData, setFormData)
            }
          >
            <option value="future">Future</option>
            <option value="spot">Spot</option>
          </select>

          {(formData.marketType === 'future') && <><input
            type="checkbox"
            name="disableShortPosition"
            onChange={(ev)=>handleCheckbox(ev, formData, setFormData)}
          />
          <label>Disable short term</label></>}

          <label>Bot:</label>
          <select
            name="bot"
            value={formData.bot}
            onChange={(ev) =>
              handleKeyUp(ev, formData, setFormData)
            }
          >
            {masterAccount && masterAccount.availableBots.map((botOpt, index)=>{
              return <option key={botOpt.name + index} value={botOpt.name}>{botOpt.name}</option>
            })}
          </select>

          <button type="submit">CREATE BOT ACCOUNT</button>
      </form>
  );
}
