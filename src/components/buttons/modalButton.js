import {useState} from 'react';
import Modal from '../modals/main';

export default function ModalButton({ModalContent, children, className, pageData, setPageData}) {
    const [modalState, setModalState] = useState(false);

    return (<>
        <button className={className || 'button'} onClick={()=>setModalState(!modalState)}>{children}</button>
        <Modal Content={ModalContent} open={modalState} pageData={pageData} setPageData={setPageData} modalCtrl={setModalState} />
    </>);
}