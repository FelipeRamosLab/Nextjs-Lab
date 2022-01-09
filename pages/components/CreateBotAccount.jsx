import { useState } from 'react';
import axios from 'axios';
import config from '../../config.json';

const root = config[config.root];

export default function CreateBotAccount({masterID, handleKeyUp, accountsSetter}){
    const [formData, setFormData] = useState({
        name: '---------------------------------',
        totalBalance: 0,
        bot: 'Breakup High-Low',
        assets: 'BTCUSDT',
        interval: '1m'
    });

    async function createBotAccount(ev, postParams){
        ev.preventDefault();
        postParams.botAccountConfig.assets = [postParams.botAccountConfig.assets];

        try {
            const created = await axios.post(root + '/create-botaccount', postParams);
            accountsSetter(created.data.data)
        } catch(err){
            console.error(err);
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

            <label>Bot:</label>
            <input
              name="bot"
              type="text"
              autoCapitalize="true"
              value={formData.bot}
              onChange={(ev) =>
                handleKeyUp(ev, formData, setFormData)
              }
            />

            <button type="submit">CREATE BOT ACCOUNT</button>
        </form>
    )
}
