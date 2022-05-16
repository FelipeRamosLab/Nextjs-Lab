export default function FeedbackResult({title, message}){
    return (<div className="feedback-wrap">
        <h4 className={'title' + !message ? 'no-margin' : ''}>{title}</h4>
        {message && <p>{message}</p>}
    </div>);
}
