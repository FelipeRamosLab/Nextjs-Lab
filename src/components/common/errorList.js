export default function ErrorList({error}) {
    return (<div className="error-list">
        {error && error.validationErrors && error.validationErrors.map((err, i) => {
            return (<p key={error.name + i}>{err.message}</p>);
        })}
    </div>);
}
