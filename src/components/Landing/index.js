import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { DatePicker } from "@material-ui/pickers";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Exercise from "./Exercise";

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    minHeight: 5,
    minWidth: "100%",
    padding: theme.spacing(2),

    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  addicon: {
    marginRight: 5,
  },
  addelementgrid: {
    cursor: 'pointer',
  }
}));

const Landing = () => {
  const classes = useStyles();

  const [selectedDate, handleDateChange] = useState(new Date());
  const [exlist, setExlist] = useState([]);

  const removeExercise = (i) => {
    setExlist(exlist.filter((ele, idx) => ele.eleid !== i));
  };

  const addExercise = () => {
    setExlist(exlist.concat({ eleid: exlist.length }))
  };

  const exercises = exlist.map((ele, idx) => <Exercise key={idx} eleid={ele.eleid} onRemove={removeExercise} />);

  return (
    <div className={classes.root}>
      <Grid container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper} elevation={3}>
            <DatePicker
              variant="inline"
              label="Scegli la data"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Paper>
        </Grid>
        {exercises}
        <Grid item xs className={classes.addelementgrid} onClick={() => addExercise()}>
          <Paper className={classes.paper} elevation={3}>
            <AddCircleOutlineIcon className={classes.addicon} />{"AGGIUNGI ESERCIZIO"}
          </Paper>
        </Grid>
      </Grid>
    </div >
  );
};

export default Landing;
