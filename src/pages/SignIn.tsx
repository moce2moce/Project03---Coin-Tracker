import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  ThemeOptions
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CoinTrackerContext } from "../context/CoinTrackerContext";
interface Props {}

const lightTheme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#6200ee",
    },
  },
});

const SignIn: React.FC<Props> = (props) => {
  const trackerContext = useContext(CoinTrackerContext);

  const [values, setValues] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [userNameValue, setUserNameValue] = useState("");

  const navigate = useNavigate();

  const handleClickShowPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setValues(!values);
  };

  const avatarHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch("https://randomuser.me/api")
      .then((res) => res.json())
      .then((data) =>
        trackerContext.setAvatar(data.results[0].picture.thumbnail)
      );
    localStorage.setItem("avatar", JSON.stringify(trackerContext.avatar));
    navigate("/overview");
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Container component="main" maxWidth="xs" sx={{ textAlign: "center" }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, width: 300, height: 300 }}
            alt="Remy Sharp"
            src="./logo-text.png"
          />
          <Typography component="h1" variant="h5">
            SIGN IN
          </Typography>
          <Box
            component="form"
            onSubmit={avatarHandleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              sx={{ m: 1, width: 300, height: 30 }}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={userNameValue}
              onChange={(e) => setUserNameValue(e.target.value)}
            />
            <small
              style={{ display: "block", marginTop: 20, height: 5 }}
            ></small>
            <FormControl
              sx={{ m: 4, width: 300, height: 55 }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password *
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values ? "text" : "password"}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              SIGN IN
            </Button>
            <Grid item xs>
              {"Don't have an account? Sign Up"}
            </Grid>
            <Grid item>
              <NavLink to={"/signup"} style={{ color: "#6200ee" }}>
                {"Sign Up now it`s free"}
              </NavLink>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
