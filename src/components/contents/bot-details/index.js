import BotValuesAccordion from './botValuesAccordion';
import BotEventsAccordion from './botEventsAccordion';
import Avatar from '@mui/material/Avatar';
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
import SeletionHeader from '../../headers/sectionHeader';
import IconButtonConfig from '../../../models/IconButtonConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteConfirmation from '../../modals/confirmation';
import AJAX from '../../../utils/ajax';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

export default function BotDetails({ queryParams }) {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const { bot: { cod, name, description, _id, status, author }} = Object(activityData);
    const [editModal, setEditModal] = useState(false);
    const deleteConfirmationState = useState(false);
    const [statusValue, setStatusValue] = useState(status);
    const [_, setDeleteConfirmation] = deleteConfirmationState;
    const formState = useState(activityData.bot);
    const [form] = formState;
    
    const authorFullName = `${author.firstName} ${author.lastName}`;

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
            const response = await new AJAX('/bot/update').post({
                botUID: _id,
                toUpdate: form
            });

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
            const deleted = await new AJAX('/bot/delete').post({
                botUID: _id
            });

            if (deleted.success) {
                window.open('/', '_self');
            }
        } catch(err) {
            throw err;
        }
    }

    async function handleStatusChange(_, newStatus) {
        try {
            const changed = await new AJAX('/bot/status-transition').post({
                botUID: _id,
                newStatus
            });

            if (changed.error) {
                throw changed;
            }

            if (changed.success) {
                setStatusValue(newStatus);
            }
        } catch (err) {
            alert(err?.message || err);
        }
    }

    return (<>
        <div className="container">
            <section className="content-fullwidth">
                <SeletionHeader
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
                    <div className="botstatus-wrap card spacing-md">
                        <h3 className="title text-center">Status</h3>
                        <p className="text-center">Seu robo está atualmente {statusValue === 'public' ? 'disponível para a utilização de terceiros na store.' : 'somente pode ser visualizado por você'}</p>

                        <ToggleButtonGroup
                            className="status-toggle"
                            value={statusValue}
                            exclusive
                            onChange={handleStatusChange}
                        >
                            <ToggleButton value="draft">Rascunho</ToggleButton>
                            <ToggleButton value="public">Público</ToggleButton>
                            <ToggleButton value="private">Privado</ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    <div className="sidebar-card card spacing-md">
                        <h3 className="title">Desenvolvimento</h3>
                        <Avatar
                            alt={authorFullName}
                        />

                        <div className="author-data">
                            <h3 className="title">{authorFullName}</h3>
                            <a className="subtitle" href={'mailto:' + author.email}>{author.email}</a>
                            <a className="subtitle" href={'tel:' + author.phone}>{author.phone}</a>
                        </div>
                    </div>
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
