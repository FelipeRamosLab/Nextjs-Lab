export default function MainModal({open, Content, pageData, setPageData, modalCtrl}){
    if (open) {
        return (<div className="modal-backdrop">
            <div className="modal">
                <button type="button" className="close-btn" onClick={()=>modalCtrl(false)}>X</button>
                <Content pageData={pageData} setPageData={setPageData} modalCtrl={modalCtrl}/>
            </div>
        </div>);
    } else {
        return <></>;
    }
}
