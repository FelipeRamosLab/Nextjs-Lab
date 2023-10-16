import axios from 'axios';
import { useState, useContext } from 'react';
import Link from 'next/link';
import MainModal from '../modals/main';
import { FaPlayCircle, FaStopCircle } from "react-icons/fa";
import OpenTradeInfo from '../contents/master-account/openTradeInfos';
import { Backdrop, CircularProgress } from '@mui/material';
import ActivityDataContext from '../../context/activityData';

export default function SlotTile({slot}) {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const [stopSelect, setStopSelect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const slotURL = createURL('/slot-details', {slotUID: slot._id, user: slot.user._id, master: slot.master});
    let state = '';

    if(slot.pnl > 0) state = 'profit';
    if(slot.pnl < 0) state = 'loss';

    async function runSlot() {
        setIsLoading(true);
        try {
            const runned = await ajax('/bot-account/run', {
                botAccountUID: slot._id,
                masterUID: slot.master,
                userUID: slot.user
            }).post();

            if (runned.success) {
                setActivityData(prev => {
                    return { ...prev, masterSlots: runned.master.botAccounts }
                });
            } else alert('Ocorreu um erro ao iniciar o slot!');
        } catch(err) {
            alert('Ocorreu um erro ao iniciar o slot!');
        } finally {
            setIsLoading(false);
        }
    }

    async function stopSlot(type) {
        setStopSelect(false);
        setIsLoading(true);

        switch (type) {
            case 'await':
            case 'forced': break;
            default: {
                alert('The type of stop provided should be "await" or "forced"! But received ' + type);
                return;
            }
        }

        try {
            const stopping = await ajax('/bot-account/stop', {
                type,
                slotUID: slot._id,
                masterUID: slot.master,
                userUID: slot.user
            }).post();

            if (!stopping.success) alert('Ocorreu um erro ao parar o slot!');

            setActivityData(prev => {
                return { ...prev, masterSlots: stopping.data.botAccounts }
            });
        } catch(err) {
            alert('Ocorreu um erro ao parar o slot!');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="slot-display item card">
            <MainModal
                open={stopSelect}
                modalCtrl={setStopSelect}
                Content={()=>{
                    return (<>
                        <h4>Qual método de encerramento deseja utilizar:</h4>
                        <div className="options-list">
                            <button type="button" onClick={()=>stopSlot('await')}>
                                <p className="title">Esperar trades abertos</p>
                                <p>O slot só será desligado depois que a operação fechar normalmente.</p>
                            </button>
                            <button type="button" onClick={()=>stopSlot('forced')}>
                                <p className="title">Fechar trades</p>
                                <p>Todos os trades abertos no slot serão fechados.</p>
                            </button>
                        </div>
                    </>);
                }}
            />

            <div className="tile-header">
                <div className="text-wrap">
                    <h4 className="title">
                        <a href={slotURL}>{slot.name}</a> 
                        <span className="badge" type={slot.status}>{slot.status}</span>
                    </h4>
                    <h5 className="sub-title">{validateProp(slot, ['bot', 'name']) || '---'}</h5>
                </div>
                {slot.status !== 'stopped' && <FaStopCircle className="circle-button reverse" btn-color="error" onClick={() => setStopSelect(true)} />}
                {slot.status !== 'running' && <FaPlayCircle className="circle-button reverse" btn-color="success" onClick={() => runSlot(slot._id)} />}
            </div>

            <div className="tile-content">
                <div className="content-info">
                    <p><b>COD:</b> {validateProp(slot, ['cod']) || '---'}</p>
                    <p><b>Moeda:</b> {slot.assets}</p>
                    <p><b>Intervalo:</b> {slot.interval}</p>
                    <p><b>Lucro Realizado:</b> {toMoney(slot, ['totalRealizedPnl'])}</p>
                    <p><b>Última atualização:</b> {slot?.modifiedAt && new Date(slot?.modifiedAt).toLocaleString()}</p>
                </div>
                <div className="results">
                    <span className="pnl" state={state}>{toMoney(slot, ['pnl'])}</span>
                </div>
            </div>

            {slot.trades.map(trade => <OpenTradeInfo key={trade._id} trade={trade} /> )}

            <Backdrop
                sx={{ color: '#fff', zIndex: 999999 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
