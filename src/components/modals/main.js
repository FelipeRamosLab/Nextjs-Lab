export default function MainModal({open, Content, pageData, setPageData, modalCtrl}){
    if (open) {
        return (<div className="modal-backdrop">
            <div className="modal">
                <Content pageData={pageData} setPageData={setPageData} modalCtrl={modalCtrl}/>
                <button type="button" className="close-btn" onClick={()=>modalCtrl(false)}>X</button>
            </div>
        </div>);
    } else {
        return <></>;
    }
}
