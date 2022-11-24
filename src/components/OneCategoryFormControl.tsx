import {
  FormControl,
  Icon,
  ListItemAvatar,
  ListItemButton,
  ListItemText
} from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useContext, useEffect, useState } from "react";
import { CoinTrackerContext } from "../context/CoinTrackerContext";



interface Props {
  id: string;
  icon: string;
  budget: number;
  name: string;
}

const OneCategoryFormControl: React.FC<Props> = ({
  budget,
  icon,
  id,
  name,

}) => {
  const trackerContext = useContext(CoinTrackerContext);

  const data = trackerContext.entriesArr
    .filter((item) => item.categoryId === id)
    .reduce((acc, item) => acc + item.budget, 0);

  const [progresBar, setProgresBar] = useState(0);

  useEffect(() => {
    let percent = (data / budget) * 100;
    if (percent >= 100) {
      setProgresBar(100);
    } else {
      setProgresBar(percent);
    }
  }, [data, budget]);

  return (
  
    <FormControl
      variant="standard"
      sx={{
        padding: 0,
        margin: 0,
        color: `${progresBar >= 100 ? "red " : "black"}`,
      }}
    >
      <ListItemButton>
        <ListItemAvatar>
          <Icon >
            {icon}
          </Icon>
        </ListItemAvatar>
        <ListItemText primary={name} />
        <ListItemText
          sx={{ textAlign: "right" }}
          primary={`${data} / ${budget}`}
        />
      </ListItemButton>
      <Box sx={{ width: "100%", paddingLeft: "70px", paddingRight: "16px" }}>
        <LinearProgress
          variant="determinate"
          value={progresBar}
          color={`${progresBar >= 100 ? "error"  : "success"}`}
        />
      </Box>
    </FormControl>
   
  );
};

export default OneCategoryFormControl;
