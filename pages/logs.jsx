import {useEffect} from 'react';
import axios from 'axios';

export default function ErrorLogs(){
    useEffect(()=>{
        axios.post('http://35.224.171.242/database/get-collection/ErrorLogs', {
            data: {}
        }).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.error(err);
        })
    }, []);
    
    return (<>
        <h1>Logs list:</h1>
    </>);
}