import { useState, useRef } from 'react';
import {Input} from './BotThread';
import ModalSelect, {ModalSelectOptionModel as SelectOption} from '../inputs/modalSelect';
import DevCharToolbar from '../inputs/devCharToolbar';

export default function ConfigEl({pageData, thread, currentEl, withCondition}) {
    const [data, setData] = useState(currentEl);
    const functions = pageData && pageData.availableFunctions;
    const textarea = useRef();

    return (<>
        {withCondition && <div className="config rounded">
            <div className="content-body">
                <ModalSelect
                    label="Operador de comparação"
                    getter={currentEl.toCompare} 
                    setter={(value) => currentEl.setValue(thread, 'toCompare', value)} 
                    options={[
                        new SelectOption({title: '=', value: '='}),
                        new SelectOption({title: '>', value: '>'}),
                        new SelectOption({title: '<', value: '<'}),
                        new SelectOption({title: '>=', value: '>='}),
                        new SelectOption({title: 'Diferente', value: '!='}),
                        new SelectOption({title: 'Oposto', value: '!'}),
                    ]}
                />
            </div>
        </div>}
        <div className="config rounded">
            <div className="content-body">
                <ModalSelect
                    label="Tipo de valor"
                    getter={currentEl.valueType} 
                    setter={(value) => currentEl.setValue(thread, 'valueType', value)} 
                    options={[
                        new SelectOption({title: 'Função', value: 'function'}),
                        new SelectOption({title: 'Primitivo', value: 'primitive'})
                    ]}
                />

                {currentEl.valueType === 'function' && <div className="function-fields">
                    <ModalSelect
                        label="Função"
                        getter={currentEl.functionUID} 
                        setter={(value) => currentEl.setValue(thread, 'functionUID', value)} 
                        options={functions.map(fn =>  new SelectOption({title: fn.title, value: fn._id}))}
                    />

                    <label>Configs (JSON)</label>
                    <textarea
                        ref={textarea}
                        onBlur={(ev)=> currentEl.setValue(thread, 'configs', ev.target.value)}
                        onInput={(input) => setData((prev) => {
                            return {...prev, configs: input.target.value };
                        })}
                        value={data.configs}
                    ></textarea>

                    <DevCharToolbar textarea={textarea} setData={setData} fieldName="configs" />

                    <code datatype="json">
                        {functions.map(fn => {
                            if (fn._id === currentEl.functionUID) {
                                return JSON.stringify(fn.options.map(item => {
                                    return { [item.name]: item.dataType };
                                }));
                            }
                        })}
                    </code>
                </div>}

                {currentEl.valueType === 'primitive' && <div className="primitive-fields">
                    <ModalSelect
                        label="Tipo de primitivo"
                        getter={currentEl.primitiveType} 
                        setter={(value) => {
                            currentEl.primitiveValue = null;
                            currentEl.setValue(thread, 'primitiveType', value);
                        }} 
                        options={[
                            new SelectOption({title: 'Boolean', value: 'boolean'}),
                            new SelectOption({title: 'Number', value: 'number'}),
                            new SelectOption({title: 'String', value: 'string'}),
                            new SelectOption({title: 'Date', value: 'date'}),
                        ]}
                    />

                    {currentEl.primitiveType === 'boolean' && <ModalSelect
                        label="Valor Primitivo"
                        getter={currentEl.primitiveValue} 
                        setter={(value) => currentEl.setValue(thread, 'primitiveValue', value)} 
                        options={[
                            new SelectOption({title: 'True', value: true}),
                            new SelectOption({title: 'False', value: false})
                        ]}
                    />}

                    <Input thread={thread} currentEl={currentEl} state={[data, setData]} />
                </div>}
            </div>
        </div>
    </>);
}
