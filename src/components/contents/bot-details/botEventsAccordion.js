import {useContext, useState} from 'react';

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoadingButton from '@mui/lab/LoadingButton';
import ThreadBlockEdit from '../../forms/editing/threadBlock';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import ActivityDataContext from '../../../context/activityData';

export default function BotEventsAccordion() {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const botEval = activityData.bot && activityData.bot.eval;
    const [loadingAddEvent, setLoadingAddEvent] = useState(false);
    const [addEventDialog, setAddEventDialog] = useState(false);
    const [addEventName, setAddEventName] = useState('');

    async function addBotEvent(eventName) {
        setLoadingAddEvent(true);
        setAddEventName(eventName);

        try {
            const added = await axios.post('/api/bot/add-event', {
                botUID: activityData.bot._id,
                eventName
            });
            
            setActivityData(prev => {
                return {...prev, bot: added.data}
            });
        } catch(err) {
            throw new Error(err);
        } finally {
            setAddEventDialog(false)
            setLoadingAddEvent(false);
        }
    }

    function AddEventDialog() {
        return (
            <Dialog open={addEventDialog}>
                <DialogTitle>Escolha um evento para configurar</DialogTitle>
                <List sx={{ pt: 0 }}>
                    <ListItem>
                        <ListItemButton disabled={Boolean(botEval.openLong && botEval.openLong.thread)} onClick={() => addBotEvent('openLong')}>
                            <ListItemText primary={'Abrir Compra'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton disabled={Boolean(botEval.openShort && botEval.openShort.thread)} onClick={() => addBotEvent('openShort')}>
                            <ListItemText primary={'Abrir Venda'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton disabled={Boolean(botEval.closeLong && botEval.closeLong.thread)} onClick={() => addBotEvent('closeLong')}>
                            <ListItemText primary={'Fechar Compra'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton disabled={Boolean(botEval.closeShort && botEval.closeShort.thread)} onClick={() => addBotEvent('closeShort')}>
                            <ListItemText primary={'Fechar Venda'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton disabled={Boolean(botEval.trailingStop && botEval.trailingStop.thread)} onClick={() => addBotEvent('trailingStop')}>
                            <ListItemText primary={'Ajustar Trailing Stop'} />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Button variant="contained" color="error" sx={{borderRadius: 0}} onClick={() => setAddEventDialog(false)}>Cancelar</Button>
            </Dialog>
        );
    }

    return (
        <div className="bot-events-wrap">
            <div className="accordion-wrap">
                {Object.entries(botEval).map(([key, item]) => {
                    if (item.thread) {
                        return (
                            <Accordion key={item._id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography>[{item.cod}] {item.eventName}</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <ThreadBlockEdit blockData={item.thread} />
                                </AccordionDetails>
                            </Accordion>
                        );
                    }
                })}
            </div>

            <div className="wrap-btn-flex">
                <LoadingButton
                    loading={loadingAddEvent}
                    className="cta"
                    variant="contained"
                    aria-label="save"
                    onClick={() => setAddEventDialog(true)}
                >Adicionar Evento</LoadingButton>

                <AddEventDialog
                    selectedValue={addEventName}
                />
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: 999999 }}
                open={loadingAddEvent}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
