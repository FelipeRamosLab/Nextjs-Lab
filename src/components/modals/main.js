export default function MainModal({open, Content, pageData, modalCtrl}){
    if (open) {
        return (<div className="modal-backdrop">
            <div className="modal">
                <Content pageData={pageData}/>
                <button type="button" className="close-btn" onClick={()=>modalCtrl(false)}>X</button>
            </div>
        </div>);
    } else {
        return <></>;
    }
}
