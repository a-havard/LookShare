// Template used as a base from https://material-ui.com/getting-started/templates/

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import backgroundImage from '../assets/eyeshadow.jpg';
import Accounts from '../routes/accounts';
import { useHistory } from 'react-router-dom';

const fontTheme = createMuiTheme({
  typography: {
    fontFamily: 'pattaya'
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(` + backgroundImage + `)`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const history = useHistory();
  const classes = useStyles();
  const [values, setValues] = useState({
    username: false,
    password: false
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const signin = (accountData) => {
    const hasFalse = Object.values(accountData).includes(false)
    if (!hasFalse) {
      Accounts.getAccount(accountData)
        .then((res)=>{
          localStorage.loggedInId=res.data.data;
            window.location.href = window.location.hostname+res.data.data;
        })
        .catch(()=>{console.log("Wrong username/password")});
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <ThemeProvider theme={fontTheme}>
            <Typography component="h1" variant="h5">LookShare</Typography>
          </ThemeProvider>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => signin(values)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => history.push('/signup')}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default SignIn