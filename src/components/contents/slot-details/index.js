import { useState, useContext } from 'react';
import GridSlider from '../../sliders/grid-slider';
import Link from 'next/link';
import FormFillModal from '../../modals/formFill';
import EditSlotForm from '../../forms/editing/slot';
import Confirmation from '../../modals/confirmation';
import ActivityDataContext from '../../../context/activityData';
import SlotClosedPositions from './closedPositions';
import SlotLimits from '../../common/limits';
import SectionHeader from '../../headers/sectionHeader';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import IconButtonConfig from '../../../models/IconButtonConfig';
import ArchiveIcon from '@mui/icons-material/Archive';
import Fab from '@mui/material/Fab';
import Calculate from '@mui/icons-material/Calculate';
import AJAX from '../../../utils/ajax';
import CandlestickChart from '../../displays/CandlestickChart';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function SlotDetails() {
    const DeleteConfirmation = Confirmation;
    const ArchiveConfirmation = Confirmation;

    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const {slot, bot} = activityData || {};
    const [editModal, setEditModal] = useState(false);
    const deleteConfirmationState = useState(false);
    const archiveConfirmationState = useState(false);
    const [__, setArchiveConfirmationState] = archiveConfirmationState;
    const [_, setDeleteConfirmation] = deleteConfirmationState;

    async function updateSlot(form) {
        const result = {};

        try {
            Object.entries(form).map(([key, item]) => {
                if (JSON.stringify(item) !== JSON.stringify(activityData.slot[key])) {
                    result[key] = form[key];
                }
            });

            const response = await new AJAX('/slots/edit').post({
                slotUID: slot._id,
                data: result
            });

            setActivityData(prev => {
                return {...prev, slot: response.slot}
            });
            setEditModal(false);
        } catch(err) {
            throw err;
        }
    }

    async function deleteSlot() {
        try {
            const deleted = await new AJAX('/slots/delete').delete({
                slotUID: slot._id
            });

            if (deleted.success) {
                setDeleteConfirmation(false);

                window.open(createURL('/master-account', {
                    user: testData.userUID,
                    master: slot.master._id
                }), '_self');
            }
        } catch(err) {
            setDeleteConfirmation(false);
            throw err;
        }
    }
    
    async function archiveSlot() {
        if (!slot) return;

        try {
            const response = await new AJAX('/slots/switch-state').post({
                slotUID: slot._id,
                newState: 'archived'
            });

            if (response.success) {
                window.location.reload();
            }
        } catch (err) {
            throw err;
        }
    }

    async function openPosition() {
        try {
            const opened = await new AJAX('/positions/open-position').put({
                slotUID: slot._id,
                masterUID: slot.master._id,
                side: 'buy'
            });
        } catch (err) {
            throw err;
        }
    }

    async function runSlot() {
        try {
            const runned = await new AJAX('/slots/run').post({
                slotUID: slot._id,
                masterUID: slot.master
            });

            if (runned.success) {
                window.location.reload();
            } else {
                throw new Error();
            }
        } catch(err) {
            alert('Ocorreu um erro ao iniciar o slot!');
        }
    }

    async function stopSlot(type) {
        try {
            const stopping = await new AJAX('/slots/stop').post({
                type,
                slotUID: slot._id
            });

            if (!stopping.success) alert('Ocorreu um erro ao parar o slot!');

            window.location.reload();
        } catch(err) {
            alert('Ocorreu um erro ao parar o slot!');
        }
    }

    return (
        <div className="container">
            <section className="content-fullwidth">
                <SectionHeader title={slot?.name} iconButtons={[
                    new IconButtonConfig({
                        Icon: StopIcon,
                        color: 'error',
                        action: () => stopSlot('forced'),
                        display: (slot?.status === 'running')
                    }),
                    new IconButtonConfig({
                        Icon: PlayArrowIcon,
                        color: 'success',
                        action: runSlot,
                        display: (slot?.status === 'stopped')
                    }),
                    new IconButtonConfig({
                        Icon: AttachMoneyIcon,
                        action: () => {}
                    }),
                    new IconButtonConfig({
                        Icon: EditIcon,
                        action: () => setEditModal(true)
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
            </section>

            <section className="content-sidebar">
                <div className="content">
                    <div className="section-wrap">
                        <Link href={createURL('/bot-details', { botuid: bot?._id})} passHref>
                            <div className="card bot-card">
                                <div className="avatar">
                                    <h4>AV</h4>
                                </div>

                                <div className="card-body">
                                    <h3 className="title">{bot?.name || '---'}</h3>
                                    <p>{bot?.description || '---'}</p>
                                </div>
                            </div>
                        </Link>

                        <div className="stats-cards smaller">
                            <div className="card card-grad">
                                <span className="value">{toMoney(slot?.pnl)}</span>
                                <label>PNL Acumulado</label>
                            </div>
                            <div className="card card-grad">
                                <span className="value">{toMoney(slot?.totalUnrealizedPnl)}</span>
                                <label>Não Realizado</label>
                            </div>
                            <div className="card card-grad">
                                <span className="value">{toMoney(slot?.totalRealizedPnl)}</span>
                                <label>Lucro Realizado</label>
                            </div>
                        </div>

                        
                        <div className="slot-infos">
                            <GridSlider data={[
                                { label: 'PNL Dia', value: toMoney(slot?.results?.dayPnl)},
                                { label: 'ROE Dia', value: toPercent(slot?.results?.dayRoe)},
                                { label: 'PNL Mês', value: toMoney(slot?.results?.monthPnl)},
                                { label: 'ROE Mês', value: toPercent(slot?.results?.monthRoe)}
                            ]} />
                        </div>
                    </div>

                    <div className="section-wrap">
                        <div className="section-header">
                            <h2>Monitor</h2>
                        </div>

                        {false && slot?.assets && <CandlestickChart
                            symbol={slot?.assets?.length ? slot.assets[0] : ''}
                            interval={slot?.interval}
                            positions={activityData?.slot?.trades}
                        />}
                    </div>
                </div>

                <div className="sidebar">
                    <SlotLimits entity={slot} />
                </div>
            </section>

            <section className="content-fullwidth">
                <div className="section-header">
                    <h2>Posições fechadas</h2>
                </div>

                <div className="closed-positions" style={{maxWidth: '100%'}}>
                    <SlotClosedPositions />
                </div>
            </section>

            <Fab color="primary" className="bottom-right" onClick={() => openPosition()}>
                <Calculate />
            </Fab>

            <FormFillModal
                title="Editar Slot"
                defaultData={activityData.slot}
                Content={EditSlotForm}
                openState={editModal}
                onClose={() => setEditModal(false)}
                saveAction={updateSlot}
            />

            <ArchiveConfirmation
                title="Deseja arquivar a conta?"
                message={`Tem certeza que você deseja arquivar a conta [${slot?.cod}][${slot?.name}]? Você poderá reativar ela no futuro!`}
                openState={archiveConfirmationState}
                onConfirm={archiveSlot}
            />

            <DeleteConfirmation
                title="Deseja excluir o slot?"
                message={`Tem certeza que você deseja excluir o slot [${slot?.cod}][${slot?.name}] permanentemente? Você perderá todo o histórico de operações feito nele.`}
                openState={deleteConfirmationState}
                onConfirm={deleteSlot}
            />
        </div>
    );
}
