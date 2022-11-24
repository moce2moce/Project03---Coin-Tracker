import { Box, FormControl, Icon, Input } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useContext } from "react";
import { CoinTrackerContext } from "../context/CoinTrackerContext";
import { CategoryType } from "../interface/Interface";

interface Props {
  id: string;
  icon: string;
  name: string;
}

const TwoCategoryCard: React.FC<Props> = ({ icon, id, name }) => {
  const trackerContext = useContext(CoinTrackerContext);

  const updateBudget = (amount: number, id: string) => {
    trackerContext.setCategoryDB(
      trackerContext.categoryDB.map((item: CategoryType) => {
        if (item.id === id) {
          return {
            ...item,
            budget: amount,
          };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <Box>
      <FormControl
        variant="standard"
        sx={{ padding: 0, margin: 0, width: "100%" }}
      >
        <Input
          onChange={(event) => updateBudget(parseInt(event.target.value), id)}
          id="input-with-icon-adornment"
          placeholder="0"
          type="number"
          startAdornment={
            <ListItemButton
              sx={{
                width: "250%",
                margin: "0",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  style={{
                    backgroundColor: "white",
                    justifyContent: "flex-start",
                  }}
                >
                  <Icon style={{ color: "black" }}>{icon}</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} />
            </ListItemButton>
          }
        />
      </FormControl>
    </Box>
  );
};

export default TwoCategoryCard;
