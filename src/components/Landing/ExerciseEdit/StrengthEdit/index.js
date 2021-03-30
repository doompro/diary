import React, { useState } from "react";

//import { makeStyles } from "@material-ui/core/styles";

import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

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

const StrengthEdit = (props) => {
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
        />);
    }

    return (
        <>
            <Grid item>
                { /* ---- exercise: [ nome esercizio / descrizione metcon ]  */}
                <TextField
                    id="exercise-name"
                    name="exercise-name"
                    label="Nome"
                    onChange={(event) => props.exercise.title = event.target.value}
                    defaultValue={props.exercise.title}
                />
            </Grid>

            <Grid item>
                { /* ---- rx: [ prescrizione ]  */}
                <TextField
                    id="exercise-rx-sets"
                    name="exercise-rx-sets"
                    label="Serie prescritte"
                    onChange={(event) => {
                        if (!props.exercise.rx) props.exercise.rx = {};
                        props.exercise.rx.sets = event.target.value;
                        setSetsNumber(parseInt(event.target.value));
                    }}
                    defaultValue={(props.exercise.rx && props.exercise.rx.sets) || ""}
                />
                <TextField
                    id="exercise-rx-reps"
                    name="exercise-rx-reps"
                    label="Reps prescritte"
                    onChange={(event) => {
                        if (!props.exercise.rx) props.exercise.rx = {};
                        props.exercise.rx.reps = event.target.value
                    }}
                    defaultValue={(props.exercise.rx && props.exercise.rx.reps) || ""}
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

            {!(props.exercise.rx && props.exercise.rx.sets) ?
                <Grid item>
                    { /* numero di serie fatte  */}
                    <InputLabel id="strength-sets">Numero di serie</InputLabel>
                    <Select
                        labelId="strength-sets"
                        id="strength-sets"
                        value={setsNumber}
                        onChange={(event) => setSetsNumber(event.target.value)}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={13}>13</MenuItem>
                        <MenuItem value={14}>14</MenuItem>
                        <MenuItem value={14}>15</MenuItem>
                    </Select>
                </Grid>
                : null
            }

            <Grid item>
                { /* ---- sets: [ Array[ carico / time / reps, carico, carico ] ] */}
                {sets}
            </Grid>

            <Grid item>
                { /* ---- exercise: [ nome esercizio / descrizione metcon ]  */}
                <TextField
                    id="metcon-note"
                    name="metcon-note"
                    label="Note"
                    onChange={(event) => props.exercise.note = event.target.value}
                    defaultValue={props.exercise.note}
                />
            </Grid>
        </>
    )
};

export default StrengthEdit;
