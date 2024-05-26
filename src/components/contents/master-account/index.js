import { useState, useContext, useEffect } from 'react';
import CreateSlotForm from '../../forms/createSlot';
import SlotTile from '../../tiles/slotTile';
import TransferPainel from '../../common/transferPainel';
import MasterInfos from './masterInfos';
import MasterResults from '../../common/limits';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FormFillModal from '../../modals/formFill';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditMasterForm from '../../forms/editing/master';
import Confirmation from '../../modals/confirmation';
import ActivityDataContext from '../../../context/activityData';
import SubscribeChangesContext from '../../../context/subscribeChanges';
import SectionHeader from '../../headers/sectionHeader';
import IconButtonConfig from '../../../models/IconButtonConfig';
import AJAX from '../../../utils/ajax';
import ActivitiesHistory from '../../displays/ActivitiesHistory';

export default function MasterAccount({ loadData, queryParams }) {
    const { masteruid } = Object(queryParams);
    const DeleteConfirmation = Confirmation;
    const ArchiveConfirmation = Confirmation;

    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const socketInstance = useContext(SubscribeChangesContext);
    const [addNewSlotModal, setAddNewSlotModal] = useState(false);
    const [editMasterModal, setEditMasterModal] = useState(false);
    const [transferType, setTransferType] = useState(false);
    const deleteConfirmationState = useState(false);
    const archiveConfirmationState = useState(false);
    const [__, setArchiveConfirmationState] = archiveConfirmationState;
    const [_, setDeleteConfirmation] = deleteConfirmationState;
    const [ master, setMaster ] = useState();
    const [ masterSlots, setMasterSlots ] = useState([]);
    const socket = socketInstance();

    useEffect(() => {
        connectMasterSlots();
    }, []);

    useEffect(() => {
        if (!master) {
            connectMaster();
        }
    }, [activityData]);

    function connectMasterSlots() {
        if (!masteruid) {
            return;
        }

        socket.current.emit('subscribe', {
            type: 'query',
            collection: 'bot_accounts',
            filter: { master: masteruid },
            // options: { loadMethod: 'cacheMasterSlots' }
        }, (res) => {
            if (res?.error) {
                throw res;
            }

            socket.current.on(res?.id, (snapshot) => {
                console.log(new Date().toLocaleString(), 'Slots data:', snapshot);
                setMasterSlots(snapshot);
            });
        });
    }

    function connectMaster() {
        if (!masteruid) {
            return;
        }

        socket.current.emit('subscribe', {
            type: 'doc',
            collection: 'master_accounts',
            docUID: masteruid,
            options: { loadMethod: 'cacheMaster' }
        }, (res) => {
            if (res?.error) {
                throw res;
            }

            socket.current.on(res?.id, (snapshot) => {
                console.log(new Date().toLocaleString(), 'Master data:', snapshot);
                setMaster(snapshot);
            });
        });
    }

    async function editMaster(form) {
        const result = {};

        try {
            Object.entries(form).map(([key, item]) => {
                if (JSON.stringify(item) !== JSON.stringify(activityData.master[key])) {
                    result[key] = form[key];
                }
            });

            result._id = master._id;
            const response = await new AJAX('/master-account/edit').post({
                masterUID: master._id,
                data: result
            });

            setActivityData(prev => {
                return {...prev, master: response.master}
            });
            setEditMasterModal(false);
        } catch(err) {
            throw err;
        }
    }

    async function archiveMaster() {
        try {
            const response = await new AJAX('/master-account/switch-state').post({
                masterUID: master._id,
                newState: 'archived'
            });

            if (response.success) {
                window.location.reload();
            }
        } catch (err) {
            throw err;
        }
    }

    async function deleteMaster() {
        try {
            const deleted = await new AJAX('/master-account/delete').delete({
                masterUID: master._id
            });

            if (deleted.success) {
                setDeleteConfirmation(false);

                window.open('/', '_self');
            }
        } catch(err) {
            setDeleteConfirmation(false);
            throw err;
        }
    }

    async function runAllSlots() {
        try {
            const ajax = new AJAX('/master-account/run-slots');
            const response = await ajax.post({ masterUID: master._id });

            if (response.success) {
                window.location.reload();
            } else {
                throw response;
            }
        } catch (err) {
            alert(err?.message || err);
        }
    }

    async function stopAllSlots() {
        try {
            const ajax = new AJAX('/master-account/stop-slots');
            const response = await ajax.post({ masterUID: master._id });

            if (response.success) {
                window.location.reload();
            } else {
                throw response;
            }
        } catch (err) {
            alert(err?.message || err);
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
                <SectionHeader title={master?.name} description={master?.description} iconButtons={[
                    new IconButtonConfig({
                        Icon: AttachMoneyIcon,
                        display: Boolean(master?.type === 'master-demo'),
                        action: () => setTransferType('deposit')
                    }),
                    new IconButtonConfig({
                        Icon: EditIcon,
                        action: () => setEditMasterModal(true)
                    }),
                    new IconButtonConfig({
                        Icon: ArchiveIcon,
                        action: () => setArchiveConfirmationState(true)
                    }),
                    new IconButtonConfig({
                        Icon: DeleteIcon,
                        action: () => setDeleteConfirmation(true)
                    })
                ]}/>

                <div className="stats-cards">
                    <div className="card h-scroll-display" elevation={20}>
                        <span className="value money">{toMoney(master, ['pnl'])}</span>
                        <label>PNL Acumulado</label>
                    </div>
                    <div  className="card h-scroll-display" elevation={20}>
                        <span className="value money">{toMoney(master, ['futuresWallet', 'totalUnrealizedProfit'])}</span>
                        <label>Não Realizado</label>
                    </div>
                    <div className="card h-scroll-display" elevation={20}>
                        <span className="value money">{toMoney(master, ['futuresWallet', 'totalMarginBalance'])}</span>
                        <label>Margem Total</label>
                    </div>
                    <div className="card h-scroll-display" elevation={20}>
                        <span className="value money">{toMoney(master, ['futuresWallet', 'totalRealizedPnl'])}</span>
                        <label>Lucro Realizado</label>
                    </div>
                </div>

                {/* Small update time text */}
                <small>Última atualização: {master?.modifiedAt ? new Date(master?.modifiedAt).toLocaleString() : '---'}</small>
            </section>

            <section className="content-sidebar">
                <div className="content">
                    <TransferPainel master={master} transferType={transferType} setTransferType={setTransferType} />

                    <section className="master-results results stats-cards">
                        <div className="card" elevation={23}>
                            <p className="value pnl" state={master?.results?.dayPnl !== 0 ? master?.results?.dayPnl > 0 ? 'profit' : 'loss' : ''}>
                                {toMoney(master?.results?.dayPnl)}
                            </p>
                            <label>PNL dia</label>
                        </div>
                        <div className="card" elevation={23}>
                            <p className="value pnl" state={master?.results?.monthPnl !== 0 ? master?.results?.monthPnl > 0 ? 'profit' : 'loss' : ''}>
                                {toMoney(master?.results?.monthPnl)}
                            </p>
                            <label>PNL mês</label>
                        </div>
                        <div className="card" elevation={23}>
                            <p className="value roi" state={master?.results?.dayRoi !== 0 ? master?.results?.dayRoi > 0 ? 'profit' : 'loss' : ''}>
                                {toPercent(master?.results?.dayRoi, null, 2)}
                            </p>
                            <label>ROI dia</label>
                        </div>
                        <div className="card" elevation={23}>
                            <p className="value roi" state={master?.results?.monthRoi !== 0 ? master?.results?.monthRoi > 0 ? 'profit' : 'loss' : ''}>
                                {toPercent(master?.results?.monthRoi, null, 2)}
                            </p>
                            <label>ROI mês</label>
                        </div>
                    </section>

                    <SectionHeader
                        title="Slots"
                        iconButtons={[
                            new IconButtonConfig({
                                Icon: StopIcon,
                                color: 'error',
                                action: stopAllSlots,
                                title: 'Stop All Slots'
                            }),
                            new IconButtonConfig({
                                Icon: PlayArrowIcon,
                                color: 'success',
                                disabled: true,
                                title: 'Run All Slots',
                                action: runAllSlots
                            })
                        ]}
                    />

                    <div className="slots-list standard-grid grid">
                        {masterSlots?.map((slot, i) => <SlotTile key={slot?.cod} index={i} slot={slot}/> )}
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

                    <ActivitiesHistory customTitle="Histórico de Atividades" masterUID={master?._id} />
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

            <ArchiveConfirmation
                title="Deseja arquivar a conta?"
                message={`Tem certeza que você deseja arquivar a conta [${master?.cod}][${master?.name}]? Você poderá reativar ela no futuro!`}
                openState={archiveConfirmationState}
                onConfirm={archiveMaster}
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
