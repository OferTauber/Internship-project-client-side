import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './login.css';
import EmailValidator from 'email-validator';
import { getAuthToken, getHellow } from '../../utils/axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setSpinner(true);
    try {
      event.preventDefault();
      if (!EmailValidator.validate(email)) return;

      await getHellow();
      const token = await getAuthToken(email, password);
      Cookies.set('dockteck_token', token, { expires: 2 });
      navigate('/ports');
    } catch (err: any) {
      console.warn(err);
      if (err.message === 'Request failed with status code 404') {
        setErrorMessage('Incorrect username or password');
      } else {
        setErrorMessage('Unable to connect - please try again later');
        console.error(err.message);
      }
    }
    setSpinner(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="login-hero">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              backgroundColor: '#f5f5f5',
              padding: '30px 50px',
              borderRadius: '30px',
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: 0.8,
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            {/* <CircularProgress /> */}
            <div className="logo"></div>

            <Typography component="h1" variant="h5">
              Sign In
            </Typography>

            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                // autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value.toLowerCase());
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                // autoComplete="current-password"
              />
              <div className="space-holder">
                <Typography color="red">{errorMessage}</Typography>
              </div>

              <LoadingButton
                loading={spinner}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </LoadingButton>

              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </form>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
