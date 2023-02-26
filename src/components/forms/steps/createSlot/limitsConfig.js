import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import LimitsGroupFormFragment from '../../fragments/limitsGroup';

export default function SlotLimitsConfigStep({formState, configFields}) {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (<div className="step-fields">
        {configFields && configFields.map((field, index) => (
            <Accordion key={field.title + index} expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>
                        {field.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{field.description}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <LimitsGroupFormFragment
                        formState={formState}
                        fieldName={field.fieldName}
                    />
                </AccordionDetails>
            </Accordion>
        ))}
    </div>);
}