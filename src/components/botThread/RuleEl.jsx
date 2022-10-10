import ConfigEl from './ConfigEl';

export default function RuleEl({thread, currentEl}) {
    const ruleChildrenKeys = currentEl.children;

    return (<>
        <div className="rule rounded">
            <div className="content-body">
                <h4>Rule</h4>
                {ruleChildrenKeys.length ? ruleChildrenKeys.map((item, i) => {
                    return <ConfigEl key={item.uid} thread={thread} currentEl={item} withCondition={i > 0 ? true : false}/>;
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
