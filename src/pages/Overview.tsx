import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import {
  Autocomplete,
  ButtonGroup,
  createTheme,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SpeedDial,
  SpeedDialIcon,
  TextField,
  ThemeProvider
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ChildModal from "../components/ChildModal";
import OneCategoryFormControl from "../components/OneCategoryFormControl";
import { CoinTrackerContext } from "../context/CoinTrackerContext";
import { CategoryTypeType, EntriesType } from "../interface/Interface";

interface Props {}

const Overview: React.FC<Props> = (props) => {
  const theme = createTheme();
  const navigate = useNavigate();
  const trackerContext = useContext(CoinTrackerContext);

  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  const style = {
    position: "absolute" as "absolute",
    bottom: "12%",
    right: "4%",
    bgcolor: "transparent",
    display: "flex",
    flexDirection: "column",
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
  const [openUpdatemodal, setOpenUpdatemodal] = useState(false);

  const handleOpenModal = () => {
    setOpenUpdatemodal(true);
  };

  const handleCloseModal = () => {
    setOpenUpdatemodal(false);
  };

  //input for expense or income type AND Update
  // const [entryModal, setEntryModal] = useState<boolean>(true)
  const [entryUpdateData, setEntryUpdateData] = useState<EntriesType>({
    id: uuidv4(),
    Type: "income",
    categoryId: "",
    name: "",
    icon: "",
    budget: 0,
    date: "",
    desc: "",
  });

  const handleUpdateEntry = (id: string) => {
    let entryItem = trackerContext.entriesArr.find((el) => el.id === id);

    if (entryItem) {
      setEntryUpdateData(entryItem);
    }
    handleOpenModal();
  };

  ///RIGHT CLICK ON ENTRY

  const [dots, setDots] = useState({ x: "", y: "" });
  const [showDots, setShowDots] = useState(false);

  const [duplicateAndDeleteEntry, setDuplicateAndDeleteEntry] = useState("");

  //Duplciate entry
  const handleDuplicateEntry = () => {
    let duplicatedEntry = trackerContext.entriesArr.find(
      (el) => el.id === duplicateAndDeleteEntry
    );
    if (duplicatedEntry) {
      trackerContext.setEntriesArr([
        ...trackerContext.entriesArr,
        { ...duplicatedEntry, id: uuidv4() },
      ]);
    } else {
      return null;
    }
  };
  ///////

  //DeleteEntry
  const handleDeleteEntry = () => {
    if (window.confirm("Do you want to delete this entry?")) {
      trackerContext.setEntriesArr(
        trackerContext.entriesArr.filter(
          (el) => el.id !== duplicateAndDeleteEntry
        )
      );
    } else {
      return;
    }
  };

  //////

  //Create New Entry
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  ///////

  // On Right Click menu showing

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDots = (event: any, id: string) => {
    setDuplicateAndDeleteEntry(id);

    setShowDots(true);
    setDots({ x: event.clientX, y: event.clientY + scrollPosition });
  };

  const handleShowAndHideDots = () => {
    setShowDots(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleShowAndHideDots);
    return () => {
      window.removeEventListener("click", handleShowAndHideDots);
    };
  }, [showDots]);

  const buttons = [
    <Button
      sx={{ backgroundColor: "white", "&:hover": { backgroundColor: "white" } }}
      onClick={handleDuplicateEntry}
      key="one"
    >
      Duplicate
    </Button>,
    <Button
      sx={{ backgroundColor: "white", "&:hover": { backgroundColor: "white" } }}
      key="two"
      onClick={handleOpen}
    >
      Create New
    </Button>,
    <Button
      sx={{
        backgroundColor: "white",
        color: "red",
        "&:hover": { backgroundColor: "white" },
      }}
      key="three"
      onClick={handleDeleteEntry}
    >
      Delete
    </Button>,
  ];
  //////////////////

  /////////////////////////

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box

      className="headerBar"
        sx={{
          backgroundColor: "#6200ee",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <React.Fragment >
          <Box 
         
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                sx={{ m: 1, width: 80, height: 40 }}
                alt="Coin-Tracker"
                src="./logo.png"
              />
              <Typography
                sx={{ minWidth: 100, color: "white", marginLeft: "-20px" }}
                component="h1"
                variant="h6"
              >
                Overview
              </Typography>
            </Box>
            <Box>
              <Avatar
                sx={{ width: 40, height: 40, marginRight: "8px" }}
                alt="Remy Sharp"
                src={trackerContext.avatar}
              ></Avatar>
            </Box>
          </Box>
        </React.Fragment>
      </Box>

      <Container fixed>
        <Paper
          elevation={10}
          style={{ marginTop: "32px", borderRadius: "8px" }}
        >
          <Typography
            variant="h5"
            component="h3"
            sx={{
              textAlign: "left",
              padding: "10px",
              backgroundColor: "grey.200",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            Income
          </Typography>
          <Box sx={{ py: 2 }}>
            <Box
               className="purpleLinearNavbar"
              sx={{
                display: "flex",
                flexDirection: "column",
                "& > :not(style)": { m: 1 },
              }}
            >
              {trackerContext.categoryDB.map((item, index) => {
                if (item.isEnabled === true && item.Type === "income") {
                  return (
                    <OneCategoryFormControl
                      key={`incomeOverview-${item.id}`}
                      id={item.id}
                      icon={item.icon}
                      budget={item.budget}
                      name={item.name}
                   

                    />
                  );
                } else {
                  return null;
                }
              })}
            </Box>
          </Box>
        </Paper>

        <Paper
          elevation={10}
          style={{ marginTop: "32px", borderRadius: "8px" }}
        >
          <Typography
            variant="h5"
            component="h3"
            sx={{
              textAlign: "left",
              padding: "10px",
              backgroundColor: "grey.200",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            Expences
          </Typography>
          <Box sx={{ py: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                "& > :not(style)": { m: 1 },
              }}
            >
              {trackerContext.categoryDB.map((item, index) => {
                if (item.isEnabled === true && item.Type === "expense") {
                  return (
                    <OneCategoryFormControl
                      key={`expencesOverview-${item.id}`}
                      id={item.id}
                      icon={item.icon}
                      budget={item.budget}
                      name={item.name}
                  
                    />
                  );
                } else {
                  return null;
                }
              })}
            </Box>
          </Box>
        </Paper>

        <Paper
          elevation={10}
          style={{ marginTop: "32px", borderRadius: "8px" }}
        >
          <Typography
            variant="h5"
            component="h3"
            sx={{
              textAlign: "left",
              padding: "10px",
              backgroundColor: "grey.200",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            Entries
          </Typography>
          <Box sx={{ py: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                "& > :not(style)": { m: 1 },
              }}
            >
              <List sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
                {/* //Entries */}
                {trackerContext.entriesArr.map((item) => {
                  return (
                    <ListItem
                      key={`entriesCard-${uuidv4()}`}
                      onClick={() => {
                        handleUpdateEntry(item.id);
                      }}
                      sx={{
                        paddingLeft: "16px",
                        paddingRight: "16px",
                      }}
                      onContextMenu={(e) => handleDots(e, item.id)}
                    >
                      <ListItemButton
                        sx={{ paddingLeft: "0", paddingRight: "0" }}
                      >
                        <ListItemIcon>
                          <Icon>{`${item.icon}`}</Icon>
                        </ListItemIcon>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            borderBottom: "1px solid gray",
                          }}
                        >
                          <ListItemText
                            primary={`${item.name}`}
                            secondary={`${item.date}`}
                          />
                          <ListItemText
                            primary={`${item.Type === "income" ? "+" : "-"} ${
                              item.budget
                            }`}
                            sx={{
                              textAlign: "right",
                              color: `${
                                item.Type === "income" ? "green" : "red"
                              }`,
                            }}
                          />
                        </Box>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Box>
        </Paper>
        {showDots ? (
          <ButtonGroup
            style={{ position: "absolute", left: dots.x, top: dots.y ,zIndex:20}}
            orientation="vertical"
            aria-label="vertical outlined button group"
          >
            {buttons}
          </ButtonGroup>
        ) : null}
        <Modal
          open={openUpdatemodal}
          onClose={handleCloseModal}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              trackerContext.updateEntries(entryUpdateData);
              localStorage.setItem(
                "entries",
                JSON.stringify(trackerContext.entriesArr)
              );
              console.log(entryUpdateData);
              handleCloseModal();
            }}
          >
            <Box sx={{ ...style1, width: 400 }}>
              <Typography variant="body1" id="child-modal-title">
                Update Entry
              </Typography>

              <FormControl sx={{ mx: 0, my: 2, width: "100%" }}>
                <Select
                  value={entryUpdateData.Type}
                  onChange={(event) =>
                    setEntryUpdateData({
                      ...entryUpdateData,
                      Type: event.target.value as CategoryTypeType,
                    })
                  }
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
                  options={trackerContext.categoryDB}
                  getOptionLabel={(c) => c.name}
                  inputValue={entryUpdateData.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Category" />
                  )}
                  onChange={(e, newVal) =>
                    setEntryUpdateData({
                      ...entryUpdateData,
                      name: newVal?.name || "",
                      icon: newVal?.icon || "",
                    })
                  }
                />
              </FormControl>

              <TextField
                value={entryUpdateData.budget}
                id="outlined-basic"
                label="Amount"
                fullWidth
                variant="outlined"
                sx={{ mx: 0, my: 2 }}
                onChange={(e) =>
                  setEntryUpdateData({
                    ...entryUpdateData,
                    budget: +e.target.value,
                  })
                }
              />

              <TextField
                sx={{ mx: 0, my: 2 }}
                fullWidth
                id="date"
                label="Date"
                type="date"
                value={entryUpdateData.date}
                onChange={(e) =>
                  setEntryUpdateData({
                    ...entryUpdateData,
                    date: e.target.value,
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="outlined-basic"
                value={entryUpdateData.desc}
                label="Description (optional)"
                variant="outlined"
                fullWidth
                sx={{ mx: 0, my: 2 }}
                onChange={(e) =>
                  setEntryUpdateData({
                    ...entryUpdateData,
                    desc: e.target.value,
                  })
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
                  onClick={handleCloseModal}
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
      </Container>

      <div className="plusButton">
            <SpeedDial
              ariaLabel="SpeedDial controlled open example"
              sx={{ position: "absolute", bottom: 28, right: 10 }}
              icon={<SpeedDialIcon />}
              onClick={handleOpen}
              open={open}
            ></SpeedDial>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style }}>
                <ChildModal
                  name="ADD EXPENSE"
                  title="Add New Entry"
                  incomeOrExpenceProp="expense"
                />
                <ChildModal
                  name="ADD INCOME"
                  title="Add New Entry"
                  incomeOrExpenceProp="income"
                />
              </Box>
            </Modal>
          </div>

      <Box ref={ref} sx={{ paddingBottom: "150px" }} className="bottomNav">
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 ,backgroundColor: "#6200ee",borderRadius:0}}
          elevation={3}
        >
          


          <BottomNavigation
            sx={{
              backgroundColor: "#6200ee",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              maxWidth: "75%" 
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Overview"
              onClick={() => navigate("/overview")}
              sx={{ color: "white", minWidth: "80px", maxWidth: "168px" }}
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              label="Categories"
              onClick={() => navigate("/categories")}
              sx={{ color: "white", minWidth: "80px", maxWidth: "168px" }}
              icon={<CategoryIcon />}
            />
            <BottomNavigationAction
              label="Statistics"
              onClick={() => navigate("/statistics")}
              sx={{ color: "white", minWidth: "80px", maxWidth: "168px" }}
              icon={<LeaderboardIcon />}
            />
          </BottomNavigation>

        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Overview;
