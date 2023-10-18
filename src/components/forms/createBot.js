import { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AJAX from '../../utils/ajax'
import BotBasicInfoStep from './steps/createBot/basicInfo';

export const steps = [
    {
        label: 'Dados do robô',
        description: 'Insira abaixo os dados básicos do seu robô.',
        Content: BotBasicInfoStep
    }
];

export default function CreateBotForm({isLoadingState, formState, onClose, pageData}) {
    const [activeStep, setActiveStep] = useState(0);
    const [form, setForm] = formState;
    const [isLoading, setIsLoading] = isLoadingState;

    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    useEffect(() => {
        setForm(prev => {
            return {...prev, author: pageData?.user?._id}
        });

        setIsLoading(false);
    }, [ setIsLoading, setForm, pageData ]);

    async function saveBot() {
        setIsLoading(true);

        try {
            const saved = await new AJAX('/bot/create').put(form);
            window.open(createURL('/bot-details', {botuid: saved?.bot?._id}), '_self');
        } catch(err) {
            throw err;
        } finally {
            setIsLoading(false);
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
                            />}
                            
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={index === steps.length - 1 ? saveBot : handleNext}
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
