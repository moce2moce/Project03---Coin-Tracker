import { Icon } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useContext } from "react";
import { CoinTrackerContext } from "../context/CoinTrackerContext";
import { CategoryType } from "../interface/Interface";

interface Props {
  id: string;
  isEnabled: boolean;
  icon: string;
  name: string;
}

export default function OneCategoryCard({ icon, id, isEnabled, name }: Props) {
  const trackerContext = useContext(CoinTrackerContext);

  const handleToggleIsEnable = (value: string) => {
    trackerContext.setCategoryDB(
      trackerContext.categoryDB.map((item: CategoryType) => {
        if (item.id === value) {
          return {
            ...item,
            isEnabled: !item.isEnabled,
          };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <ListItem
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={() => handleToggleIsEnable(id)}
          checked={isEnabled}
          sx={{
            color: "black",
            "&.Mui-checked": {
              color: "black",
            },
          }}
        />
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar style={{ backgroundColor: "white" }}>
            <Icon style={{ color: "black" }}>{icon}</Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
}
