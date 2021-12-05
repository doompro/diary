import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import * as ROUTES from "../../constants/routes";

import { AuthUserContext, withAuthorization, AuthCondition } from "../Session";

import { parseDateIdString } from "../../utils/parseDateId";

import Pageview from '@material-ui/icons/Pageview';
import ArrowBack from '@material-ui/icons/ArrowBack';

import Grid from "@material-ui/core/Grid";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  containerGrid: {
    textAlign: "center",
    padding: "15px"
  },

  searchIcon: {
    cursor: "pointer"
  },

  backIcon: {
    marginRight: "10px",
  },


  topTitle: {
    display: "flex",
    alignItems: "center"
  }

}));

const ExerciseLogPage = (props) => {
  const authUid = props.authUid;
  const classes = useStyles();
  const history = useHistory();

  const exerciseName = props.location.state.exerciseName;
  const exerciseType = props.location.state.exerciseType;

  /* lista giornate con relativi best in quel determinato esercizio */
  const [dayList, setDayList] = useState(
    []
  );

  useEffect(() => {
    let newExerciseDaysList = [];

    props.firebase.userDirectory(authUid).once('value', function (snapshot) {

      snapshot.forEach(dateSnapshot => {
        const exercises = dateSnapshot.val();

        exercises.forEach(dailyExercise => {

          if (dailyExercise.title.trim() === exerciseName) {

            const parsedDate = parseDateIdString(dateSnapshot.key);
            const dateJs = new Date(parsedDate.year, parsedDate.month - 1, parsedDate.day);
            var options = {};

            if (exerciseType === "weightlifting" || exerciseType === "gymnastics") {
              if (dailyExercise.sets && dailyExercise.sets.map) {
                const dailyMaxWeight = Math.max(...dailyExercise.sets.map(set => parseInt(set)));

                // controllo options perchè con id vecchi non ho il giorno
                options = parsedDate.day !== null ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } : { year: 'numeric', month: 'long' }

                newExerciseDaysList.push({ best: dailyMaxWeight, date: dateJs.toLocaleDateString("it-IT", options), dateKey: dateSnapshot.key });
              }
            }
            else if (exerciseType === "endurance" || exerciseType === "benchmark") {
              // FIXME: confronta benchmark per resultype, al momento metto l'ultimo

              // controllo options perchè con id vecchi non ho il giorno
              options = parsedDate.day !== null ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } : { year: 'numeric', month: 'long' }

              newExerciseDaysList.push({ best: dailyExercise.score, date: dateJs.toLocaleDateString("it-IT", options), dateKey: dateSnapshot.key });
            }
          }

        });
      });

      setDayList(newExerciseDaysList);
    });

  }, [authUid, props.firebase, exerciseType, exerciseName, setDayList]);


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
          <div className={classes.topTitle}>
            <Paper className={classes.backIcon}>
              <ArrowBack
                onClick={() => {
                  history.goBack();
                }}
                className={classes.searchIcon} />
            </Paper>
            <h2>Risultati per {exerciseName}</h2>
          </div>
        </Grid>

        <Grid item>
          <Grid container direction="column" spacing={1} justify="space-between">
            <TableContainer component={Paper}>
              <Table aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Record giornaliero</TableCell>
                    <TableCell align="center">Data</TableCell>
                    <TableCell align="center">Vedi allenamento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dayList.map((day) => (
                    <TableRow key={day.dateKey}>
                      <TableCell align="center">{day.best}</TableCell>
                      <TableCell align="center">{day.date}</TableCell>
                      <TableCell align="center">
                        <Pageview
                          onClick={() => {
                            history.push(

                              {
                                pathname: ROUTES.LANDING,
                                state: { dateId: day.dateKey }
                              }

                            );
                          }}
                          className={classes.searchIcon} />
                      </TableCell>
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

export default withAuthorization(AuthCondition)(ExerciseLogPage);
