import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const SignUpPage = () => (
  <SignUpForm />
);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © CrossFit Fabriano'}
      {' '}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

const SignUpFormBase = (props) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);

  const classes = useStyles();

  const onSubmit = (event) => {
    props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        return props.firebase.user(authUser.user.uid).set({
          username,
          email,
        });
      })
      .then(() => {
        setUserName("");
        setEmail("");
        setPasswordOne("");
        setPasswordTwo("");

        props.history.push(ROUTES.LANDING);
      })
      .catch((error) => {
        setError(error);
      });

    event.preventDefault();
  };

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    username === "";

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrati
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <TextField
            autoComplete="fname"
            name="username"
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Username"
            autoFocus
            margin="normal"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            margin="normal"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="passwordOne"
            autoComplete="current-password"
            margin="normal"
            value={passwordOne}
            onChange={(event) => setPasswordOne(event.target.value)}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Conferma Password"
            type="password"
            id="passwordTwo"
            autoComplete="current-password"
            margin="normal"
            value={passwordTwo}
            onChange={(event) => setPasswordTwo(event.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isInvalid}
          >
            Conferma
          </Button>

          {error && <p>{error.message}</p>}

        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const SignUpLink = () => (
  <p>
    <Link to={ROUTES.SIGN_UP}>Non hai un account? Registrati</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
