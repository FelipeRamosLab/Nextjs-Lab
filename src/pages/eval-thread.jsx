import {useState, useEffect} from 'react';
import EvalThread from '../core/EvalThread';

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
        window.testEval = evalThread;
    }, [evalThread]);

    return <>
        <h1>Eval Thread Editor</h1>

        <div className="thread-blackboard">
            {thread && <BlockEl getState={evalThread} currentEl={evalThread.thread} />}
            {!thread && <>
                <button className="button full-width" onClick={() => evalThread.addBlock(evalThread)}>Add a Block</button>
            </>}
        </div>
    </>
}

function BlockEl({getState, currentEl}) {
    const blockChildrenKeys = Object.keys(currentEl.children || {});

    return <div className="block">
        {blockChildrenKeys.length ? blockChildrenKeys.map(key => {
            const curr = currentEl.children[key];

            switch (curr.type) {
                case 'block': return <BlockEl key={curr.uid} currentEl={curr} />
                case 'rule': return <>Rule</>
                default: return <></>
            }
            
        }) : ''}

        <button className="button full-width" onClick={() => currentEl.addBlock(getState)}>Add Block</button>
        <button className="button full-width">Add Rule</button>
    </div>;
}
