import { useState, useContext } from 'react';
import BotValuesAccordion from '../../contents/bot-details/botValuesAccordion';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogPopUp from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import ActivityDataContext from '../../../context/activityData';

export default function ThreadRuleEdit({ruleData}) {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const maxValuesReached = (ruleData.children.length >= 2);
    let ruleTitle = '';
    
    ruleData.children.map((child, index) => {
        if (child.toCompare) ruleTitle += ` ${child.toCompare} `;
        else if (index === 1) ruleTitle += ' / ';

        if (child.title) ruleTitle += child.title;
        if (child.valueType === 'function') ruleTitle += child.functionUID && child.functionUID.title;
        if (child.valueType === 'primitive') ruleTitle += child.primitiveValue || child.primitiveType;
    });

    async function deleteRule(confirmation) {
        if (confirmation) {
            setDeleteDialog(true);
            return;
        }

        try {
            setDeleteLoading(true);
            const UID = ruleData._id;
            const {data} = await axios.post('/api/bot/delete-rule', { UID, botUID: activityData.bot._id });

            if (data && data.success) {
                setActivityData(prev => {
                    return {...prev, bot: data.bot}
                });

                setDeleteLoading(false);
                setDeleteDialog(false);
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

    async function addBotValue() {
        setBackDrop(true);

        try {
            const added = await axios.post('/api/bot/add-value', {
                threadRuleUID: ruleData._id,
                botUID: activityData.bot._id
            });

            if (added.data.bot) {
                setActivityData(prev => {
                    return {...prev, bot: added.data.bot};
                });
            }
            setBackDrop(false);
        } catch(err) {
            throw err;
        }
    }

    return (
        <div className="thread-rule-form">
            <div className="section-header">
                <h3>Regra [ {ruleTitle} ]</h3>

                <IconButton 
                    size="small"
                    color="error"
                    onClick={() => deleteRule(true)}
                >
                    <DeleteIcon />
                </IconButton>
                <Dialog />
            </div>
            <BotValuesAccordion   ruleChildren={ruleData.children} />

            {!maxValuesReached && <div className="wrap-btn-flex">
                <Button variant="contained" onClick={() => addBotValue()}>Adicionar Parâmetro</Button>
            </div>}

            <Backdrop
                sx={{ color: '#fff', zIndex: 999999 }}
                open={backDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
