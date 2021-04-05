import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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
 * ---- note: [ note varie ]
 */

/*const useStyles = makeStyles((theme) => ({
}));*/

const useStyles = makeStyles((theme) => ({
  conditioningDescription: {
    width: "100%",
  }
}));

const ConditioningEdit = (props) => {
  const classes = useStyles();

  const [execiseType, setExeciseType] = useState(
    props.exercise.resultType || "Tempo"
  );

  const [setsNumber, setSetsNumber] = useState((props.exercise && parseInt(props.exercise.sets)) || 1);

  const handleTypeChange = (value) => {
    setExeciseType(value);
    props.exercise.resultType = value;
  };

  let sets = [];
  console.log("parseInt(setsNumber): ", parseInt(setsNumber))
  for (let i = 0; i < parseInt(setsNumber); i++) {
    sets.push(<TextField
      key={i}
      id={"metcon-set-" + (i + 1)}
      name={"metcon-set-" + (i + 1)}
      label={"Intervallo " + (i + 1)}
      onChange={(event) => {
        if (!props.exercise.sets) props.exercise.sets = [];
        props.exercise.sets[i] = event.target.value;
      }}
      defaultValue={(props.exercise.sets && props.exercise.sets[i]) || ''}
    />);
  }

  let scoreDiv = null;

  switch (execiseType) {
    case "No":
      scoreDiv = null;
      break;

    case "Intervalli":
      scoreDiv = <> <Grid item>
        { /* ---- sets: [ Array[ carico / time / reps, carico, carico ] ] */}
        <TextField
          id="metcon-sets"
          name="metcon-sets"
          label="Numero totale di Intervalli"
          onChange={(event) => {
            setSetsNumber(event.target.value);
          }}
          defaultValue={props.exercise.sets}
        />
      </Grid>
        {sets}
      </>;
      break;

    default:
      scoreDiv = <Grid item>
        {/* ---- score: [ score ]  */}
        <TextField
          id="metcon-score"
          name="metcon-score"
          label="Score"
          onChange={(event) => (props.exercise.score = event.target.value)}
          defaultValue={props.exercise.score}
        />
      </Grid>;
  }

  return (
    <>
      <Grid item>
        {/* ---- title: [ nome esercizio / descrizione metcon ]  */}
        <TextField
          id="metcon-title"
          name="metcon-title"
          label="Nome"
          onChange={(event) => (props.exercise.title = event.target.value)}
          defaultValue={props.exercise.title}
        />
      </Grid>

      <Grid item>
        {/* ---- description: [ nome esercizio / descrizione metcon ]  */}
        <TextareaAutosize
          id="metcon-description"
          name="metcon-description"
          label="Description"
          onChange={(event) =>
            (props.exercise.description = event.target.value)
          }
          defaultValue={props.exercise.description}
          rowsMin={5}
          className={classes.conditioningDescription}
        />
      </Grid>

      <Grid item>
        {/* ---- resultType: [ time / amrap / weight / other /   \no result ( for quality ) ]  */}
        <InputLabel id="metcon-type-label">Tipo Risultato</InputLabel>
        <Select
          labelId="metcon-type"
          id="metcon-type"
          value={execiseType}
          onChange={(event) => handleTypeChange(event.target.value)}
        >
          <MenuItem value={"Tempo"}>Tempo</MenuItem>
          <MenuItem value={"Ripetizioni"}>Ripetizioni</MenuItem>
          <MenuItem value={"Peso"}>Peso</MenuItem>
          <MenuItem value={"Intervalli"}>Intervalli</MenuItem>
          <MenuItem value={"Altro"}>Altro</MenuItem>
          <MenuItem value={"No"}>No result ( for quality )</MenuItem>
        </Select>
      </Grid>

      {scoreDiv}

      <Grid item>
        {/* ---- note: [ note ]  */}
        <TextField
          id="metcon-note"
          name="metcon-note"
          label="Note"
          onChange={(event) => (props.exercise.note = event.target.value)}
          defaultValue={props.exercise.note}
        />
      </Grid>
    </>
  );
};

export default ConditioningEdit;
