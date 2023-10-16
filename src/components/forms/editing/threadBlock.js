import ThreadRuleEdit from "./threadRule";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogPopUp from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useState, useContext } from "react";
import ActivityDataContext from '../../../context/activityData';

export default function ThreadBlockEdit({blockData}) {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const [backDrop, setBackDrop] = useState(false);
    const [addBlockRuleLoading, setAddBlockRuleLoading] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const threadChildren = [...blockData.blocks, ...blockData.rules];
    const chidrenSorted = threadChildren.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
    });

    async function deleteBlock() {
        try {
            setDeleteLoading(true);
            const UID = blockData._id;
            const {data} = await axios.post('/bot/delete-block', { UID, botUID: activityData.bot._id });

            if (data && data.success) {
                setActivityData(prev => {
                    return {...prev, bot: data.bot}
                });

                setDeleteLoading(false);
                setDeleteDialog(false);
            } else {
                throw new Error({data});
            }
        } catch(err) {
            throw new Error(err);
        }
    }

    function Dialog() {
        return (
            <DialogPopUp
                open={deleteDialog}
            >
                <DialogTitle>{"Tem certeza que deseja excluir?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Tem certeza que deseja excluir o bloco lógico {blockData.cod}? Depois não será mais possível recuperar!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)}>Cancelar</Button>
                    <LoadingButton loading={deleteLoading} onClick={() => deleteBlock()}>Confirmar</LoadingButton>
                </DialogActions>
            </DialogPopUp>
        );
    }

    async function createBlockRule(type) {
        setAddBlockRuleLoading(type);

        try {
            const added = await axios.post('/bot/add-block-rule', {
                type: type,
                parentBlockUID: blockData._id,
                botUID: activityData.bot._id
            });
    
            if (added.data.bot) {
                setActivityData(prev => {
                    return {...prev, bot: added.data.bot};
                });
            }
            setAddBlockRuleLoading(false);
        } catch(err) {
            setAddBlockRuleLoading(false);
            throw new Error(err);
        }
    }

    async function updateThreadBlock(value) {
        setBackDrop(true);

        try {
            const updated = await axios.post('/bot/update-block', {
                _id: blockData._id,
                toUpdate: value,
                botUID: activityData.bot._id
            });
            
            setActivityData(prev => {
                return {...prev, bot: updated.data.bot};
            });
            setBackDrop(false);
        } catch(err) {
            setBackDrop(false);
            throw err.response || err;
        }
    }

    return (
        <div className="thread-block-form">
            <div className="section-header">
                <h3>Bloco Lógico</h3>
                <Button variant="standard" onClick={() => setDeleteDialog(true)}>Excluir Bloco</Button>
                <Dialog />
            </div>
            <hr/>

            <ToggleButtonGroup
                exclusive
                value={blockData.ifType}
                sx={{minWidth: '100%'}}
                onChange={(_, value) => updateThreadBlock({ifType: value})}
            >
                <ToggleButton value="and" sx={{flex: 1}}>
                    E
                </ToggleButton>
                <ToggleButton value="or" sx={{flex: 1}}>
                    OU
                </ToggleButton>
            </ToggleButtonGroup>

            {chidrenSorted.map(child => {
                switch (child.type) {
                    case 'evaluation': {
                        return <ThreadRuleEdit key={child._id} ruleData={child}   />
                    }
                    case 'block': {
                        return <ThreadBlockEdit key={child._id} blockData={child}   />
                    }
                }
            })}

            <div className="wrap-btn-flex">
                <LoadingButton
                    loading={(addBlockRuleLoading === 'blocks')}
                    variant="standard"
                    sx={{width: '100%'}}
                    onClick={() => createBlockRule('blocks')}
                >Adicionar Bloco</LoadingButton>
                <LoadingButton
                    loading={(addBlockRuleLoading === 'rules')}
                    variant="standard"
                    sx={{width: '100%'}}
                    onClick={() => createBlockRule('rules')}
                >Adicionar Regra</LoadingButton>
            </div>

            
            <Backdrop
                sx={{ color: '#fff', zIndex: 999999 }}
                open={backDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
