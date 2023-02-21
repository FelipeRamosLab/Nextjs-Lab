import { useState, forwardRef } from 'react';
import BotValuesAccordion from '../../contents/bot-details/botValuesAccordion';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import configs from '../../../../config.json';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogPopUp from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function ThreadRuleEdit({ruleData, pageData}) {
    const [ruleChildren, setRuleChildren] = useState(ruleData.children);
    const [addRuleLoading, setAddRuleLoading] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    function handleAddRule() {
        setRuleChildren(prev => {
            const newData = [...prev, {author: configs.userTest}];
            return newData;
        });
    }

    async function deleteRule(confirmation) {
        if (confirmation) {
            setDeleteDialog(true);
            return;
        }

        try {
            setDeleteLoading(true);
            const UID = ruleData._id;
            const {data} = await axios.post('/api/bot/delete-rule', { UID });

            if (data && data.success) {
                window.location.reload();
            } else {
                throw new Error(data);
            }
        } catch(err) {
            throw new Error(err);
        }
    }

    function Dialog() {
        return (
            <DialogPopUp
                open={deleteDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Tem certeza que deseja excluir?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Tem certeza que deseja excluir a regra {ruleData.cod}? Depois não será mais possível recuperar!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)}>Cancelar</Button>
                    <LoadingButton loading={deleteLoading} onClick={() => deleteRule()}>Confirmar</LoadingButton>
                </DialogActions>
            </DialogPopUp>
        );
    }

    return (
        <div className="thread-rule-form">
            <div className="section-header">
                <h3>Regra</h3>

                <IconButton 
                    size="small"
                    color="error"
                    onClick={() => deleteRule(true)}
                >
                    <DeleteIcon />
                </IconButton>
                <Dialog />
            </div>
            <BotValuesAccordion pageData={pageData} ruleChildren={ruleChildren} />

            <LoadingButton loading={addRuleLoading} variant="standard" sx={{width: '100%'}} onClick={() => handleAddRule()}>Adicionar Regra</LoadingButton>
        </div>
    );
}
