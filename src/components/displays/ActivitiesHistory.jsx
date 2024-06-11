import { useEffect, useState, useRef, useContext } from 'react';
import Skeleton from '@mui/material/Skeleton';
import SubscribeChangesContext from '../../context/subscribeChanges';

export default function ActivitiesHistory({ customTitle, masterUID, slotUID, positionUID, botUID, limit = 5, disableTitle }) {
    const socketInstance = useContext(SubscribeChangesContext);
    const [ activities, setActivities ] = useState([]);
    const [ seeMoreState, setSeeMoreState ] = useState(true);
    const page = useRef();
    
    const loadActivities = async () => {
        const socket = socketInstance();
        const filter = {};
        if(!socket.current) {
            return;
        }

        console.log(customTitle, masterUID, slotUID, positionUID, botUID, limit = 5, disableTitle)

        if (masterUID) filter.master = masterUID;
        if (slotUID) filter.slot = slotUID;
        if (positionUID) filter.position = positionUID;
        if (botUID) filter.bot = botUID;

        socket.current.emit('subscribe', {
            type: 'query',
            collection: 'activities',
            filter: {
                master: masterUID,
                slot: slotUID,
                position: positionUID,
                bot: botUID
            },
            options: {
                page: page.current,
                sort: {createdAt: -1},
                limit
            }
        }, ({ error, id }) => {
            if (error) {
                throw error;
            }

            socket.current.on(id, (snap) => {
                setActivities(prev => {
                    if (page.current > 1) {
                        return [...prev, ...snap];
                    } else {
                        return snap;
                    }
                });
            });
        });
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

        if (masterUID || slotUID || positionUID || botUID) {
            loadActivities();
        }
    }, [masterUID, slotUID, positionUID, botUID]);

    return (<div className="activities-history card">
        {!disableTitle && <h3 className="title text-center">{customTitle || 'Activities History'}</h3>}

        {!activities.length ? <>
            <Skeleton variant="rectangular" height={60} />
        </> : ''}

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
