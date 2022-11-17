import { useState, useEffect } from 'react';
import ModalSelect, {ModalSelectOptionModel as SelectOption} from '../inputs/modalSelect';
import DevCharToolbar from '../inputs/devCharToolbar';

export default function ActionEl({pageData, currentEl, evalThread, actionEvent}) {
    const [data, setData] = useState(currentEl);
    const functions = pageData && pageData.availableFunctions;

    useEffect(() => {
        setData(prev => {
            return {...prev, eventName: actionEvent}
        });
    }, []);

    return (<div className="rounded">
        <ModalSelect
            label="Tipo de entrada de valor"
            getter={currentEl && currentEl.valueType} 
            setter={(value) => currentEl.setValue(evalThread, 'valueType', value)} 
            options={[
                new SelectOption({title: 'Função', value: 'function'}),
                new SelectOption({title: 'Valor Primitivo', value: 'primitive'})
            ]}
        />

        {currentEl && currentEl.valueType === 'function' && <div className="function-fields">
            <ModalSelect
                label="Função"
                getter={currentEl && currentEl.valueFunction} 
                setter={(value) => currentEl.setValue(evalThread, 'valueFunction', value)} 
                options={functions.map(fn =>  new SelectOption({title: fn.title, value: fn._id}))}
            />

            <label>Configs (JSON)</label>
            <textarea 
                onBlur={(ev)=> currentEl.setValue(evalThread, 'functionConfig', ev.target.value)}
                onInput={(input) => setData((prev) => {
                    return {...prev, functionConfig: input.target.value };
                })}
                value={data && data.functionConfig}
            ></textarea>

            <DevCharToolbar textarea={textarea} setData={setData} />

            <code datatype="json">
                {functions.map(fn => {
                    if (fn._id === currentEl.valueFunction) {
                        return JSON.stringify(fn.options.map(item => {
                            return { [item.name]: item.dataType };
                        }));
                    }
                })}
            </code>
        </div>}
    </div>);
}
