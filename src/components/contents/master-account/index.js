import { useState, useContext, useEffect } from 'react';
import CreateSlotForm from '../../forms/createSlot';
import SlotTile from '../../tiles/slotTile';
import TransferPainel from '../../common/transferPainel';
import MasterInfos from './masterInfos';
import { FaTrash, FaPen } from 'react-icons/fa';
import FormFillModal from '../../modals/formFill';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditMasterForm from '../../forms/editing/master';
import DeleteConfirmation from '../../modals/confirmation';
import ActivityDataContext from '../../../context/activityData';

export default function MasterAccount({ loadData }) {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const [addNewSlotModal, setAddNewSlotModal] = useState(false);
    const [editMasterModal, setEditMasterModal] = useState(false);
    const deleteConfirmationState = useState(false);
    const [_, setDeleteConfirmation] = deleteConfirmationState;
    const { master, masterSlots } = activityData || {};

    async function editMaster(form) {
        const result = {};

        try {
            Object.entries(form).map(([key, item]) => {
                if (JSON.stringify(item) !== JSON.stringify(activityData.master[key])) {
                    result[key] = form[key];
                }
            });

            result._id = master._id;
            const response = await ajax('/api/master-account/edit', form).post();

            setActivityData(prev => {
                return {...prev, master: response.master}
            });
            setEditMasterModal(false);
        } catch(err) {
            throw err;
        }
    }

    async function deleteMaster() {
        try {
            const deleted = await ajax('/api/master-account/delete', {
                userUID: master.user._id,
                masterUID: master._id
            }).post();

            if (deleted.success) {
                setDeleteConfirmation(false);

                window.open('/', '_self');
            }
        } catch(err) {
            setDeleteConfirmation(false);
            throw err;
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
            />
            
            <section className="content-fullwidth">
                <div className="section-header">
                    <h1 className="title">{master?.name}</h1>

                    <button type="button" className="circle-button" onClick={() => setEditMasterModal(true)}><FaPen /></button>
                    <button type="button" className="circle-button" btn-color="error" onClick={() => setDeleteConfirmation(true)}><FaTrash /></button>

                    <FormFillModal
                        title="Editar conta"
                        defaultData={activityData?.master}
                        openState={editMasterModal}
                        onClose={() => setEditMasterModal(false)}
                        Content={EditMasterForm}
                        saveAction={editMaster}
                    />

                    <DeleteConfirmation
                        title="Deseja excluir a conta?"
                        message={`Tem certeza que você deseja excluir a conta [${master?.cod}][${master?.name}] permanentemente? Você perderá todo o histórico de operações feito nela!`}
                        openState={deleteConfirmationState}
                        onConfirm={deleteMaster}
                    />
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
                    <TransferPainel master={master} />
                    <MasterInfos master={master} />

                    <div className="section-header">
                        <h2>Slots</h2>
                    </div>

                    <div className="slots-list standard-grid grid">
                        {masterSlots?.map(slot => <SlotTile key={slot?._id} slot={slot}/> )}
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
