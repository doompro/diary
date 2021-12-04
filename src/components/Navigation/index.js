import React from "react";
import { useHistory } from "react-router";
import { withFirebase } from "../Firebase";

import { AuthUserContext } from "../Session";
import * as ROUTES from "../../constants/routes";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LockOpen from "@material-ui/icons/LockOpen";
import ExitToApp from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Assignment from "@material-ui/icons/Assignment"
import Build from "@material-ui/icons/Build";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import mainLogo from './mini_logo.png';

import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const headerTextColor = '#76ff03';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: headerTextColor,
    textAlign: "center",
  },
  menuLabel: {
    paddingLeft: "10px",
  },
  menuSeparator: {
    borderTop: "1px solid black",
  },
  coloredText: {
    color: headerTextColor,
  },
  mainLogo: {
    height: "32px",
  }
}));

const Navigation = (firebase) => {
  const classes = useStyles();
  const history = useHistory();

  const handleSignIn = () => {
    history.push(ROUTES.SIGN_IN);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <AuthUserContext.Consumer>
            {(authUser) =>
              <>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  aria-label="menu"
                  onClick={() => {
                    authUser ? history.push(ROUTES.LANDING) : history.push(ROUTES.HOME);
                  }}
                  color="inherit"
                >
                  <img alt="logo" src={mainLogo} className={classes.mainLogo} />
                </IconButton>

                <Typography variant="h6" className={classes.title}>
                  WOD Journal
                </Typography>

                {authUser ? (
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <>
                        <IconButton
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          {...bindTrigger(popupState)}
                          color="inherit"
                        >
                          <AccountCircle />
                        </IconButton>
                        <Menu
                          {...bindMenu(popupState)}
                        >
                          <MenuItem
                            onClick={() => {
                              history.push(ROUTES.ACCOUNT);
                              popupState.close();
                            }}
                          >
                            <AccountCircle />
                            <div className={classes.menuLabel}>Account</div>
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              history.push(ROUTES.LOG);
                              popupState.close();
                            }}
                          >
                            <Assignment />
                            <div className={classes.menuLabel}>Risultati</div>
                          </MenuItem>
                          {authUser.email === "daniele.senigagliesi@gmail.com" && (
                            <MenuItem onClick={() => { history.push(ROUTES.ADMIN); popupState.close(); }}>
                              <Build />
                              <div className={classes.menuLabel}>Admin</div>
                            </MenuItem>
                          )}
                          <MenuItem
                            className={classes.menuSeparator}
                            onClick={() => { firebase.firebase.doSignOut().then(() => { history.push(ROUTES.HOME); popupState.close(); }) }}
                          >
                            <ExitToApp />
                            <div className={classes.menuLabel}>Log out</div>
                          </MenuItem>
                        </Menu>
                      </>
                    )}
                  </PopupState>
                ) : (
                  <IconButton
                    aria-label="Log in"
                    aria-controls="menu-appbar"
                    onClick={handleSignIn}
                    color="inherit"
                  >
                    <LockOpen />
                  </IconButton>
                )}
              </>
            }
          </AuthUserContext.Consumer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withFirebase(Navigation);
