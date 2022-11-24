import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import {
  Container,
  createTheme,
  SpeedDial,
  SpeedDialIcon,
  ThemeProvider,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ChildModal from "../components/ChildModal";
import ExpenseChart from "../components/ExpenseChart";
import IncomeChart from "../components/IncomeChart";
import MultiChart from "../components/MultiChart";
import { CoinTrackerContext } from "../context/CoinTrackerContext";

interface Props {}

const Statistics: React.FC<Props> = (props) => {
  const theme = createTheme();
  const navigate = useNavigate();
  const trackerContext = useContext(CoinTrackerContext);
  const [value, setValue] = React.useState(2);
  const ref = React.useRef<HTMLDivElement>(null);

  const style = {
    position: "absolute" as "absolute",
    bottom: "12%",
    right: "4%",
    bgcolor: "transparent",
    display: "flex",
    flexDirection: "column",
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
                sx={{ minWidth: 100, color: "white", marginLeft: "-20px" }}
                component="h1"
                variant="h6"
              >
                Statistics
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
        <IncomeChart />
        <ExpenseChart />
        <MultiChart />
      </Container>


      <div  className="plusButton">
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


      <Box ref={ref} sx={{ paddingBottom: "80px" }}  className="bottomNav">
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0,backgroundColor: "#6200ee",borderRadius:0 }}
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

export default Statistics;
