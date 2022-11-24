import { Avatar, Button, CssBaseline, List, Typography ,ThemeOptions,createTheme} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinTrackerContext } from "../context/CoinTrackerContext";
import { CategoryType } from "../interface/Interface";
import OneCategoryCard from "./OneCategoryCard";
import { ThemeProvider } from "@emotion/react";
interface Props {}
const lightTheme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#6200ee",
    },
  },
});

const WizardStepTwo: React.FC<Props> = (props) => {
  const trackerContext = useContext(CoinTrackerContext);
  const navigate = useNavigate();

  //WizardStepTwo state on submit

  const onSubmitWizardStepTwo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/wizard/wizardthree");
  };
  const [disabledBtnWizardStepTwo, setDisabledBtnWizardStepTwo] =
    useState(true);
  useEffect(() => {
    if (
      trackerContext.categoryDB.some(
        (item: CategoryType) => item.isEnabled === true
      )
    ) {
      setDisabledBtnWizardStepTwo(false);
    } else {
      setDisabledBtnWizardStepTwo(true);
    }
  }, [trackerContext.categoryDB]);

  // --------------------

  return (
    <ThemeProvider theme={lightTheme}>
    <Container component="main" maxWidth="xs" sx={{ mb: 4 }}>
      <CssBaseline />
      <Box
        onSubmit={onSubmitWizardStepTwo}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
        }}
      >
        <Avatar
          sx={{ m: 1, width: 300, height: 300 }}
          alt="Remy Sharp"
          src="../logo-text.png"
        />
        <Typography component="h1" variant="h5">
          W E L C O M E
        </Typography>
        <Typography component="h1" variant="body1" sx={{ mt: 2 }}>
          Choose what u spend money on.
        </Typography>

        <Box sx={{ mt: 2, width: "100%" }}>
          <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
            {trackerContext.categoryDB.map((value) => (
              <OneCategoryCard
                key={`cardwizardStepTwo-${value.id}`}
                icon={value.icon}
                isEnabled={value.isEnabled}
                id={value.id}
                name={value.name}
              />
            ))}
          </List>
        </Box>

        <Button
          variant="contained"
          fullWidth
          disabled={disabledBtnWizardStepTwo}
          type="submit"
          sx={{ mt: 2 }}
        >
          ADD
        </Button>
      </Box>
    </Container>
    </ThemeProvider>
  );
};

export default WizardStepTwo;
