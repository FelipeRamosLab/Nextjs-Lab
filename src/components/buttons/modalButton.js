import {useState} from 'react';
import Modal from '../modals/main';

export default function ModalButton({ModalContent, buttonType, children, className}) {
    const [modalState, setModalState] = useState(false);

    return (<>
        <button type={buttonType || 'button'} className={className || 'button'} onClick={()=>setModalState(!modalState)}>{children}</button>
        <Modal Content={ModalContent} open={modalState}   modalCtrl={setModalState} />
    </>);
}