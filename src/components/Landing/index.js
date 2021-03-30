import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { DatePicker } from "@material-ui/pickers";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import ExercisePreview from "./ExercisePreview";
import ExerciseEdit from "./ExerciseEdit";
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
 * ---- rx: [ prescrizione ]
 * -------------- sets
 * -------------- reps
 * -------------- load
 * ---- type: [ metcon, strength, mobility ]
 * ---- title: [ nome esercizio ]
 * ---- description: [ descrizione ]
 * ---- sets: [ Array[ carico / time / reps, carico, carico ] ]
 * ---- resultType: [ time / amrap / weight / other / no result ( for quality ) ]
 */

/*const itemTemplate = {
  id: "", //uuid
  title: "", //[ nome esercizio ]
  description: "", //[ descrizione wod]
  type: "", //[ metcon, strength, mobility ]
  rx: { sets: "", reps: "", load: "" }, //[ prescrizione ]
  sets: [], //[ Array[ carico / time / reps, carico, carico ] ]
  resultType: "", //[ Peso, Ripetizioni, Altro, No ]
  score: "", //[ score ]
}*/

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
  },


  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const Landing = () => {
  const classes = useStyles();

  const [selectedDate, handleDateChange] = useState(new Date());
  const [exlist, setExlist] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState({});

  const removeExercise = (i) => {
    setExlist(exlist.filter((ele, idx) => ele.id !== i));
  };

  const addExercise = () => {
    const newExercise = {
      id: create_UUID(),
      title: "Nuovo",
      description: "",
      type: "",
      rx: { sets: "", reps: "", load: "" },
      sets: [],
      resultType: "",
      score: ""
    };
    setExlist(exlist.concat(newExercise))
  };

  const handleOpen = (exercise) => {
    setSelectedExercise(exercise);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const exercises = exlist.map((ele, idx) => <ExercisePreview key={idx} exercise={ele} onRemove={removeExercise} onEdit={handleOpen} />);

  return (
    <>
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

      <Modal
        aria-labelledby="Dettagli"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Paper className={classes.paper}>
            <ExerciseEdit exercise={selectedExercise} />
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default Landing;
