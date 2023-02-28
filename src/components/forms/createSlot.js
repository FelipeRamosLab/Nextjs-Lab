import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import SlotBasicInfoStep from './steps/createSlot/basicInfos';
import SlotAssetConfigStep from './steps/createSlot/assetConfig';
import SlotBotSelectStep from './steps/createSlot/botSelect';
import SlotLimitsConfigStep from './steps/createSlot/limitsConfig';

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
    {
        label: 'Limites de perda',
        description: 'Configure abaixo os limites de perda para trade, diário e mensal.',
        Content: ({formState}) => <SlotLimitsConfigStep
            formState={formState}
            configFields={[
                {
                    title: 'Trade',
                    description: 'Será baseado nesse valor que os stops dos trades serão calculados',
                    fieldName: 'tradeLoss'
                },
                {
                    title: 'Diário',
                    description: 'Caso o PNL do dia fique abaixo desse valor, o slot é pausado e só volta a operar no próximo dia',
                    fieldName: 'dailyLoss'
                },
                {
                    title: 'Mensal',
                    description: 'Caso o PNL do mês fique abaixo desse valor, o slot é pausado e só volta a operar no próximo mês',
                    fieldName: 'monthlyLoss'
                }
            ]}
        />
    },
    {
        label: 'Metas de lucro',
        description: 'Configure abaixo metas de lucro para o slot pausar quando forem atingidas.',
        Content: ({formState}) => <SlotLimitsConfigStep
            formState={formState}
            configFields={[
                {
                    title: 'Trade',
                    description: 'Será baseado nesse valor que os takeprofits dos trades serão calculados',
                    fieldName: 'tradeGain'
                },
                {
                    title: 'Diário',
                    description: 'Caso o PNL do dia seja maior que esse valor, o slot é pausado e só volta a operar no próximo dia',
                    fieldName: 'dailyGain'
                },
                {
                    title: 'Mensal',
                    description: 'Caso o PNL do mês seja maior que esse valor, o slot é pausado e só volta a operar no próximo mês',
                    fieldName: 'monthlyGain'
                }
            ]}
        />
    }
];

export default function CreateSlotForm({pageData, isLoadingState, formState, onClose}) {
    const [activeStep, setActiveStep] = useState(0);
    const [assets, setAssets] = useState([]);
    const [bots, setBots] = useState([]);
    const [form, setForm] = formState;
    const [isLoading, setIsLoading] = isLoadingState;

    useEffect(() => {
        if (!form.limits) {
            setForm(prev => {
                return {
                    ...prev,
                    user: pageData && pageData.user._id,
                    master: pageData && pageData.master._id,
                    limits: {} 
                }
            });
        }
    }, [setForm, form.limits, pageData, pageData.user._id, pageData.master._id]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

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
            const saved = await ajax('/api/bot-account/create', form).post();

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
                                master={pageData && pageData.master}
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

        if (assets.success && myBots.length) {
            return {
                assets: assets.data,
                bots: myBots
            };
        } else {
            throw assets;
        }
    } catch(err) {
        throw err;
    }
}
