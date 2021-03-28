import React, { useState } from "react";
import { useHistory } from "react-router";
import { withFirebase } from "../Firebase";

import { AuthUserContext } from "../Session";
import * as ROUTES from "../../constants/routes";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
//import MenuIcon from "@material-ui/icons/Menu";
import CalendarToday from "@material-ui/icons/CalendarToday";
import LockOpen from "@material-ui/icons/LockOpen";
import ExitToApp from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Build from "@material-ui/icons/Build";
//import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuLabel: {
    paddingLeft: "10px",
  },
  menuSeparator: {
    borderTop: "1px solid black",
  },
}));

const Navigation = (firebase) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignIn = () => {
    history.push(ROUTES.SIGN_IN);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              history.push(ROUTES.LANDING);
            }}
          >
            <CalendarToday />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            CrossFit Fabriano
          </Typography>
          <AuthUserContext.Consumer>
            {(authUser) =>
              authUser ? (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        history.push(ROUTES.ACCOUNT);
                        handleClose();
                      }}
                    >
                      <AccountCircle />
                      <div className={classes.menuLabel}>Account</div>
                    </MenuItem>
                    {authUser.email === "daniele.senigagliesi@gmail.com" && (
                      <MenuItem onClick={() => history.push(ROUTES.ADMIN)}>
                        <Build />
                        <div className={classes.menuLabel}>Admin</div>
                      </MenuItem>
                    )}
                    <MenuItem
                      className={classes.menuSeparator}
                      onClick={firebase.firebase.doSignOut}
                    >
                      <ExitToApp />
                      <div className={classes.menuLabel}>Log out</div>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <IconButton
                  aria-label="Log in"
                  aria-controls="menu-appbar"
                  onClick={handleSignIn}
                  color="inherit"
                >
                  <LockOpen />
                </IconButton>
              )
            }
          </AuthUserContext.Consumer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withFirebase(Navigation);
