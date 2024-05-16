import { useEffect, useState, useRef } from 'react';
import AJAX from '../../utils/ajax';

export default function ActivitiesHistory({ customTitle, masterUID, slotUID, positionUID, botUID, limit = 5 }) {
    const [ activities, setActivities ] = useState([]);
    const [ seeMoreState, setSeeMoreState ] = useState(true);
    const page = useRef();
    
    const loadActivities = async () => {
        const ajax = new AJAX('/activities');
        const loaded = await ajax.get({
            page: page.current,
            limit,
            masterUID,
            slotUID,
            positionUID,
            botUID
        });

        if (loaded.success) {
            setActivities(prev => {
                if (page.current > 1) {
                    return [...prev, ...loaded.activities];
                } else {
                    return loaded.activities;
                }
            });
        }

        if (loaded.activities.length < 5) {
            setSeeMoreState(false)
        }
        return loaded;
    }

    const seeMore = async () => {
        const nextPage = page.current + 1;

        await loadActivities(nextPage);
        page.current = nextPage;
    }

    useEffect(() => {
        if (!page.current) {
            page.current = 1;
        }

        loadActivities();
    }, []);

    return (<div className="activities-history card">
        <h3 className="title text-center">{customTitle || 'Activities History'}</h3>

        {activities.map(activity => (<div key={activity.index} className="activity" title={new Date(activity.createdAt).toLocaleString()}>
            <p className="subject">{activity.subject}</p>
            <p className="summary">{activity.summary}</p>
        </div>))}

        {seeMoreState && activities.length >= limit && <div className="button-wrap">
            <button
                className="button full-width top-border transparent small"
                onClick={seeMore}
            >Ver Mais</button>
        </div>}
    </div>);
}
