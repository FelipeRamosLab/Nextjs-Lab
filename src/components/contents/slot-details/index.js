import { useState, useContext } from 'react';
import GridSlider from '../../sliders/grid-slider';
import Link from 'next/link';
import FormFillModal from '../../modals/formFill';
import EditSlotForm from '../../forms/editing/slot';
import DeleteConfirmation from '../../modals/confirmation';
import ActivityDataContext from '../../../context/activityData';
import SlotClosedPositions from './closedPositions';
import SlotLimits from '../../common/limits';
import SectionHeader from '../../headers/sectionHeader';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import IconButtonConfig from '../../../models/IconButtonConfig';

export default function SlotDetails() {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const {slot, bot} = activityData || {};
    const [editModal, setEditModal] = useState(false);
    const deleteConfirmationState = useState(false);
    const [_, setDeleteConfirmation] = deleteConfirmationState;

    async function updateSlot(form) {
        const result = {};

        try {
            Object.entries(form).map(([key, item]) => {
                if (JSON.stringify(item) !== JSON.stringify(activityData.slot[key])) {
                    result[key] = form[key];
                }
            });

            const response = await ajax('/api/bot-account/edit', {
                slotUID: slot._id,
                data: result
            }).post();

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
            const deleted = await ajax('/api/bot-account/delete', {
                slotUID: slot._id
            }).post();

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

    return (
        <div className="container">
            <section className="content-fullwidth">
                <SectionHeader title={slot?.name} iconButtons={[
                    new IconButtonConfig({
                        Icon: AttachMoneyIcon,
                        action: () => {}
                    }),
                    new IconButtonConfig({
                        Icon: EditIcon,
                        action: () => setEditModal(true)
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
                        <Link href={createURL('/bot-details', { bot: bot._id})} passHref>
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

            <FormFillModal
                title="Editar Slot"
                defaultData={activityData.slot}
                Content={EditSlotForm}
                openState={editModal}
                onClose={() => setEditModal(false)}
                saveAction={updateSlot}
            />

            <DeleteConfirmation
                title="Deseja excluir o slot?"
                message={`Tem certeza que você deseja excluir o slot [${slot.cod}][${slot.name}] permanentemente? Você perderá todo o histórico de operações feito nele.`}
                openState={deleteConfirmationState}
                onConfirm={deleteSlot}
            />
        </div>
    );
}
