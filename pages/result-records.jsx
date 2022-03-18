import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../config.json';
import MasterAccount from './chart/MasterAccount';

const root = config[config.root];

export default function ResultRecord() {
    const [accounts, setAccounts] = useState([]);

    useEffect(()=>{
        axios.get(root + "/get-accounts").then(acc=>{
            setAccounts(acc.data);
          }).catch(err=>{
            console.error(err);
          });
    }, []);

    return (<>
        <h1>Result Records</h1>

        <h2>Master Accounts:</h2>
        {accounts.map((acc, i)=>{
            return <MasterAccount key={'master-' + i} acc={acc} />;
        })}
    </>);
}

