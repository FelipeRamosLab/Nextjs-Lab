import {useState} from 'react';

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ThreadBlockEdit from '../../forms/editing/threadBlock';

export default function BotEventsAccordion({ pageData }) {
    const botEval = pageData.bot.eval;
    const [editToggles, setEditToggles] = useState({});
    
    function toggleEdit(value){
        setEditToggles(prev => {
            const newObj = {...prev};
            newObj[value._id] = !newObj[value._id];

            return newObj;
        });
    }

    return (
        <div className="accordion-wrap">
            {Object.entries(botEval).map(([key, item]) => {
                if (item.thread) {
                    return (
                        <Accordion key={item._id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>[{item.cod}] {item.eventName}</Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <ThreadBlockEdit blockData={item.thread} pageData={pageData} />
                            </AccordionDetails>
                        </Accordion>
                    );
                }
            })}
        </div>
    );
}
