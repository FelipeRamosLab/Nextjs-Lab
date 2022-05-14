export default function MainModal({open, Content}){
    if (open) {
        return (<div className="modal-backdrop">
            <div className="modal">
                <Content />
            </div>
        </div>);
    } else {
        return <></>;
    }
}
