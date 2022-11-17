export default function DevCharToolbar({textarea, setData, fieldName}) {
    function handleSymbol(symbol) {
        if (symbol === '{') symbol += '\n';
        if (symbol === '[') symbol += '\n';
        if (symbol === 'tab') symbol = '  ';

        setData((prev) => {
            return {...prev, [fieldName]: (prev[fieldName] || '') + symbol };
        });

        textarea.current.focus();
    }

    return (<div className="toolbar">
        <button type="button" className="toolbar-button" onClick={() => handleSymbol('{')}>{'{'}</button>
        <button type="button" className="toolbar-button" onClick={() => handleSymbol('}')}>{'}'}</button>
        <button type="button" className="toolbar-button" onClick={() => handleSymbol('"')}>{'"'}</button>
        <button type="button" className="toolbar-button" onClick={() => handleSymbol(':')}>{':'}</button>
        <button type="button" className="toolbar-button" onClick={() => handleSymbol('[')}>{'['}</button>
        <button type="button" className="toolbar-button" onClick={() => handleSymbol(']')}>{']'}</button>
        <button type="button" className="toolbar-button" onClick={() => handleSymbol('tab')}>&rarr;</button>
    </div>);
}
