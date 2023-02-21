import { useState } from 'react';
import BotValuesAccordion from '../../contents/bot-details/botValuesAccordion';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import configs from '../../../../config.json';
import LoadingButton from '@mui/lab/LoadingButton';

export default function ThreadRuleEdit({ruleData, pageData}) {
    const [ruleChildren, setRuleChildren] = useState(ruleData.children);
    const [addRuleLoading, setAddRuleLoading] = useState(false);

    function handleAddRule() {
        setRuleChildren(prev => {
            const newData = [...prev, {author: configs.userTest}];
            return newData;
        });
    }

    return (
        <div className="thread-rule-form">
            <div className="section-header">
                <h3>Regra</h3>
                <IconButton aria-label="delete" size="small" color="error">
                    <DeleteIcon />
                </IconButton>
            </div>
            <BotValuesAccordion pageData={pageData} ruleChildren={ruleChildren} />

            <LoadingButton loading={addRuleLoading} variant="standard" sx={{width: '100%'}} onClick={() => handleAddRule()}>Adicionar Regra</LoadingButton>
        </div>
    );
}
