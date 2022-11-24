import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  ThemeOptions,
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

const SignUp: React.FC<Props> = (props) => {
  const trackerContext = useContext(CoinTrackerContext);
  const navigate = useNavigate();

  const [values, setValues] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleClickShowPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setValues(!values);
  };

  let validEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  let caracterSpecial = /[!@#$%^&*()]/;

  const onSubmitSignUP = (
    event: React.FormEvent<HTMLFormElement>,
    password: string,
    email: string
  ) => {
    event.preventDefault();
    if (validEmail.test(email)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
      return;
    }

    if (password.length <= 8 || password.length >= 32 || caracterSpecial.test(password) === false ) {
      setIsValidPassword(true);
      return;
    } else {
      setIsValidPassword(false);
    }

    fetch("https://randomuser.me/api")
      .then((res) => res.json())
      .then((data) =>
        trackerContext.setAvatar(data.results[0].picture.thumbnail)
      );
    localStorage.setItem("avatar", JSON.stringify(trackerContext.avatar));
    navigate("/wizard/wizardone");
  };

  const onValidationResetMail = () => {
    setIsValidEmail(false);
  };
  const onValidationResetPassword = () => {
    setIsValidPassword(false);
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
            SIGN UP
          </Typography>
          <Box
            component="form"
            onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
              onSubmitSignUP(event, passwordValue, emailValue)
            }
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              sx={{ m: 1, width: 300, height: 30 }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              // autoFocus
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              onFocus={onValidationResetMail}
            />
            <small
              style={{
                color: "red",
                display: "block",
                marginTop: 20,
                height: 5,
              }}
            >
              {isValidEmail && `Please enter a valid email adress.`}
            </small>
            <FormControl
              sx={{ m: 4, width: 300, height: 55 }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password *
              </InputLabel>
              <OutlinedInput
                onFocus={onValidationResetPassword}
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
              {isValidPassword && (
                <small style={{ color: "red", display: "block" }}>
                  Password must be at least 8 characters and it must contain at
                  least one special character
                </small>
              )}
            </FormControl>

            <FormControl>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
              >
                SIGN UP
              </Button>
            </FormControl>
            <Grid item xs>
              {"Already have account?"}
            </Grid>
            <Grid item>
              <NavLink to={"/"} style={{ color: "#6200ee" }}>
                {"Sign In please."}
              </NavLink>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
