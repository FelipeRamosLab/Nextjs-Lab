import {useState, useContext} from 'react';

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import BotValueEdit from '../../forms/editing/botValue';
import ActivityDataContext from '../../../context/activityData';
import LoadingButton from '@mui/lab/LoadingButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function BotValuesAccordion({ ruleChildren }) {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const values = activityData?.bot?.values;
    const [editToggles, setEditToggles] = useState({});
    const botValues = ruleChildren ? ruleChildren : values;
    const [addValueDialog, setAddValueDialog] = useState(false);
    const [loadingAddValue, setLoadingAddValue] = useState(false);

    function toggleEdit(value){
        setEditToggles(prev => {
            const newObj = {...prev};
            newObj[value._id] = !newObj[value._id];

            return newObj;
        });
    }

    function AddValueDialog() {
        return (
            <Dialog open={addValueDialog}>
                <DialogTitle>Escolha um evento para configurar</DialogTitle>
                <List sx={{ pt: 0 }}>
                    <ListItem>
                        <ListItemButton
                            disabled={Boolean(botValues.find(item => item.slug === 'stoploss_long'))}
                            onClick={() => addBotValue('stoploss_long')}
                        >
                            <ListItemText primary={'Stoploss COMPRA'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            disabled={Boolean(botValues.find(item => item.slug === 'stoploss_short'))}
                            onClick={() => addBotValue('stoploss_short')}
                        >
                            <ListItemText primary={'Stoploss VENDA'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            disabled={Boolean(botValues.find(item => item.slug === 'takeprofit_long'))}
                            onClick={() => addBotValue('takeprofit_long')}
                        >
                            <ListItemText primary={'Takeprofit COMPRA'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            disabled={Boolean(botValues.find(item => item.slug === 'takeprofit_short'))}
                            onClick={() => addBotValue('takeprofit_short')}
                        >
                            <ListItemText primary={'Takeprofit VENDA'} />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Button variant="contained" color="error" sx={{borderRadius: 0}} onClick={() => setAddValueDialog(false)}>Cancelar</Button>
            </Dialog>
        );
    }

    async function addBotValue(slug) {
        setLoadingAddValue(true);

        try {
            const added = await ajax('/api/bot/add-value', {
                botUID: activityData.bot._id,
                slug
            }).post();
            
            setActivityData(prev => {
                return {...prev, bot: added.bot}
            });
        } catch(err) {
            throw new Error(err);
        } finally {
            setAddValueDialog(false)
            setLoadingAddValue(false);
        }
    }

    return (
        <div className="accordion-wrap">
            {botValues && botValues.length && botValues.map((value, index) => {
                const functionData = value.functionUID || {};
                const categories = functionData.categories;
                let slugTitle = '';

                if (value.slug === 'stoploss_long') {
                    slugTitle = 'Stoploss (Compra)'
                }

                if (value.slug === 'stoploss_short') {
                    slugTitle = 'Stoploss (Venda)'
                }

                if (value.slug === 'takeprofit_long') {
                    slugTitle = 'Takeprofit (Compra)'
                }

                if (value.slug === 'takeprofit_short') {
                    slugTitle = 'Takeprofit (Venda)'
                }

                if (slugTitle || ruleChildren) {
                    return (
                        <Accordion key={value.cod || (Math.random() * 1000000000).toFixed(0)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography>[{value.cod}] {slugTitle || value.name || functionData.title || String(value.primitiveValue || '')}</Typography>
                            </AccordionSummary>
    
                            <AccordionDetails style={{position: 'relative'}}>
                                {!editToggles[value._id] && value.valueType === 'function' && <div className="function-configs">
                                    <h3>{functionData.title}</h3>
    
                                    <div>   
                                        <label>Categorias:</label> <span>{categories && categories.join(', ')}</span>
                                    </div>
                                    <div>
                                        <label>Parâmetros:</label>
                                        {Object.entries(JSON.parse(value.configs || '{}')).map(([key, item]) => {
                                            switch (key) {
                                                case '_id': break;
                                                default: {
                                                    return <p key={key}><b>{key}:</b> {String(item)}</p>
                                                }
                                            }
                                        })}
                                    </div>
                                </div>}
    
                                {editToggles[value._id] && <BotValueEdit value={value} currentIndex={index} toggleEdit={toggleEdit} />}
    
                                {!editToggles[value._id] && <Fab size="small" aria-label="edit" onClick={() => toggleEdit(value)} style={{
                                    position: 'absolute',
                                    bottom: 16,
                                    right: 16
                                }}>
                                    <EditIcon />
                                </Fab>}
                            </AccordionDetails>
                        </Accordion>
                    );
                }
            }) || ''}

            {!ruleChildren && <div className="wrap-btn-flex">
                <LoadingButton
                    loading={loadingAddValue}
                    variant="contained"
                    aria-label="save"
                    onClick={() => setAddValueDialog(true)}
                >Adicionar Valor</LoadingButton>

                <AddValueDialog />
            </div>}

            <Backdrop
                sx={{ color: '#fff', zIndex: 999999 }}
                open={loadingAddValue}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
