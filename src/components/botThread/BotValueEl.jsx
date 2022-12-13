import { useState, useRef, useEffect } from 'react';
import {Input} from './BotThread';
import ModalSelect, {ModalSelectOptionModel as SelectOption} from '../inputs/modalSelect';
import DevCharToolbar from '../inputs/devCharToolbar';

export default function BotValue({pageData, currentEl, withCondition, parentInstance}) {
    const [data, setData] = useState(currentEl);
    const functions = pageData && pageData.availableFunctions;
    const textarea = useRef();

    useEffect(() => {
        if (parentInstance === 'ThreadRule') {
            Object.keys(data).map(key => {
                currentEl[key] = data[key];
            });

            currentEl && currentEl.set && currentEl.set();
        } else {
            currentEl && currentEl.setState && currentEl.setState(prev => {
                return {...prev, values: {...prev.values, [currentEl.slug]: data}}
            });
        }
    }, [data]);

    return (<>
        {withCondition && <div className="config rounded">
            <div className="content-body">
                <ModalSelect
                    label="Operador de comparação"
                    getter={currentEl.toCompare} 
                    setter={(value) => setData(prev => {
                        return {...prev, toCompare: value}
                    })} 
                    options={[
                        new SelectOption({title: 'Igual', value: '='}),
                        new SelectOption({title: 'Maior que', value: '>'}),
                        new SelectOption({title: 'Menor que', value: '<'}),
                        new SelectOption({title: 'Maior ou igual a', value: '>='}),
                        new SelectOption({title: 'Menor ou igual a', value: '<='}),
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
                    setter={(value) => setData(prev => {
                        return {...prev, valueType: value}
                    })} 
                    options={[
                        new SelectOption({title: 'Função', value: 'function'}),
                        new SelectOption({title: 'Primitivo', value: 'primitive'})
                    ]}
                />

                {currentEl.valueType === 'function' && <div className="function-fields">
                    <ModalSelect
                        label="Função"
                        getter={currentEl.functionUID} 
                        setter={(value) => setData(prev => {
                            return {...prev, functionUID: value}
                        })} 
                        options={functions.map(fn => new SelectOption({title: fn.title, value: fn._id}))}
                    />

                    <label>Configs (JSON)</label>
                    <textarea
                        ref={textarea}
                        onInput={(input) => setData((prev) => {
                            return {...prev, configs: input.target.value };
                        })}
                        value={data.configs}
                    ></textarea>

                    <DevCharToolbar textarea={textarea} setData={setData} fieldName="configs" />

                    <code datatype="json">
                        {functions.map(fn => {
                            if (fn._id === currentEl.functionUID) {
                                return JSON.stringify(Object.entries(fn.options).map(([key, item]) => {
                                    return { [key]: item.type };
                                }));
                            }
                        })}
                    </code>
                </div>}

                {currentEl.valueType === 'primitive' && <div className="primitive-fields">
                    <ModalSelect
                        label="Tipo de primitivo"
                        getter={currentEl.primitiveType} 
                        setter={(value) => setData(prev => {
                            currentEl.primitiveValue = null;
                            return {...prev, primitiveType: value}
                        })} 
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
                        setter={(value) => setData(prev => {
                            return {...prev, primitiveValue: value}
                        })} 
                        options={[
                            new SelectOption({title: 'True', value: true}),
                            new SelectOption({title: 'False', value: false})
                        ]}
                    />}

                    <Input currentEl={currentEl} state={[data, setData]} />
                </div>}
            </div>
        </div>
    </>);
}
