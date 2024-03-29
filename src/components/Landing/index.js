import React, { useState, useEffect } from "react";

import { withAuthorization, AuthCondition } from "../Session";

import { withFirebase } from "../Firebase";

import { makeStyles } from "@material-ui/core/styles";
import { DatePicker } from "@material-ui/pickers";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

//import SaveIcon from "@material-ui/icons/Save";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import ExercisePreview from "./ExercisePreview";
import ExerciseEdit from "./ExerciseEdit";
import { create_UUID } from "../../utils/uuid";
import { parseDateIdString } from "../../utils/parseDateId";

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

    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  calendarAndSave: {
    minWidth: "80%",
    maxWidth: "100%",
    minHeight: 5,

    display: "flex",
    justifyContent: "space-between",

    padding: theme.spacing(2),
  },

  addicon: {
    marginRight: 5,
    color: "#8bc34a"
  },

  addelementgrid: {
    cursor: "pointer",
    marginTop: "10px",
  },

  modal: {
    //display: "flex",
    alignItems: "center",
    justifyContent: "center",


    //position: 'absolute',
    //top: '10%',
    //left: '10%',
    overflow: 'scroll',
    height: '100%',
    width: '100%',
    display: 'block'
  },

  saveAndCalendarContainer: {
    display: "flex",
  },

  saveIcon: {
    fontSize: "50px",
    marginLeft: "10px",
  },

  arrowIcon: {
    fontSize: "40px",
  },

  calendar: {
    width: "50%",
  },
}));

const Landing = (props) => {
  const classes = useStyles();

  const presetDateKey = props.location.state && props.location.state.dateId ? parseDateIdString(props.location.state.dateId) : null;
  const [selectedDate, handleDateChange] = useState(presetDateKey ? new Date(presetDateKey.year, presetDateKey.month - 1, presetDateKey.day) : new Date());

  const [exlist, setExlist] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState({});
  const [eliminatingId, setEliminatingId] = useState(null);
  //const [enableSave, setEnableSave] = useState(false);

  const authUid = props.authUid;


  useEffect(() => {
    const dateStringLegacy =
      "" +
      selectedDate.getFullYear() +
      selectedDate.getMonth() +
      selectedDate.getDate();

    const dateString =
      "" +
      selectedDate.getFullYear() +
      ("0" + (selectedDate.getMonth() + 1)).slice(-2) +
      ("0" + selectedDate.getDate()).slice(-2)

    /*props.firebase.userExercise(authUid, dateString).on("value", (snapshot) => {
      const exerciseList = snapshot.val();
      //console.log("READING EXERCISE LIST: ", exerciseList);
      setExlist(exerciseList || []);
    });*/

    props.firebase.userDirectory(authUid).on("value", (snapshot) => {
      const exerciseList = snapshot.val();
      //console.log("READING EXERCISE LIST: ", exerciseList);
      setExlist(exerciseList[dateString] || exerciseList[dateStringLegacy] || []);
    });
  }, [selectedDate, authUid, props.firebase]);

  const handleCloseConfirm = () => {
    setConfirmModalOpen(false);
  }

  const openConfirmModal = (i) => {
    setEliminatingId(i);
    setConfirmModalOpen(true);
  }

  const handleConfirmDelete = () => {
    removeExercise(eliminatingId);
  }

  const removeExercise = (i) => {
    handleSaveDay(exlist.filter((ele, idx) => ele.id !== i));

    setExlist(exlist.filter((ele, idx) => ele.id !== i));
    //setEnableSave(true);
    handleCloseConfirm();
  };

  const addExercise = () => {
    const newExercise = {
      id: create_UUID(),
      title: "",
      description: "",
      type: "",
      rx: { sets: "", reps: "", load: "" },
      sets: [],
      resultType: "",
      score: "",
    };

    const newExlist = exlist.concat(newExercise);

    handleSaveDay(newExlist);
    setExlist(newExlist);

    //setEnableSave(true);
  };

  const handleOpen = (exercise) => {
    setSelectedExercise(exercise);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    handleSaveDay();
  };

  const handleSaveDay = (newExercises) => {
    const exToSave = newExercises ? newExercises : exlist;

    /*const dateString =
      "" +
      selectedDate.getFullYear() +
      selectedDate.getMonth() +
      selectedDate.getDate();*/

    const dateString =
      "" +
      selectedDate.getFullYear() +
      ("0" + (selectedDate.getMonth() + 1)).slice(-2) +
      ("0" + selectedDate.getDate()).slice(-2)

    props.firebase.userExercise(authUid, dateString).set(exToSave);
    //setEnableSave(false);
  };

  const exercises = exlist.map((ele, idx) => (
    <ExercisePreview
      key={idx}
      exercise={ele}
      //onRemove={removeExercise}
      onRemove={openConfirmModal}
      onEdit={handleOpen}
    />
  ));

  const handleDayForward = () => {
    let newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1)
    handleDateChange(newDate);
  };

  const handleDayBackward = () => {
    let newDateBack = new Date(selectedDate);
    newDateBack.setDate(selectedDate.getDate() - 1)
    handleDateChange(newDateBack);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        <Grid item xs>
          <Paper className={classes.calendarAndSave} elevation={3}>
            <ArrowBackIosIcon className={classes.arrowIcon} onClick={handleDayBackward} />
            <DatePicker
              variant="inline"
              label="Scegli la data"
              value={selectedDate}
              onChange={handleDateChange}
              autoOk={true}
              format="EEE dd MMMM"
              className={classes.calendar}
            />
            {/*<SaveIcon color={enableSave ? "inherit" : "disabled"} className={classes.saveIcon} onClick={handleSaveDay} />*/}
            <ArrowForwardIosIcon className={classes.arrowIcon} onClick={handleDayForward} />
          </Paper>
        </Grid>

        {exercises}

        <Grid
          item
          xs
          className={classes.addelementgrid}
          onClick={() => addExercise()}
        >
          <Paper className={classes.calendarAndSave} elevation={3}>
            <AddCircleOutlineIcon className={classes.addicon} />
            {"AGGIUNGI ESERCIZIO"}
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
        <Fade in={modalOpen} disableStrictModeCompat={false}
          children={<ExerciseEdit
            exercise={selectedExercise}
            closePopup={handleClose}
          />}>

        </Fade>
      </Modal>

      <Dialog
        open={confirmModalOpen}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Sei sicuro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sei sicuro di voler eliminare l'esericizio?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withFirebase(withAuthorization(AuthCondition)(Landing));
