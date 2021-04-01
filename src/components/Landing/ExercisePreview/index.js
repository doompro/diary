import React /*, { useState }*/ from "react";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

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
 * ---- type: [ metcon, strength, mobility ]
 * ---- exercise: [ nome esercizio / descrizione metcon ]
 * ---- sets: [ Array[ carico / time / reps, carico, carico ] ]
 * ---- resultType: [ time / amrap / weight / other /   \no result ( for quality ) ]
 */

const useStyles = makeStyles((theme) => ({
  exerciseRoot: {
    minHeight: 5,
    minWidth: "80%",
    maxWidth: "80%",
    padding: theme.spacing(2),

    margin: "5px",
  },

  editIcon: {
    marginRight: "10px",
    cursor: "pointer",
  },

  deleteIcon: {
    cursor: "pointer",
  },

  exerciseTitle: {
    maxWidth: "60%",
  }
}));

const ExercisePreview = (props) => {
  const classes = useStyles();

  let exerciseRx = null;
  if (props.exercise.rx) {
    if (props.exercise.rx.sets && props.exercise.rx.reps) {
      exerciseRx =
        " : " +
        (props.exercise.rx.sets || "") +
        (props.exercise.rx.reps ? " sets x " + props.exercise.rx.reps : "");
    }
    if (props.exercise.rx.load) {
      exerciseRx = (exerciseRx || "") + " @ " + props.exercise.rx.load;
    }
  }

  return (
    <Paper className={classes.exerciseRoot} onClick={() => props.onEdit(props.exercise)}>
      <Grid container direction="row" spacing={1} justify="space-between">
        <Grid item className={classes.exerciseTitle}>
          {(props.exercise.title && props.exercise.title !== "" ? props.exercise.title : "Nuovo") + (exerciseRx ? exerciseRx : "")}
        </Grid>
        <Grid item>
          <CreateIcon
            onClick={() => props.onEdit(props.exercise)}
            className={classes.editIcon}
          />
          <DeleteIcon
            onClick={(event) => {
              event.stopPropagation();
              props.onRemove(props.exercise.id);
            }}
            className={classes.deleteIcon}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ExercisePreview;
