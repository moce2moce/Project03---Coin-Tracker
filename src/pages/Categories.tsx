import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import {
  Autocomplete,
  Checkbox,
  createTheme,
  FormControl,
  FormControlLabel,
  Icon,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
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
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ChildModal from "../components/ChildModal";
import { CoinTrackerContext } from "../context/CoinTrackerContext";
import {
  CategoryType,
  CategoryTypeType,
  initialIcons
} from "../interface/Interface";

interface Props {}

const Categories: React.FC<Props> = (props) => {
  const theme = createTheme();
  const navigate = useNavigate();
  const trackerContext = useContext(CoinTrackerContext);
  const [value, setValue] = React.useState(1);
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [updateOrAdd, setUpdateOrAdd] = useState(true);

  const [categoryModal, setCategoryModal] = React.useState(false);

  const handleCategoryModalOpen = () => {
    setCategoryModal(true);
  };

  const handleCategoryModalClose = () => {
    setCategoryModal(false);
    setUpdateOrAdd(true);
    setData({
      id: uuidv4(),
      Type: "income",
      name: "",
      icon: "",
      budget: 0,
      isEnabled: false,
    });
  };

  const handleUpdateModal = (id: string) => {
    let updateCategoryModal = trackerContext.categoryDB.find(
      (el) => el.id === id
    );
    if (updateCategoryModal) {
      setData(updateCategoryModal);
    }
    handleCategoryModalOpen();
  };

  const [data, setData] = useState<CategoryType>({
    id: uuidv4(),
    Type: "income",
    name: "",
    icon: "",
    budget: 0,
    isEnabled: false,
  });

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
        <React.Fragment>
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
                sx={{ minWidth: 100, color: "white", marginLeft: "-12px" }}
                component="h1"
                variant="h6"
              >
                Categories
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
        <Paper elevation={10} sx={{ marginTop: "32px", borderRadius: "8px" }}>
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
            Categories
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              "& > :not(style)": { m: 1 },
            }}
          >
            <List>
              <ListItem sx={{ padding: "0" }} onClick={handleCategoryModalOpen}>
                <ListItemButton sx={{ paddingLeft: "0", paddingRight: "0" }}>
                  <ListItemIcon>
                    <Icon>add</Icon>
                  </ListItemIcon>
                  <ListItemText primary={"Add Category"} />
                </ListItemButton>
              </ListItem>

              {trackerContext.categoryDB?.map((category) => (
                <ListItem
                  key={`categortyUnique-${uuidv4()}`}
                  sx={{
                    padding: "0",
                    color: category.Type === "income" ? "green" : "red",
                  }}
                  onClick={() => {
                    handleUpdateModal(category.id);
                    setUpdateOrAdd(false);
                  }}
                >
                  <ListItemButton sx={{ paddingLeft: "0", paddingRight: "0" }}>
                    <ListItemIcon>
                      <Icon
                        sx={{
                          color: category.Type === "income" ? "green" : "red",
                        }}
                        color="primary"
                      >
                        {category.icon}
                      </Icon>
                    </ListItemIcon>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        borderBottom: "1px solid black",
                      }}
                    >
                      <ListItemText primary={category.name} />
                      <ListItemText
                        primary={
                          category.budget === 0 ? (
                            <Typography
                              variant="caption"
                              display="block"
                              sx={{
                                lineHeight: "1.5",
                                fontSize: "0.43rem",
                                textAlign: "center",
                                color: "grey.500",
                              }}
                            >
                              NO
                              <br /> BUDGET <br />
                              LIMIT
                            </Typography>
                          ) : (
                            <Typography
                              variant="caption"
                              display="block"
                              sx={{
                                lineHeight: "1.5",
                                fontSize: "0.43rem",
                                textAlign: "center",
                                color: "grey.500",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "1rem",
                                  color: `${
                                    category.Type === "income" ? "green" : "red"
                                  }`,
                                }}
                              >
                                {category.budget}
                              </span>{" "}
                              <br />
                              {category.Type === "expense"
                                ? "BUDGET"
                                : "PLANNED"}
                            </Typography>
                          )
                        }
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      />
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>

        <Modal
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "rgb(255 255 255 / 75%)",
          }}
          hideBackdrop={true}
          open={categoryModal}
          onClose={handleCategoryModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style1, width: 400 }}>
            <Typography
              variant="body1"
              id="modal-modal-title"
              sx={{ color: "black" }}
            >
              {updateOrAdd ? "Add New Category" : "Update Category"}
            </Typography>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (updateOrAdd) {
                  trackerContext.addCategory(data);
                } else {
                  trackerContext.updateCategory(data);
                }
                handleCategoryModalClose();
                setData({
                  id: uuidv4(),
                  Type: "income",
                  name: "",
                  icon: "",
                  budget: 0,
                  isEnabled: false,
                });
              }}
            >
              <FormControl fullWidth sx={{ my: "30px" }}>
                <Select
                  value={data.Type}
                  onChange={(e) =>
                    setData({
                      ...data,
                      Type: e.target.value as CategoryTypeType,
                    })
                  }
                >
                  <MenuItem value={"income"}>Income</MenuItem>
                  <MenuItem value={"expense"}>Expense</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: "30px" }}>
                <TextField
                  value={data.name}
                  label="Name"
                  variant="outlined"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: "30px" }}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  options={initialIcons}
                  getOptionLabel={(c) => c.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={updateOrAdd ? "Icon" : "Build"}
                      label="Icon"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <InputAdornment position="start">
                              <Icon>{data.icon || "build"}</Icon>
                            </InputAdornment>
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  onChange={(e, newVal) =>
                    setData({ ...data, icon: newVal?.icon || "" })
                  }
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: "30px" }}>
                <TextField
                  onChange={(e) =>
                    setData({ ...data, budget: +e.target.value })
                  }
                  type={"number"}
                  label="Budget"
                  variant="outlined"
                  value={data.budget}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: "30px" }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Enabled
                </InputLabel>
                <OutlinedInput
                  disabled
                  id="outlined-adornment-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <FormControlLabel
                        value="start"
                        labelPlacement="start"
                        control={
                          <Checkbox
                            checked={data.isEnabled}
                            onChange={(e) =>
                              setData({ ...data, isEnabled: !data.isEnabled })
                            }
                          />
                        }
                        label=""
                      />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 5,
                }}
              >
                <Button
                  type="button"
                  onClick={handleCategoryModalClose}
                  sx={{ backgroundColor: "#6200ee", color: "white" }}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  sx={{ backgroundColor: "#6200ee", color: "white" }}
                >
                  {updateOrAdd ? "Add " : "Update"}
                </Button>
              </Box>
            </form>
          </Box>
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

      <Box ref={ref} sx={{ paddingBottom: "80px" }} className="bottomNav">
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0,backgroundColor: "#6200ee", borderRadius:0}}
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
              sx={{ color: "white", minWidth: "80px", maxWidth: "168px"  }}
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              label="Categories"
              onClick={() => navigate("/categories")}
              sx={{ color: "white", minWidth: "80px", maxWidth: "168px"  }}
              icon={<CategoryIcon />}
            />
            <BottomNavigationAction
              label="Statistics"
              onClick={() => navigate("/statistics")}
              sx={{ color: "white", minWidth: "80px", maxWidth: "168px"  }}
              icon={<LeaderboardIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Categories;
