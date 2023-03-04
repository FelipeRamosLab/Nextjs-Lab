import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoadingButton from '@mui/lab/LoadingButton';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField
} from '@mui/material';

export default function LogsList({logs, read, setPageData}) {
    const [itemOpened, setItemOpened] = useState('');
    const [seemoreUnreadLoading, setSeemoreUnreadLoading] = useState(false);
    const [seemoreReadLoading, setSeemoreReadLoading] = useState(false);

    async function getLogs() {
        const currentPage = logs.options.paginate.page || 1;

        if (read) setSeemoreReadLoading(true);
        else setSeemoreUnreadLoading(true);

        try {
            const response = await ajax('/api/logs/get', {
                read,
                page: currentPage + 1
            }).post();
            
            if (response.success){
                setPageData(prev => {
                    return {...prev, [read ? 'logsRead' : 'logsUnread']: response.logs || []}
                });
            }
        } catch(err) {
            throw err;
        } finally {
            if (read) setSeemoreReadLoading(false);
            else setSeemoreUnreadLoading(false);
        }
    }

    return (<>
        <div className="accordion-wrap logs-list">
            {logs && logs.result.map((item) => {
                return (<Accordion
                    key={item.cod}
                    expanded={itemOpened === item.cod}
                    onChange={(_, isExpanded) => setItemOpened(isExpanded ? item.cod : '')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        onClick={() => (itemOpened === item.cod) && setItemOpened('')}
                    >
                        <div className="summary-content">
                            <div className="log-type" log-type={item.type}></div>
                            <div className="summary-col log-date">
                                <span>{new Date(item.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="summary-col log-name">
                                <span>{item.name}</span>
                                <p className="log-message">{item.message}</p>
                            </div>
                        </div>
                    </AccordionSummary>

                    <AccordionDetails>
                        <div className="details-item">
                            <label>Log cod: </label>
                            <p>{item.cod}</p>
                        </div>
                        <div className="details-item">
                            <label>Resource path: </label>
                            <p>{item.resource}</p>
                        </div>
                        <div className="details-item">
                            <label>Message: </label>
                            <p>{item.message}</p>
                        </div>
                        <div className="details-item">
                            <label>Stack: </label>
                            <TextField
                                multiline
                                disabled
                                value={item.stack}
                                variant="standard"
                            />
                        </div>
                    </AccordionDetails>
                </Accordion>);
            })}
        </div>
        
        <div className="buttons-wrap">
            <LoadingButton
                variant="contained"
                onClick={() => getLogs(read)}
                loading={seemoreUnreadLoading}
            >Ver Mais</LoadingButton>
        </div>
    </>);
}
