import { useEffect, useContext } from 'react';
import LogsList from './logsList';
import ActivityDataContext from '../../../context/activityData';

export default function LogsContent(){
    const {activityData} = useContext(ActivityDataContext);
    const {logsRead, logsUnread} = activityData || {};

    useEffect(() => {
        if (!window.queryParams) window.queryParams = {};
        if (!window.queryParams.logsPageUnread) {
            window.queryParams.logsPageUnread = 1;
        }
    });

    return (<div className="container">
        <section className="content-fullwidth">
            <div className="section-header">
                <h2 className="title">Logs do Sistema</h2>
            </div>
        </section>

        <section className="content-sidebar">
            <div className="content">  
                {logsUnread?.result?.length && <LogsList
                    logs={logsUnread}
                    read={false}
                />}

                {logsRead?.result?.length ? <LogsList
                    logs={logsRead}
                    read={true}
                /> : ''}
            </div>

            <div className="sidebar">
            </div>
        </section>
    </div>);
}
