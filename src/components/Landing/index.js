import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { DatePicker } from "@material-ui/pickers";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ExercisePreview from "./ExercisePreview";

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { create_UUID } from '../../utils/uuid';

/**
 * Exercise template:
 * 
 * db
 * -- userid
 * ------- date
 * -------------- ex
 * -------------- ex
 * -------------- ex
 * -- userid
 * ------- date
 * -------------- ex
 * -------------- ex
 * 
 * 
 * ex
 * ---- id: uuid
 * ---- type: [ metcon, strength, mobility ]
 * ---- title: [ nome esercizio ]
 * ---- description: [ descrizione ]
 * ---- sets: [ Array[ carico / time / reps, carico, carico ] ]
 * ---- resultType: [ time / amrap / weight / other / no result ( for quality ) ]
 */

const useStyles = makeStyles((theme) => ({
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
    setExlist(exlist.filter((ele, idx) => ele.id !== i));
  };

  const addExercise = () => {
    const newExercise = { id: create_UUID() };
    setExlist(exlist.concat(newExercise))
  };

  const exercises = exlist.map((ele, idx) => <ExercisePreview key={idx} exercise={ele} onRemove={removeExercise} onEdit={() => console.log("ele: ", ele)} />);

  return (
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
  );
};

export default Landing;
