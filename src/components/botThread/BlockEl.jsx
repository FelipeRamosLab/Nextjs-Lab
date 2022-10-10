import RuleEl from '../botThread/RuleEl';

export default function BlockEl({thread, currentEl, className}) {
    const blockChildrenKeys = Object.keys(currentEl.children || {});

    return <>
        <h5>Block</h5>
        <div className={"block rounded " + (className || '')}>
            <div className="toolbar">
                <button
                    type="button"
                    className={'toolbar-button' + (currentEl.ifType === 'or' ? ' selected': '')}
                    onClick={() => currentEl.setValue(thread, 'ifType', 'or')}
                >OR</button>
                <button
                    type="button"
                    className={'toolbar-button' + (currentEl.ifType === 'and' ? ' selected': '')}
                    onClick={() => currentEl.setValue(thread, 'ifType', 'and')}
                >AND</button>
            </div>

            <div className="content-body">
                {blockChildrenKeys.length ? blockChildrenKeys.map(key => {
                    const curr = currentEl.children[key];

                    switch (curr.type) {
                        case 'block': return <BlockEl key={curr.uid} thread={thread} currentEl={curr} />
                        case 'rule': return <RuleEl key={curr.uid} thread={thread} currentEl={curr} />
                        default: return <></>
                    }
                    
                }) : ''}
            </div>

            <div className="toolbar">
                <button type="button" className="toolbar-button full-width color-block" onClick={() => currentEl.addBlock(thread)}>Add Block</button>
                <button type="button" className="toolbar-button full-width color-rule" onClick={() => currentEl.addRule(thread)}>Add Rule</button>
            </div>
        </div>
    </>;
}
