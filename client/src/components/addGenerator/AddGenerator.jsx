import { useState } from 'react'
import { Button, Container, Stack, Step, StepButton, Stepper } from '@mui/material'

const AddGenerator = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [steps, setSteps] = useState([
    { label: 'Location', completed: false },
    { label: 'Details', completed: false },
    { label: 'Images', completed: false },
  ])
  return (
    <Container sx={{ my: 4 }}>
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        sx={{ mb: 3 }}
      >
        {steps.map((step, index) => (
          <Step key={step.label} completed={step.completed}>
            <StepButton onClick={() => setActiveStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Stack
        direction='row'
        sx={{pt: 2, pb: 7, justifyContent: 'space-around'}}
      >
        <Button
          color='inherit'
          disabled={}
        >
          Back
        </Button>
      </Stack>
    </Container>
  )
}

export default AddGenerator