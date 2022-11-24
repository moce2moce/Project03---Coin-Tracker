import { Box } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import WizardStepOne from "../components/WizardStepOne";
import WizardStepThree from "../components/WizardStepThree";
import WizardStepTwo from "../components/WizardStepTwo";

interface Props {}

const Wizard: React.FC<Props> = (props) => {
  const location = useLocation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 4,
      }}
    >
      {location.pathname === "/wizard/wizardone" ? <WizardStepOne /> : null}
      {location.pathname === "/wizard/wizardtwo" ? <WizardStepTwo /> : null}
      {location.pathname === "/wizard/wizardthree" ? <WizardStepThree /> : null}
    </Box>
  );
};

export default Wizard;
