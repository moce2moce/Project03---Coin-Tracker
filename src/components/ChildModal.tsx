import { Autocomplete, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CoinTrackerContext } from "../context/CoinTrackerContext";
import {
  CategoryType,
  CategoryTypeType,
  EntriesType,
} from "../interface/Interface";

interface Props {
  name: string;
  title: string;
  incomeOrExpenceProp: CategoryTypeType;
}

const ChildModal: React.FC<Props> = ({ name, title, incomeOrExpenceProp }) => {
  const trackerContext = useContext(CoinTrackerContext);

  //Input for Expense or Income Type
  const [entryData, setEntryData] = useState<EntriesType>({
    id: uuidv4(),
    Type: incomeOrExpenceProp,
    categoryId: "",
    name: "",
    icon: "",
    budget: 0,
    date: new Date().toLocaleDateString("en-CA"),
    desc: "",
  });

  const handleChange = (event: SelectChangeEvent) => {
    setEntryData({
      ...entryData,
      Type: event.target.value as CategoryTypeType,
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEntryData({
      id: uuidv4(),
      Type: incomeOrExpenceProp,
      categoryId: "",
      name: "",
      icon: "",
      budget: 0,
      date: new Date().toLocaleDateString("en-CA"),
      desc: "",
    });
  };

  const style1 = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    px: 3,
    py: 1,
  };

  const [incomeOrExpense, setIncomeOrExpense] = useState<CategoryType[]>([]);

  useEffect(() => {
    if (entryData.Type === "income") {
      setIncomeOrExpense(
        trackerContext.categoryDB.filter((el) => el.Type === "income")
      );
    } else {
      setIncomeOrExpense(
        trackerContext.categoryDB.filter((el) => el.Type === "expense")
      );
    }
  }, [entryData, trackerContext.categoryDB]);

  return (
    <React.Fragment>
      <Button
        sx={{ color: "white", backgroundColor: "#6200ee", marginTop: "20px" }}
        onClick={handleOpen}
        className="hoverOnButtons"
      >
        {name}
      </Button>

      <Modal
        hideBackdrop={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            trackerContext.setEntriesArr([
              ...trackerContext.entriesArr,
              entryData,
            ]);
            handleClose();
          }}
        >
          <Box sx={{ ...style1, width: 400 }}>
            <Typography variant="body1" id="child-modal-title">
              {title}
            </Typography>

            <FormControl sx={{ mx: 0, my: 2, width: "100%" }}>
              <Select
                value={entryData.Type}
                onChange={handleChange}
                fullWidth
                displayEmpty
              >
                <MenuItem value={"income"}>Income</MenuItem>
                <MenuItem value={"expense"}>Expense</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ mx: 0, my: 2, width: "100%" }}>
              <Autocomplete
                fullWidth
                disablePortal
                options={incomeOrExpense}
                getOptionLabel={(c) => c.name}
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
                onChange={(e, newVal) =>
                  setEntryData({
                    ...entryData,
                    name: newVal?.name || "",
                    categoryId: newVal?.id || "",
                    icon: newVal?.icon || "",
                  })
                }
              />
            </FormControl>

            <TextField
              value={entryData.budget}
              id="outlined-basic"
              label="Amount"
              fullWidth
              variant="outlined"
              sx={{ mx: 0, my: 2 }}
              onChange={(e) =>
                setEntryData({ ...entryData, budget: +e.target.value })
              }
            />

            <TextField
              sx={{ mx: 0, my: 2 }}
              fullWidth
              id="date"
              label="Date"
              type="date"
              defaultValue={new Date().toLocaleDateString("en-CA")}
              onChange={(e) =>
                setEntryData({ ...entryData, date: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="outlined-basic"
              label="Description (optional)"
              variant="outlined"
              fullWidth
              sx={{ mx: 0, my: 2 }}
              onChange={(e) =>
                setEntryData({ ...entryData, desc: e.target.value })
              }
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 5,
              }}
            >
              <Button
                onClick={handleClose}
                type="button"
                sx={{ backgroundColor: "#6200ee", color: "white" }}
              >
                Close
              </Button>
              <Button
                type="submit"
                sx={{ backgroundColor: "#6200ee", color: "white" }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default ChildModal;
