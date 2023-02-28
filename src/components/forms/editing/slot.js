import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';
import {steps, loadFormDependencies} from '../createSlot';

export default function EditSlotForm({formState, isLoadingState, pageData}) {
    const [assets, setAssets] = useState([]);
    const [bots, setBots] = useState([]);
    const [expanded, setExpanded] = useState('panel0');
    const [isLoading, setIsLoading] = isLoadingState;

    useEffect(() => {
        loadFormDependencies().then(res => {
            setAssets(res.assets);
            setBots(res.bots);

            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            throw err;
        });
    }, []);

    return <form>
        {!isLoading && steps.map((step, index) => (
            <Accordion
                key={step.label + index}
                expanded={expanded === 'panel' + index}
                onChange={() => setExpanded('panel' + index)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>
                        {step.label}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{step.description}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <step.Content
                        formState={formState}
                        assets={assets}
                        bots={bots}
                        master={pageData.slot.master}
                    />
                </AccordionDetails>
            </Accordion>
        ))}
    </form>
}
