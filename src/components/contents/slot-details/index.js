import GridSlider from '../../sliders/grid-slider';
import ModalButton from '../../buttons/modalButton';
import { FaTrash, FaPen } from 'react-icons/fa';
import FormFillModal from '../../modals/formFill';
import EditSlotForm from '../../forms/editing/slot';
import { useState } from 'react';

export default function SlotDetails({ pageData, setPageData }) {
    const {slot} = pageData || {};
    const [editModal, setEditModal] = useState(false);

    async function updateSlot(form) {
        const result = {};

        try {
            Object.entries(form).map(([key, item]) => {
                if (JSON.stringify(item) !== JSON.stringify(pageData.slot[key])) {
                    result[key] = form[key];
                }
            });

            const response = await ajax('/api/bot-account/edit', {
                slotUID: slot._id,
                data: result
            }).post();

            setPageData(prev => {
                return {...prev, slot: response.slot}
            });
            setEditModal(false);
        } catch(err) {
            throw err;
        }
    }

    return (
        <div className="container">
            <section className="content-fullwidth">
                <div className="section-header">
                    <h1 className="title">{slot.name}</h1>

                    <button type="button" className="circle-button" onClick={() => setEditModal(true)}><FaPen /></button>
                    <button type="button" className="circle-button" btn-color="error"><FaTrash /></button>

                    <FormFillModal
                        title="Editar Slot"
                        defaultData={pageData.slot}
                        Content={EditSlotForm}
                        openState={editModal}
                        onClose={() => setEditModal(false)}
                        saveAction={updateSlot}
                        pageData={pageData}
                    />
                </div>
            </section>

            <section className="content-sidebar">
                <div className="content">
                    <div className="section-wrap">

                        <div className="card bot-card">
                            <div className="avatar">
                                <h4>AV</h4>
                            </div>
                            <h3 className="title">{slot.bot.name}</h3>
                            <p>{slot.bot.description}</p>
                        </div>

                        <div className="stats-cards smaller">
                            <div className="card card-grad">
                                <span className="value">$1000</span>
                                <label>PNL Acumulado</label>
                            </div>
                            <div className="card card-grad">
                                <span className="value">$1000</span>
                                <label>Não Realizado</label>
                            </div>
                            <div className="card card-grad">
                                <span className="value">$1000</span>
                                <label>Margem Total</label>
                            </div>
                            <div className="card card-grad">
                                <span className="value">$1000</span>
                                <label>Lucro Realizado</label>
                            </div>
                        </div>

                        <GridSlider data={[
                            { label: 'item1', value: '$ 1000'}
                        ]} />
                    </div>

                    <div className="section-header">
                        <h2>Posições fechadas</h2>
                    </div>
                </div>

                <div className="sidebar">
                    
                </div>
            </section>
        </div>
    );
}
