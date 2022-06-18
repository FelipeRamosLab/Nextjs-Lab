export default function Input({label, type, placeholder, value, formSetter, css}){
    const inputConfig = pickInputMode(type);

    return (
        <fieldset className={css || ''}>
            {label && <label>{label}</label>}
            <input
                type={inputConfig.type}
                inputMode={inputConfig.inputMode}
                placeholder={placeholder || ''}
                value={value}
                onChange={formSetter}
            />
        </fieldset>
    );
}

function pickInputMode(type) {
    switch (type) {
        case 'number': {
            return { type: 'text', inputMode: 'numeric' }
        }
        case 'phone': {
            return { type: 'text', inputMode: 'tel'}
        }
        case 'email': {
            return { type: 'text', inputMode: 'email' }
        }
        case 'text':
        default: {
            return { type: 'text' }
        }
    }
}
