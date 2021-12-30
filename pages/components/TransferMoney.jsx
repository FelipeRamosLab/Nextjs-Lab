import { useState } from "react";
import axios from 'axios';
import config from '../../config.json';

export default function TransferMoney({masterID, botAccountID, handleKeyUp}){
    const [formData, setFormData] = useState({
      senderPath: `${masterID}`,
      receiverPath: `${masterID}/${botAccountID}`,
      amount: 0
    });

    function transfer(ev){
      ev.preventDefault();

      axios.post(config[config.root] + '/transaction', formData).then(res=>{
        console.log(res.data);
      }).catch(err=>{
        console.error(err);
      })
    }

    return (<div>
        <form method="POST" onSubmit={(ev)=>transfer(ev, botAccountID)}>
            <label>Amount:</label>
            <input
              name="amount"
              type="number"
              inputMode="numeric"
              value={formData.amount}
              onChange={(ev) =>
                handleKeyUp(ev, formData, setFormData, 'number')
              }
            />

            <button type="submit">SEND</button>
        </form>
    </div>);
}
