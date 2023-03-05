import { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ActivityDataContext from '../../context/activityData';

import SlotBasicInfoStep from './steps/createSlot/basicInfos';
import SlotAssetConfigStep from './steps/createSlot/assetConfig';
import SlotBotSelectStep from './steps/createSlot/botSelect';
import {lossConfig, gainConfig} from './steps/limitsConfig';

export const steps = [
    {
        label: 'Dados do slot',
        description: 'Insira abaixo os dados básicos do seu slot, colocar um nome no slot ajuda na visualização dos seus slots depois.',
        Content: SlotBasicInfoStep
    },
    {
        label: 'Dados do ativo',
        description: 'Escolha um ativo e o tempo gráfico que seu slot irá operar.',
        Content: SlotAssetConfigStep
    },
    {
        label: 'Escolher o robô',
        description: 'Escolha qual robô irá operar o seu slot.',
        Content: SlotBotSelectStep
    },
    lossConfig,
    gainConfig
];

export default function CreateSlotForm({isLoadingState, formState, onClose}) {
    const {activityData} = useContext(ActivityDataContext);
    const [activeStep, setActiveStep] = useState(0);
    const [assets, setAssets] = useState([]);
    const [bots, setBots] = useState([]);
    const [form, setForm] = formState;
    const [isLoading, setIsLoading] = isLoadingState;
    
    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    useEffect(() => {
        if (!form.limits) {
            setForm(prev => {
                return {
                    ...prev,
                    user: activityData && activityData.user._id,
                    master: activityData && activityData.master._id,
                    limits: {} 
                }
            });
        }
    }, [setForm, form.limits, activityData, activityData.user._id, activityData.master._id]);

    useEffect(() => {
        loadFormDependencies().then(res => {
            setAssets(res.assets);
            setBots(res.bots);

            setIsLoading(false);
        }).catch(err => {
            throw err;
        });
    }, []);
    
    async function saveNewSlot() {
        setIsLoading(true);

        try {
            if (!form.name && form.assets && form.assets.length) {
                form.name = form.assets[0].split('USDT')[0];
            }

            await ajax('/api/bot-account/create', form).post();

            onClose();
            window.location.reload();
        } catch(err) {
            setIsLoading(false);
            throw err;
        }
    }

    return (
        <form className="steps-form">
            {!isLoading && <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === (steps.length -1) ? (
                                    <Typography variant="caption">Último passo</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography marginBottom={0.5}>{step.description}</Typography>

                            {step.Content && <step.Content
                                formState={formState}
                                assets={assets}
                                bots={bots}
                                master={activityData && activityData.master}
                            />}
                            
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={index === steps.length - 1 ? saveNewSlot : handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Salvar' : 'Continuar'}
                                    </Button>
                                    {index > 0 && <Button
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Voltar
                                    </Button>}
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>}
        </form>
    );
}

export async function loadFormDependencies() {
    try {
        const assets = await ajax('/api/exchange/get-assets').post();
        const myBots = await ajax('/api/bot/my-bots').post();

        if (assets.success) {
            return {
                assets: assets.data,
                bots: myBots || []
            };
        } else {
            throw assets;
        }
    } catch(err) {
        throw err;
    }
}
