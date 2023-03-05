import {useState, useContext} from 'react';

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import BotValueEdit from '../../forms/editing/botValue';
import ActivityDataContext from '../../../context/activityData';

export default function BotValuesAccordion({ ruleChildren }) {
    const {activityData} = useContext(ActivityDataContext);
    const values = activityData && activityData.bot && activityData.bot.values;
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
                let slugTitle = '';

                if (value.slug === 'stoploss_long') {
                    slugTitle = 'Stoploss (Compra)'
                }

                if (value.slug === 'stoploss_short') {
                    slugTitle = 'Stoploss (Venda)'
                }

                return (
                    <Accordion key={value.cod || (Math.random() * 1000000000).toFixed(0)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography>[{value.cod}] {slugTitle || value.name || functionData.title || String(value.primitiveValue || '')}</Typography>
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

                            {editToggles[value._id] && <BotValueEdit value={value} currentIndex={index} toggleEdit={toggleEdit} />}

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
