import axios from 'axios';
import ModalButton from '../../buttons/modalButton';
import CreateSlotForm from '../../forms/createSlot';
import CreateMaster from '../../forms/createMaster';
import SlotTile from '../../tiles/slotTile';
import TransferPainel from '../../common/transferPainel';
import MasterInfos from './masterInfos';
import { FaTrash, FaPen } from 'react-icons/fa';
import FormFillModal from '../../modals/formFill';
import { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function MasterAccount({ pageData, setPageData, loadData }) {
    const [addNewSlotModal, setAddNewSlotModal] = useState(false);
    const { master, masterSlots } = pageData || {};

    async function deleteMaster() {
        try {
            const deleted = await axios.post('/api/master-account/delete', {
                masterUID: master._id,
                userUID: master.user._id
            });

            window.location.href = window.location.origin;
        } catch({response: { data }}) {
            throw data;
        }
    }

    function seeMore() {
        if (!window.queryParams) window.queryParams = {};
        
        if (!window.queryParams.slotsPage) {
            window.queryParams.slotsPage = 2;
        } else {
            window.queryParams.slotsPage++;
        }

        loadData();
    }

    return (
        <div className="container">
            <Fab color="primary" className="bottom-right" onClick={() => setAddNewSlotModal(true)}>
                <AddIcon />
            </Fab>
            <FormFillModal
                title="Criar novo slot"
                openState={addNewSlotModal}
                onClose={() => setAddNewSlotModal(false)}
                Content={CreateSlotForm}
                pageData={pageData}
                setPageData={setPageData}
            />
            
            <section className="content-fullwidth">
                <div className="section-header">
                    <h1 className="title">{master.name}</h1>
                    <ModalButton className="circle-button transparent" ModalContent={(props)=> <CreateMaster {...props} initialData={master} />}><FaPen /></ModalButton>
                    <button type="button" className="circle-button" btn-color="error" onClick={deleteMaster}><FaTrash /></button>
                </div>
                <div className="stats-cards">
                    <div className="card card-grad">
                        <span className="value">{toMoney(master, ['pnl'])}</span>
                        <label>PNL Acumulado</label>
                    </div>
                    <div className="card card-grad">
                        <span className="value">{toMoney(master, ['futuresWallet', 'totalUnrealizedProfit'])}</span>
                        <label>Não Realizado</label>
                    </div>
                    <div className="card card-grad">
                        <span className="value">{toMoney(master, ['futuresWallet', 'totalMarginBalance'])}</span>
                        <label>Margem Total</label>
                    </div>
                    <div className="card card-grad">
                        <span className="value">{toMoney(master, ['futuresWallet', 'totalRealizedPnl'])}</span>
                        <label>Lucro Realizado</label>
                    </div>
                </div>
            </section>

            <section className="content-sidebar">
                <div className="content">
                    <TransferPainel master={master} pageData={pageData} setPageData={setPageData} />
                    <MasterInfos master={master} />

                    <div className="section-header">
                        <h2>Gráfico PNL Acumulado</h2>
                    </div>

                    <div className="chart-wrap">
                        <button type="button" className="button full-width top-border transparent small">Abrir Gráfico</button>
                    </div>

                    <div className="section-header">
                        <h2>Slots</h2>
                    </div>

                    <div className="slots-list standard-grid grid">
                        {masterSlots.map(slot => <SlotTile key={slot._id} slot={slot}/> )}
                        <button
                            type="button"
                            className="button full-width top-border transparent small"
                            onClick={seeMore}
                        >Ver Mais</button>
                    </div>
                </div>

                <div className="sidebar">
                    
                </div>
            </section>
        </div>
    );
}
