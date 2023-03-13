import { useState, useContext, useEffect } from 'react';
import CreateSlotForm from '../../forms/createSlot';
import SlotTile from '../../tiles/slotTile';
import TransferPainel from '../../common/transferPainel';
import MasterInfos from './masterInfos';
import MasterResults from '../../common/limits';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormFillModal from '../../modals/formFill';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditMasterForm from '../../forms/editing/master';
import DeleteConfirmation from '../../modals/confirmation';
import ActivityDataContext from '../../../context/activityData';
import SectionHeader from '../../headers/sectionHeader';
import IconButtonConfig from '../../../models/IconButtonConfig';
import Paper from '@mui/material/Paper';

export default function MasterAccount({ loadData }) {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const [addNewSlotModal, setAddNewSlotModal] = useState(false);
    const [editMasterModal, setEditMasterModal] = useState(false);
    const [transferType, setTransferType] = useState(false);
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
                <SectionHeader title={master?.name} iconButtons={[
                    new IconButtonConfig({
                        Icon: AttachMoneyIcon,
                        action: () => setTransferType('deposit')
                    }),
                    new IconButtonConfig({
                        Icon: EditIcon,
                        action: () => setEditMasterModal(true)
                    }),
                    new IconButtonConfig({
                        Icon: DeleteIcon,
                        action: () => setDeleteConfirmation(true)
                    })
                ]}/>

                <div className="stats-cards">
                    <Paper className="card h-scroll-display" elevation={20}>
                        <span className="value money">{toMoney(master, ['pnl'])}</span>
                        <label>PNL Acumulado</label>
                    </Paper>
                    <Paper  className="card h-scroll-display" elevation={20}>
                        <span className="value money">{toMoney(master, ['futuresWallet', 'totalUnrealizedProfit'])}</span>
                        <label>Não Realizado</label>
                    </Paper>
                    <Paper className="card h-scroll-display" elevation={20}>
                        <span className="value money">{toMoney(master, ['futuresWallet', 'totalMarginBalance'])}</span>
                        <label>Margem Total</label>
                    </Paper>
                    <Paper className="card h-scroll-display" elevation={20}>
                        <span className="value money">{toMoney(master, ['futuresWallet', 'totalRealizedPnl'])}</span>
                        <label>Lucro Realizado</label>
                    </Paper>
                </div>

                {/* Small update time text */}
                <small>Última atualização: {master?.modifiedAt ? new Date(master?.modifiedAt).toLocaleString() : '---'}</small>
            </section>

            <section className="content-sidebar">
                <div className="content">
                    <TransferPainel master={master} transferType={transferType} setTransferType={setTransferType} />

                    <section className="master-results results stats-cards">
                        <Paper className="card" elevation={23}>
                            <p className="value pnl" state={master?.results?.dayPnl !== 0 ? master?.results?.dayPnl > 0 ? 'profit' : 'loss' : ''}>
                                {toMoney(master?.results?.dayPnl)}
                            </p>
                            <label>PNL dia</label>
                        </Paper>
                        <Paper className="card" elevation={23}>
                            <p className="value pnl" state={master?.results?.monthPnl !== 0 ? master?.results?.monthPnl > 0 ? 'profit' : 'loss' : ''}>
                                {toMoney(master?.results?.monthPnl)}
                            </p>
                            <label>PNL mês</label>
                        </Paper>
                        <Paper className="card" elevation={23}>
                            <p className="value roe" state={master?.results?.dayRoe !== 0 ? master?.results?.dayRoe > 0 ? 'profit' : 'loss' : ''}>
                                {toPercent(master?.results?.dayRoe, null, 2)}
                            </p>
                            <label>ROE dia</label>
                        </Paper>
                        <Paper className="card" elevation={23}>
                            <p className="value roe" state={master?.results?.monthRoe !== 0 ? master?.results?.monthRoe > 0 ? 'profit' : 'loss' : ''}>
                                {toPercent(master?.results?.monthRoe, null, 2)}
                            </p>
                            <label>ROE mês</label>
                        </Paper>
                    </section>

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
                    <MasterInfos master={master} />
                    <MasterResults entity={master} />
                </div>
            </section>

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
    );
}
