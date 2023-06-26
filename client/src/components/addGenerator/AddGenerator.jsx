import { useEffect, useState } from 'react'
import { Box, Button, Container, Stack, Step, StepButton, Stepper } from '@mui/material'
import AddLocation from './addLocation/AddLocation'
import AddDetails from './addDetails/AddDetails'
import AddImages from './addImages/AddImages'
import { useValue } from '../../context/ContextProvider'
import { Send } from '@mui/icons-material'
import { createGenerator } from '../../actions/generator'

const AddGenerator = ({setPage}) => {
  const { state: { images, details, location, currentUser }, dispatch } = useValue()
  const [activeStep, setActiveStep] = useState(0)
  const [steps, setSteps] = useState([
    { label: 'Location', completed: false },
    { label: 'Details', completed: false },
    { label: 'Images', completed: false },
  ])

  const [showSubmit, setShowSubmit] = useState(false)

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((activeStep) => activeStep + 1);
    } else {
      const stepIndex = findUnfinished();
      setActiveStep(stepIndex);
    }
  };
  const checkDisabled = () => {
    if (activeStep < steps.length - 1) return false;
    const index = findUnfinished();
    if (index !== -1) return false;
    return true;
  };

  const findUnfinished = () => {
    return steps.findIndex((step) => !step.completed);
  };

  useEffect(() => {
    if (images.length) {
      if (!steps[2].completed) setComplete(2, true)
    } else {
      if (steps[2].completed) setComplete(2, false)
    }
  }, [images])

  useEffect(() => {
    if (details.company.length > 0 && details.usageType.length > 0 && details.genType.length > 0 && details.power.length > 0 && details.model.length > 0 && details.serialNumber.length > 0) {
      if (!steps[1].completed) setComplete(1, true)
    } else {
      if (steps[1].completed) setComplete(1, false)
    }
  }, [details])

  useEffect(() => {
    if (location.lng || location.lat) {
      if (!steps[0].completed) setComplete(0, true)
    } else {
      if (steps[0].completed) setComplete(0, false)
    }
  }, [location])

  const setComplete = (index, status) => {
    setSteps((steps) => {
      steps[index].completed = status
      return [...steps]
    })
  }

  useEffect(() => {
    if (findUnfinished() === -1) {
      if (!showSubmit) setShowSubmit(true)
    } else {
      if (showSubmit) setShowSubmit(false)
    }
  }, [steps])

  const handleSubmit = () => {
    const generator = {
      lng: location.lng,
      lat: location.lat,
      company: details.company,
      usageType: details.usageType,
      genType: details.genType,
      power: details.power,
      model: details.model,
      serialNumber: details.serialNumber,
      images
    }
    createGenerator(generator, currentUser, dispatch, setPage)
  }

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
      <Box
        sx={{ pb: 7, }}
      >
        {{
          0: <AddLocation />,
          1: <AddDetails />,
          2: <AddImages />,
        }[activeStep]}
        <Stack
          direction='row'
          sx={{ pt: 2, justifyContent: 'space-around' }}
        >
          <Button
            color='inherit'
            disabled={!activeStep}
            onClick={() => setActiveStep(activeStep => activeStep - 1)}
          >
            Back
          </Button>
          <Button
            disabled={checkDisabled()}
            onClick={handleNext}
          >
            Next
          </Button>
        </Stack>
        {showSubmit && (
          <Stack
            sx={{ alignItems: 'center' }}
          >
            <Button
              variant='contained'
              endIcon={<Send />}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        )}
      </Box>
    </Container>
  )
}

export default AddGenerator