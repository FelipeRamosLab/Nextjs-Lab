import {useState, useEffect} from 'react';
import EvalThread from '../../core/EvalThread';
import Action from '../../core/EvalThread/Action';
import BlockEl from './BlockEl';
import ActionEl from './ActionEl';

export default function BotThread({pageData, formState, actionEvent, threadCtrlState}) {
    const state = useState({});
    const [threadCtrl, setThreadCtrl] = threadCtrlState;
    const [form, setForm] = formState;
    const [evalThread, setEvalThread] = state;
    let thread = evalThread && evalThread.thread;

    useEffect(()=>{
        console.log(form[actionEvent])
        setEvalThread(new EvalThread({
            ...form.eval[actionEvent],
            state: state,
            action: {
                eventName: actionEvent
            }
        }));
    }, []);

    useEffect(()=>{
        window.BotThread = evalThread;

        setForm((prev)=>{
            console.log({ ...prev, eval: {...prev.eval, [actionEvent]: evalThread} })
            return { ...prev, eval: {...prev.eval, [actionEvent]: evalThread} };
        });
    }, [evalThread]);

    return <>
        <div className={`thread-blackboard ${threadCtrl === actionEvent ? '' : 'hide'}`}>
            <div className="header">
                <button type="button" className="button transparent" onClick={()=>setThreadCtrl(false)}>Voltar</button>
            </div>

            <ActionEl
                pageData={pageData}
                currentEl={evalThread && evalThread.action}
                evalThread={evalThread}
                setEvalThread={setEvalThread}
            />

            {thread && <BlockEl className="main-block" pageData={pageData} thread={evalThread} currentEl={evalThread.thread} parentEl={evalThread} />}
            {!thread && <div className="toolbar">
                <button type="button" className="toolbar-button full-width selected" onClick={() => evalThread.addBlock(evalThread)}>Add a Block</button>
            </div>}
        </div>
    </>
}

export function Input({thread, currentEl, state}) {
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
                    onBlur={(ev)=> {
                        currentEl.setValue(
                            thread, 
                            'primitiveValue', 
                            (currentEl.primitiveType === 'number') ? Number(ev.target.value) : ev.target.value
                        );
                    }}
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
