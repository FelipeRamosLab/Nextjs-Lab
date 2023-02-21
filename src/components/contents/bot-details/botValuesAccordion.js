import {useState} from 'react';

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import BotValueEdit from '../../forms/editing/botValue';

export default function BotValuesAccordion({ pageData, setPageData, ruleChildren }) {
    const values = pageData && pageData.bot && pageData.bot.values;
    const [editToggles, setEditToggles] = useState({});
    const botValues = ruleChildren ? ruleChildren : values;

    function toggleEdit(value){
        setEditToggles(prev => {
            const newObj = {...prev};
            newObj[value._id] = !newObj[value._id];

            return newObj;
        });
    }

    return (
        <div className="accordion-wrap">
            {botValues && botValues.length && botValues.map((value, index) => {
                const functionData = value.functionUID || {};
                const categories = functionData.categories;

                return (
                    <Accordion key={value.cod || (Math.random() * 1000000000).toFixed(0)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography>[{value.cod}] {value.title || functionData.title || String(value.primitiveValue || '')} ({value.slug})</Typography>
                        </AccordionSummary>

                        <AccordionDetails style={{position: 'relative'}}>
                            {!editToggles[value._id] && value.valueType === 'function' && <div className="function-configs">
                                <h3>{functionData.title}</h3>

                                <div>   
                                    <label>Categorias:</label> <span>{categories && categories.join(', ')}</span>
                                </div>
                                <div>
                                    <label>Parâmetros:</label>
                                    {Object.entries(JSON.parse(value.configs || '{}')).map(([key, item]) => {
                                        switch (key) {
                                            case '_id': break;
                                            default: {
                                                return <p key={key}><b>{key}:</b> {String(item)}</p>
                                            }
                                        }
                                    })}
                                </div>
                            </div>}

                            {editToggles[value._id] && <BotValueEdit pageData={pageData} setPageData={setPageData} value={value} currentIndex={index} toggleEdit={toggleEdit} />}

                            {!editToggles[value._id] && <Fab size="small" aria-label="edit" onClick={() => toggleEdit(value)} style={{
                                position: 'absolute',
                                bottom: 16,
                                right: 16
                            }}>
                                <EditIcon />
                            </Fab>}
                        </AccordionDetails>
                    </Accordion>
                )
            }) || ''}
        </div>
    );
}
