import {useState, useEffect} from 'react';
import EvalThread from '../../core/EvalThread';
import BlockEl from './BlockEl';

export default function BotThread({formState, actionEvent, threadCtrlState}) {
    const state = useState();
    const [threadCtrl, setThreadCtrl] = threadCtrlState;
    const [form, setForm] = formState;
    const [evalThread, setEvalThread] = state;
    let thread = evalThread && evalThread.thread;

    useEffect(()=>{
        setEvalThread(new EvalThread({
            ...form.eval[actionEvent],
            state: state,
            eventName: actionEvent
        }));
    }, []);

    useEffect(()=>{
        setForm((prev)=>{
            return { ...prev, eval: {...prev.eval, [actionEvent]: evalThread} };
        });
    }, [evalThread]);

    return <>
        <div className={`thread-blackboard ${threadCtrl === actionEvent ? '' : 'hide'}`}>
            <div className="header">
                <button type="button" className="button transparent" onClick={()=>setThreadCtrl(false)}>Voltar</button>
            </div>
            <h3>Configurar Thread ({actionEvent})</h3>

            {thread && <BlockEl className="main-block"  thread={evalThread} currentEl={evalThread.thread} parentEl={evalThread} />}
            {!thread && <div className="toolbar">
                <button type="button" className="toolbar-button full-width selected" onClick={() => evalThread.addBlock()}>Add a Block</button>
            </div>}
        </div>
    </>
}

export function Input({currentEl, state}) {
    const attributes = {};
    const [get, set] = state;

    switch(currentEl.primitiveType) {
        case 'number': {
            attributes.type = 'number';
            attributes.inputMode = 'numeric';
            break;
        }
        case 'string': {
            attributes.type = 'text';
            break;
        }
    }

    switch(currentEl.primitiveType) {
        case 'string':
        case 'number':
            return (
                <input
                    {...attributes}
                    value={get.primitiveValue || ''} 
                    onInput={(input) => set((prev) => {
                        return {...prev, primitiveValue: input.target.value };
                    })}
                />
            );
        default: {
            return <></>;
        }
    }
}
