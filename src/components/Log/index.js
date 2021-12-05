import React, { useState, useEffect } from "react";

import { AuthUserContext, withAuthorization, AuthCondition } from "../Session";

import { BenchmarkWorkouts, EnduranceWorkouts, StrenghtExercise } from "../../utils/autocomplete";
import { parseDateIdString } from "../../utils/parseDateId";

import Search from '@material-ui/icons/Search';

import InputLabel from '@material-ui/core/InputLabel';
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  /*paper: {
    minHeight: 5,
    minWidth: "100%",
    padding: theme.spacing(2),

    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },*/

  typeSelect: {
    width: "150px",
  },

  containerGrid: {
    textAlign: "center",
    padding: "15px"
  },
}));

const LogPage = (props) => {
  const authUid = props.authUid;
  const classes = useStyles();

  /* filtro tipologia: weightlifting|gymnastics|endurance|benchmark */
  const [exerciseType, setExerciseType] = useState(
    "weightlifting"
  );
  /* lista esercizi con relativi best in base al filtro selezionato */
  const [exerciseList, setExerciseList] = useState(
    []
  );

  function getFormExercisesSet(exerciseType) {
    let wlResults = StrenghtExercise.filter(ex => ex.category === "wl").map(exe => ({ name: exe.name, best: null, date: null }));
    let gymResults = StrenghtExercise.filter(ex => ex.category === "gym").map(exe => ({ name: exe.name, best: null, date: null }));
    let enduraceResults = EnduranceWorkouts.map(ex => ({ name: ex.name, best: null, date: null }));
    let benchmarkResults = BenchmarkWorkouts.map(ex => ({ name: ex.name, best: null, date: null }));

    switch (exerciseType) {
      case "weightlifting":
        return wlResults;
      case "gymnastics":
        return gymResults;
      case "endurance":
        return enduraceResults;
      case "benchmark":
        return benchmarkResults;
      default:
        return [];
    }
  }

  useEffect(() => {
    let newExerciseList = getFormExercisesSet(exerciseType);
    const exerciseSetNames = newExerciseList.map(exe => exe.name)

    props.firebase.userDirectory(authUid).once('value', function (snapshot) {
      snapshot.forEach(dateSnapshot => {
        const exercises = dateSnapshot.val();

        exercises.forEach(dailyExercise => {
          for (var i = 0; i < exerciseSetNames.length; i++) {
            if (dailyExercise.title.trim() === exerciseSetNames[i]) {

              if (dailyExercise.sets && dailyExercise.sets.map) {

                const dailyMaxWeight = Math.max(...dailyExercise.sets.map(set => parseInt(set)));
                const foundExerciseName = exerciseSetNames[i];

                if ((parseInt(newExerciseList.find(ele => ele.name.trim() === foundExerciseName.trim()).best) || 0) < dailyMaxWeight) {
                  const parsedDate = parseDateIdString(dateSnapshot.key);
                  const dateJs = new Date(parsedDate.year, parsedDate.month - 1, parsedDate.day)

                  newExerciseList[newExerciseList.findIndex(ele => ele.name.trim() === foundExerciseName.trim())].best = dailyMaxWeight;

                  var options = parsedDate.day !== null ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } : { year: 'numeric', month: 'long' }
                  newExerciseList[newExerciseList.findIndex(ele => ele.name.trim() === foundExerciseName.trim())].date = dateJs.toLocaleDateString("it-IT", options);
                }

              }
            }
          }
        });
      });

      setExerciseList(newExerciseList);
    });

  }, [authUid, props.firebase, exerciseType, setExerciseList]);


  return <AuthUserContext.Consumer>
    {(authUser) => (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        item xs={5}
        className={classes.containerGrid}
      >
        <Grid item>
          <h2>Risultati</h2>
        </Grid>

        <Grid item>
          <Grid container direction="column" spacing={1} justify="space-between">

            <Grid item>
              <InputLabel id="type-select-label">Cerca per Tipologia degli esercizi:</InputLabel>
              <Select
                labelId="type-select-label"
                id="type-select"
                label="Tipologia esercizi"
                value={exerciseType}
                onChange={(event) => setExerciseType(event.target.value)}
                className={classes.typeSelect}
              >
                <MenuItem value={"weightlifting"}>Weightlifting</MenuItem>
                <MenuItem value={"gymnastics"}>Gymnastics</MenuItem>
                <MenuItem value={"endurance"}>Endurance</MenuItem>
                <MenuItem value={"benchmark"}>Benchmark</MenuItem>
              </Select>
            </Grid>

            <TableContainer component={Paper}>
              <Table aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome esercizio</TableCell>
                    <TableCell>Record Personale</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Dettaglio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exerciseList.filter(exercise => exercise.best !== null).map((exercise) => (
                    <TableRow key={exercise.name}>
                      <TableCell component="th" scope="row">
                        {exercise.name}
                      </TableCell>
                      <TableCell>{exercise.best}</TableCell>
                      <TableCell>{exercise.date}</TableCell>
                      <TableCell><Search /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    )}
  </AuthUserContext.Consumer>
};

export default withAuthorization(AuthCondition)(LogPage);
