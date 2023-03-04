import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';
import { steps } from '../createMaster';

export default function EditMasterForm({formState, isLoadingState, pageData, isEditMode}) {
    const [expanded, setExpanded] = useState('panel0');
    const [isLoading, setIsLoading] = isLoadingState;

    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    return <form>
        {!isLoading && steps.map((step, index) => (
            <Accordion
                key={step.label + index}
                expanded={expanded === 'panel' + index}
                onChange={() => setExpanded('panel' + index)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={() => (expanded === 'panel' + index) && setExpanded('')}
                >
                    <Typography>
                        {step.label}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{step.description}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <step.Content
                        formState={formState}
                        pageData={pageData}
                        isEditMode={isEditMode}
                    />
                </AccordionDetails>
            </Accordion>
        ))}
    </form>
}
