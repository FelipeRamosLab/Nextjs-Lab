import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import MasterInfosStep from './steps/createMaster/masterInfos';
import { lossConfig, gainConfig } from './steps/limitsConfig';

export const steps = [
    {
        label: 'Dados da conta',
        description: 'Insira abaixo os dados básicos do sua conta.',
        Content: MasterInfosStep
    },
    lossConfig,
    gainConfig
];

export default function CreateMasterForm({pageData, isLoadingState, formState, onClose}) {
    const [activeStep, setActiveStep] = useState(0);
    const [form, setForm] = formState;
    const [isLoading, setIsLoading] = isLoadingState;
    
    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    console.log(form);

    useEffect(() => {
        if (!form.limits) {
            setForm(prev => {
                return {
                    ...prev,
                    user: pageData && pageData.user._id,
                    type: 'master-demo',
                    limits: {} 
                }
            });
        }
    }, [setForm, form.limits, pageData, pageData.user._id]);


    useEffect(() => setIsLoading(false), [setIsLoading]);

    async function saveNewMaster() {
        setIsLoading(true);

        try {
            await ajax('/api/master-account/create', form).post();

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
                                master={pageData && pageData.master}
                            />}
                            
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={index === steps.length - 1 ? saveNewMaster : handleNext}
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
