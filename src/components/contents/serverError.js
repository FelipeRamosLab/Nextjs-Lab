export default function ServerError({err}){
    return (<div className="error-page">
        <h1>500 - Ocorreu um erro no servidor</h1>
        <p>{err.message}</p>
    </div>);
}
