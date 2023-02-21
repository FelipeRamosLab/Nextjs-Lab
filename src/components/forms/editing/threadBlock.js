import ThreadRuleEdit from "./threadRule";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogPopUp from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useState } from "react";

export default function ThreadBlockEdit({blockData, pageData}) {
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const threadChildren = [...blockData.blocks, ...blockData.rules];
    const chidrenSorted = threadChildren.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
    });
    const [sorted, setSorted] = useState(chidrenSorted);

    async function deleteBlock() {
        try {
            setDeleteLoading(true);
            const UID = blockData._id;
            const {data} = await axios.post('/api/bot/delete-block', { UID });

            if (data && data.success) {
                window.location.reload();
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

    return (
        <div className="thread-block-form">
            <div className="section-header">
                <h3>Bloco Lógico</h3>
                <Button variant="standard" onClick={() => setDeleteDialog(true)}>Excluir Bloco</Button>
                <Dialog />
            </div>
            <hr/>
            {sorted.map(child => {
                switch (child.type) {
                    case 'evaluation': {
                        return <ThreadRuleEdit key={child._id} ruleData={child} pageData={pageData} />
                    }
                    case 'block': {
                        return <ThreadBlockEdit key={child._id} blockData={child} pageData={pageData} />
                    }
                }
            })}

            <Button variant="standard" sx={{width: '100%'}}>Adicionar Bloco</Button>
        </div>
    );
}
