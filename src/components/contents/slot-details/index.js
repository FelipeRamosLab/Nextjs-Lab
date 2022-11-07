import GridSlider from '../../sliders/grid-slider';
import ModalButton from '../../buttons/modalButton';
import CreateMaster from '../../forms/createMaster';
import { FaTrash, FaPen } from 'react-icons/fa';

export default function SlotDetails({ pageData, setPageData }) {
    const {slot} = pageData || {};

    return (
        <div className="container">
            <section className="content-fullwidth">
                <div className="section-header">
                    <h1 className="title">{slot.name}</h1>
                    <ModalButton className="circle-button transparent" ModalContent={(props)=> <></>}><FaPen /></ModalButton>
                    <button type="button" className="circle-button" btn-color="error"><FaTrash /></button>
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
                        <h2>Monitor</h2>
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
