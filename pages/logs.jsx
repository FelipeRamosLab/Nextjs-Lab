import {useEffect, useState} from 'react';
import axios from 'axios';
import configs from '../config.json';

export default function ErrorLogs(){
    const [logs, setLogs] = useState([])
    useEffect(()=>{
        debugger
        axios.post(configs[configs.root] + '/database/get-collection/errorlogs').then(function(res){
            console.log(res)
        }).catch(err=>{
            console.error(err);
        })
    }, []);
    
    return (<>
        <h1>Logs list:</h1>
        
    </>);
}