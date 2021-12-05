import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Autocomplete from '@material-ui/lab/Autocomplete';

import { StrenghtExercise } from '../../../../utils/autocomplete'

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
 * ---- rx: [ prescrizione ]
 * -------------- sets
 * -------------- reps
 * -------------- load
 * ---- title: [ nome esercizio / descrizione metcon ]
 * ---- sets: [ Array[ carico / time / reps, carico, carico ] ]
 * ---- resultType: [ time / amrap / weight / other /   \no result ( for quality ) ]
 * ---- note: [ note varie ]
 */

/*const useStyles = makeStyles((theme) => ({

}));*/

const useStyles = makeStyles((theme) => ({
    strenghtNote: {
        width: "100%",
    }
}));

const StrengthEdit = (props) => {
    const classes = useStyles();

    //const classes = useStyles();
    const [setsNumber, setSetsNumber] = useState((props.exercise.rx && parseInt(props.exercise.rx.sets)) || 1);
    const [execiseType, setExeciseType] = useState(props.exercise.resultType || "Peso");


    const handleTypeChange = (value) => {
        setExeciseType(value)
        props.exercise.resultType = value;
    };

    let sets = [];
    for (let i = 0; i < setsNumber; i++) {
        sets.push(<TextField
            key={i}
            id={"metcon-set-" + (i + 1)}
            name={"metcon-set-" + (i + 1)}
            label={"Serie " + (i + 1)}
            onChange={(event) => {
                if (!props.exercise.sets) props.exercise.sets = [];
                props.exercise.sets[i] = event.target.value;
            }}
            defaultValue={(props.exercise.sets && props.exercise.sets[i]) || ''}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />);
    }

    return (
        <>
            <Grid item>
                { /* ---- exercise: [ nome esercizio / descrizione metcon ]  */}
                <Autocomplete
                    id="exercise-name-autocomplete"
                    freeSolo
                    options={StrenghtExercise.map((option) => option.name)}

                    defaultValue={props.exercise.title}
                    onInputChange={(event, values) => props.exercise.title = values}

                    renderInput={(params) => (
                        <TextField
                            {...params}
                            id="exercise-name"
                            name="exercise-name"
                            label="Nome"
                        />
                    )}
                />


            </Grid>

            <Grid item>
                { /* ---- rx: [ prescrizione ]  */}
                <TextField
                    id="exercise-rx-sets"
                    name="exercise-rx-sets"
                    label="Serie"
                    onChange={(event) => {
                        if (!props.exercise.rx) props.exercise.rx = {};
                        props.exercise.rx.sets = event.target.value;
                        setSetsNumber(parseInt(event.target.value));
                    }}
                    defaultValue={(props.exercise.rx && props.exercise.rx.sets) || ""}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
                <TextField
                    id="exercise-rx-reps"
                    name="exercise-rx-reps"
                    label="Ripetizioni"
                    onChange={(event) => {
                        if (!props.exercise.rx) props.exercise.rx = {};
                        props.exercise.rx.reps = event.target.value
                    }}
                    defaultValue={(props.exercise.rx && props.exercise.rx.reps) || ""}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
                <TextField
                    id="exercise-rx-load"
                    name="exercise-rx-load"
                    label="Carico prescritto"
                    onChange={(event) => {
                        if (!props.exercise.rx) props.exercise.rx = {};
                        props.exercise.rx.load = event.target.value
                    }}
                    defaultValue={(props.exercise.rx && props.exercise.rx.load) || ""}
                />
            </Grid>

            <Grid item>
                { /* ---- resultType: [ time / amrap / weight / other /   \no result ( for quality ) ]  */}
                <InputLabel id="strength-type-label">Tipo Risultato</InputLabel>
                <Select
                    labelId="strength-type"
                    id="strength-type"
                    value={execiseType}
                    onChange={(event) => handleTypeChange(event.target.value)}
                >
                    <MenuItem value={"Peso"}>Peso</MenuItem>
                    <MenuItem value={"Ripetizioni"}>Ripetizioni</MenuItem>
                    <MenuItem value={"Altro"}>Altro</MenuItem>
                    <MenuItem value={"No"}>No result ( for quality )</MenuItem>
                </Select>
            </Grid>

            {/*!(props.exercise.rx && props.exercise.rx.sets) ?
                <Grid item>
                    <TextField
                        type="number"
                        id="strength-sets"
                        name="strength-sets"
                        label="Numero di serie"
                        onChange={(event) => setSetsNumber(event.target.value)}
                        defaultValue={setsNumber}
                    />
                </Grid>
                : null*/
            }

            <Grid item>
                { /* ---- sets: [ Array[ carico / time / reps, carico, carico ] ] */}
                {sets}
            </Grid>

            <Grid item>
                { /* ---- exercise: [ nome esercizio / descrizione metcon ]  */}
                <InputLabel id="strength-note-label">Note</InputLabel>
                <TextareaAutosize
                    id="strength-description"
                    name="strength-description"
                    label="Note"
                    onChange={(event) => props.exercise.note = event.target.value
                    }
                    defaultValue={props.exercise.note}
                    rowsMin={3}
                    className={classes.strenghtNote}
                />
            </Grid>
        </>
    )
};

export default StrengthEdit;
