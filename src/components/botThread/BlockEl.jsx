import RuleEl from '../botThread/RuleEl';

export default function BlockEl({thread, currentEl, className, parentEl}) {
    const blockChildrenKeys = Object.keys(currentEl.children || {});

    return <>
        <div className="header">
            <h4 className="header-column">Block</h4>
            <button
                type="button"
                className="header-column button transparent"
                onClick={() => currentEl.remove(thread, parentEl)}
            >X</button>
        </div>
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
                        case 'block': return <BlockEl key={curr.uid} thread={thread} currentEl={curr} parentEl={currentEl} />
                        case 'rule': return <RuleEl key={curr.uid} thread={thread} currentEl={curr} parentEl={currentEl} />
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
