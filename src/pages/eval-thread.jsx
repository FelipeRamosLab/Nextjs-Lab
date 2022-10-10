import {useState, useEffect} from 'react';
import EvalThread from '../core/EvalThread';
import BlockEl from '../components/botThread/BlockEl';

export default function EvalThreadPage() {
    const state = useState();
    const [evalThread, setEvalThread] = state;
    let thread = evalThread && evalThread.thread;

    console.log(thread)
    useEffect(()=>{
        setEvalThread(new EvalThread({
            state
        }));
    }, []);
    useEffect(()=>{
        window.BotThread = evalThread;
    }, [evalThread]);

    return <>
        <h1>Eval Thread Editor</h1>

        <form className="thread-blackboard">
            {thread && <BlockEl className="main-block" thread={evalThread} currentEl={evalThread.thread} parentEl={evalThread} />}
            {!thread && <div className="toolbar">
                <button type="button" className="toolbar-button full-width selected" onClick={() => evalThread.addBlock(evalThread)}>Add a Block</button>
            </div>}
        </form>
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
                    onBlur={(ev)=> currentEl.setValue(thread, 'primitiveValue', (currentEl.primitiveType === 'number') ? Number(ev.target.value) : ev.target.value)}
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
