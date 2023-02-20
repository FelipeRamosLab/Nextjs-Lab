import ModalButton from '../../buttons/modalButton';
import CreateBot from '../../forms/createBot';
import { FaTrash, FaPen } from 'react-icons/fa';

export default function BotDetails({ pageData, setPageData }) {
    const {cod, name, author} = pageData || {};

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
                </div>

                <div className="sidebar">
                </div>
            </section>
        </div>
    </>);
}
