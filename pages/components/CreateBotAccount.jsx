import { useState } from 'react';
import axios from 'axios';
import config from '../../config.json';

const root = config[config.root];

export default function CreateBotAccount({masterID, handleKeyUp, accountsSetter}){
    const [formData, setFormData] = useState({
        name: '---------------------------------',
        totalBalance: 0,
        bot: 'Bender',
        assets: 'BTCUSDT'
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
