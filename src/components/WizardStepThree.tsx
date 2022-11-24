import { Avatar, Button, CssBaseline, List, Typography,ThemeOptions,createTheme } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CoinTrackerContext } from "../context/CoinTrackerContext";
import TwoCategoryCard from "./TwoCategoryCard";
import { ThemeProvider } from "@emotion/react";
interface Props {}
const lightTheme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#6200ee",
    },
  },
});

const WizardStepThree: React.FC<Props> = (props) => {
  const trackerContext = useContext(CoinTrackerContext);
  const navigate = useNavigate();

  //WizardStepThree Navigate to Overview on submit
  const onSubmitWizardStepThree = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/overview");
  };

  return (
    <ThemeProvider theme={lightTheme}>
    <Container component="main" maxWidth="xs" sx={{ mb: 4 }}>
      <CssBaseline />
      <Box
        onSubmit={onSubmitWizardStepThree}
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
          Set how much money you want to spend on each category monthly.
        </Typography>

        <Box sx={{ mt: 2 }}>
          <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
            {trackerContext.categoryDB.map((value) => {
              if (value.isEnabled === true) {
                return (
                  <TwoCategoryCard
                    key={`card-${value.id}`}
                    icon={value.icon}
                    id={value.id}
                    name={value.name}
                  />
                );
              } else {
                return null;
              }
            })}
          </List>
        </Box>
        <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
          COMPLETE
        </Button>
      </Box>
    </Container>
    </ThemeProvider>
  );
};

export default WizardStepThree;
