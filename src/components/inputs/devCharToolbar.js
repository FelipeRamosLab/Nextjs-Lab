export default function DevCharToolbar({textarea, setData, fieldName, textAreaDefault}) {
    function handleSymbol(symbol) {
        if (symbol === '{') symbol += '\n';
        if (symbol === '[') symbol += '\n';
        if (symbol === 'tab') symbol = '  ';

        setData((prev) => {
            return {...prev, [fieldName]: (prev[fieldName] || '') + symbol };
        });

        textarea.current.focus();
    }

    function restoreDefault() {
        setData((prev) => {
            return {...prev, [fieldName]: JSON.stringify(textAreaDefault, null, 2) };
        });
    }

    return (<div className="toolbar">
        <button type="button" className="toolbar-button" onClick={() => handleSymbol('{')}>{'{'}</button>
        <button type="button" className="toolbar-button" onClick={() => handleSymbol('}')}>{'}'}</button>
        <button type="button" className="toolbar-button" onClick={() => handleSymbol('"')}>{'"'}</button>
        <button type="button" className="toolbar-button" onClick={() => handleSymbol(':')}>{':'}</button>
        <button type="button" className="toolbar-button" onClick={() => handleSymbol('[')}>{'['}</button>
        <button type="button" className="toolbar-button" onClick={() => handleSymbol(']')}>{']'}</button>
        <button type="button" className="toolbar-button" onClick={() => handleSymbol('tab')}>&rarr;</button>
        <button type="button" title="Restore Default" className="toolbar-button" onClick={() => restoreDefault()}>D</button>
    </div>);
}
