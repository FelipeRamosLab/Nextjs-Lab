import {useState} from 'react';
import Modal from '../modals/main';

export default function ModalButton({ModalContent, children, buttonType}) {
    const [modalState, setModalState] = useState(false);

    return (<>
        <button className={buttonType || 'add-button'} onClick={()=>setModalState(!modalState)}>{children}</button>
        <Modal Content={ModalContent} open={modalState} />
    </>);
}