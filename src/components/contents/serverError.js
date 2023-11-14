export default function ServerError({ code, name, message }){
    return (<div className="error-page">
        <h1>{code} - {name}</h1>
        <p>{message}</p>
    </div>);
}
