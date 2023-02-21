import ModalButton from '../../buttons/modalButton';
import { FaTrash, FaPen } from 'react-icons/fa';
import BotValuesAccordion from './botValuesAccordion';
import BotEventsAccordion from './botEventsAccordion';

export default function BotDetails({ pageData, setPageData, queryParams }) {
    const { bot: { cod, name, author}} = pageData || {};
    const botEval = pageData.bot.eval;

    return (<>
        <div className="container">
            <section className="content-fullwidth">
                <div className="section-header">
                    <h1 className="title">[{cod}] {name}</h1>

                    <ModalButton className="circle-button transparent" ModalContent={(props)=> <></>}>
                        <FaPen />
                    </ModalButton>
                    <button type="button" className="circle-button" btn-color="error"><FaTrash /></button>
                </div>
            </section>

            <section className="content-sidebar">
                <div className="content">
                    <div className="section-header">
                        <h3>Limites da operação</h3>
                    </div>
                    <hr/>
                    <BotValuesAccordion pageData={pageData} setPageData={setPageData} queryParams={queryParams} />

                    <div className="section-header">
                        <h3>Avaliações do Bot</h3>
                    </div>
                    <hr/>
                    <BotEventsAccordion pageData={pageData} setPageData={setPageData} queryParams={queryParams} />
                </div>

                <div className="sidebar">
                </div>
            </section>
        </div>
    </>);
}
