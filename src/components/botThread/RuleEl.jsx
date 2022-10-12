import ConfigEl from './ConfigEl';

export default function RuleEl({pageData, thread, currentEl, parentEl}) {
    const ruleChildrenKeys = currentEl.children;

    return (<>
        <div className="rule rounded">
            <div className="content-body">
                <div className="header">
                    <h4 className="header-column">Rule</h4>
                    <button
                        type="button"
                        className="header-column button transparent"
                        onClick={() => currentEl.remove(thread, parentEl)}
                    >X</button>
                </div>

                {ruleChildrenKeys.length ? ruleChildrenKeys.map((item, i) => {
                    return <ConfigEl key={item.uid} pageData={pageData} thread={thread} currentEl={item} withCondition={i > 0 ? true : false}/>;
                }) : ''}

                {ruleChildrenKeys.length < 2 && <div className="toolbar rounded">
                    <button
                        type="button"
                        className="toolbar-button color-config"
                        onClick={() => currentEl.addConfig(thread)}
                    >Add Configs</button>
                </div>}
            </div>
        </div>
    </>);
}
