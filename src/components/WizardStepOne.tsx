import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  Button,
  createTheme,
  CssBaseline,
  TextField,
  ThemeOptions,
  Typography
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

const lightTheme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#6200ee",
    },
  },
});

const WizardStepOne: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  //WizardSetpOne state on submit
  const [wizardStepOne, setWizardStepOne] = useState(0);
  const [wizardStepOneButtonDisable, setWizardStepOneButtonDisable] =
    useState(true);

  //Validation on Submiting on Wizard STEP ONE PAGE and Navigating
  const onSubmitWizardStepOneDisableButton = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    navigate("/wizard/wizardtwo");
  };

  // WizardStepOne state for disabling the button
  useEffect(() => {
    if (wizardStepOne > 0) {
      setWizardStepOneButtonDisable(false);
    } else {
      setWizardStepOneButtonDisable(true);
    }
  }, [wizardStepOne]);

  return (
    <ThemeProvider theme={lightTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 2,
          }}
          onSubmit={onSubmitWizardStepOneDisableButton}
        >
          <Avatar
            sx={{ m: 1, width: 300, height: 300 }}
            alt="Remy Sharp"
            src="../logo-text.png"
          />
          <Typography component="h1" variant="h5">
            W E L C O M E
          </Typography>
          <Typography component="h1" variant="body1" sx={{ mt: 4 }}>
            How much money you have at the moment?
          </Typography>
          <TextField
            id="filled-basic"
            type={"number"}
            fullWidth
            label="Amount"
            variant="filled"
            dir="rtl"
            sx={{ mt: 5 }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWizardStepOne(parseInt(e.target.value))
            }
          />
          <Button
            variant="contained"
            fullWidth
            disabled={wizardStepOneButtonDisable}
            type="submit"
            sx={{ mt: 31 }}
          >
            ADD
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default WizardStepOne;
