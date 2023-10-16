import { FaTrash, FaPen } from 'react-icons/fa';
import BotValuesAccordion from './botValuesAccordion';
import BotEventsAccordion from './botEventsAccordion';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useContext } from 'react';
import EditBotForm from '../../forms/editing/bot';
import ActivityDataContext from '../../../context/activityData';
import SelctionHeader from '../../headers/sectionHeader'
import IconButtonConfig from '../../../models/IconButtonConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteConfirmation from '../../modals/confirmation';


export default function BotDetails({ queryParams }) {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const { bot: { cod, name, description, _id}} = activityData || {};
    const [editModal, setEditModal] = useState(false);
    const deleteConfirmationState = useState(false);
    const [_, setDeleteConfirmation] = deleteConfirmationState;
    const formState = useState(activityData.bot);
    const [form] = formState;

    function BootstrapDialogTitle(props) {
        const { children, onClose, ...other } = props;
      
        return (
          <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
        );
    }

    async function updateBot() {
        try {
            const response = await ajax('/bot/update', form).post();

            setEditModal(false);
            setActivityData(prev => {
                return {...prev, bot: response.bot}
            })
        } catch(err) {
            throw err;
        }
    }

    async function deleteBot() {
        try {
            const deleted = await ajax('/bot/delete', {
                botUID: _id
            }).post();

            if (deleted.success) {
                window.open('/', '_self');
            }
        } catch(err) {
            throw err;
        }
    }

    return (<>
        <div className="container">
            <section className="content-fullwidth">
                <SelctionHeader
                    title={`[${cod}] ${name}`}
                    iconButtons={[
                        new IconButtonConfig({
                            Icon: EditIcon,
                            action: () => setEditModal(true)
                        }),
                        new IconButtonConfig({
                            Icon: DeleteIcon,
                            action: () => setDeleteConfirmation(true)
                        })
                    ]}
                />                
            </section>

            <section className="content-sidebar">
                <div className="content">
                    <p>{description}</p>

                    <div className="section-header">
                        <h3>Limites da operação</h3>
                    </div>
                    <hr/>
                    <BotValuesAccordion queryParams={queryParams} />

                    <div className="section-header">
                        <h3>Avaliações do Bot</h3>
                    </div>
                    <hr/>
                    <BotEventsAccordion queryParams={queryParams} />
                </div>

                <div className="sidebar">
                </div>
            </section>

            <Dialog
                open={editModal}
                maxWidth="lg"
                PaperProps={{
                    sx: { width: '95%', maxWidth: 700, margin: 0}
                }}
            >
                <BootstrapDialogTitle onClose={() => setEditModal(false)}>
                    Editar Bot
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <EditBotForm formState={formState} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={updateBot}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>

            <DeleteConfirmation
                title="Deseja excluir o robô?"
                message={`Tem certeza que você deseja excluir o robô [${cod}][${name}] permanentemente? Você perderá todo o histórico de operações feito nele!`}
                openState={deleteConfirmationState}
                onConfirm={deleteBot}
            />
        </div>
    </>);
}
