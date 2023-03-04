import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import LimitsGroupFormFragment from '../fragments/limitsGroup';

export default function LimitsConfigStep({formState, configFields}) {
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

export const lossConfig = {
    label: 'Limites de perda',
    description: 'Configure abaixo os limites de perda para trade, diário e mensal.',
    Content: ({formState}) => <LimitsConfigStep
        formState={formState}
        configFields={[
            {
                title: 'Trade',
                description: 'Será baseado nesse valor que os stops dos trades serão calculados',
                fieldName: 'tradeLoss'
            },
            {
                title: 'Diário',
                description: 'Caso o PNL do dia fique abaixo desse valor, o slot é pausado e só volta a operar no próximo dia',
                fieldName: 'dailyLoss'
            },
            {
                title: 'Mensal',
                description: 'Caso o PNL do mês fique abaixo desse valor, o slot é pausado e só volta a operar no próximo mês',
                fieldName: 'monthlyLoss'
            }
        ]}
    />
};

export const gainConfig = {
    label: 'Metas de lucro',
    description: 'Configure abaixo metas de lucro para o slot pausar quando forem atingidas.',
    Content: ({formState}) => <LimitsConfigStep
        formState={formState}
        configFields={[
            {
                title: 'Trade',
                description: 'Será baseado nesse valor que os takeprofits dos trades serão calculados',
                fieldName: 'tradeGain'
            },
            {
                title: 'Diário',
                description: 'Caso o PNL do dia seja maior que esse valor, o slot é pausado e só volta a operar no próximo dia',
                fieldName: 'dailyGain'
            },
            {
                title: 'Mensal',
                description: 'Caso o PNL do mês seja maior que esse valor, o slot é pausado e só volta a operar no próximo mês',
                fieldName: 'monthlyGain'
            }
        ]}
    />
};
