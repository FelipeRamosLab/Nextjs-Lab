export default function DevCharToolbar({textarea, setData}) {
    function handleSymbol(symbol) {
        if (symbol === '{') symbol += '\n  ';
        if (symbol === '[') symbol += '\n  ';
        setData((prev) => {
            return {...prev, configs: (prev.configs || '') + symbol };
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
    </div>);
}
