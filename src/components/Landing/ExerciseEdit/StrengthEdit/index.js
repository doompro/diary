import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

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
 * ---- exercise: [ nome esercizio / descrizione metcon ]
 * ---- sets: [ Array[ carico / time / reps, carico, carico ] ]
 * ---- resultType: [ time / amrap / weight / other /   \no result ( for quality ) ]
 * ---- note: [ note varie ]
 */

/*const useStyles = makeStyles((theme) => ({

}));*/

const StrengthEdit = (props) => {
    //const classes = useStyles();

    const [setsNumber, setSetsNumber] = useState(1);

    let sets = [];
    for (let i = 0; i < setsNumber; i++) {
        sets.push(<TextField
            id={"metcon-set-" + (i + 1)}
            name={"metcon-set-" + (i + 1)}
            label={"Serie " + (i + 1)}
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
                />
            </Grid>

            <Grid item>
                { /* ---- rx: [ prescrizione ]  */}
                <TextField
                    id="exercise-rx"
                    name="exercise-rx"
                    label="Modalità prescritta"
                />
            </Grid>

            <Grid item>
                { /* ---- resultType: [ time / amrap / weight / other /   \no result ( for quality ) ]  */}
                <InputLabel id="strength-type-label">Tipo Risultato</InputLabel>
                <Select
                    labelId="strength-type"
                    id="strength-type"
                    value={0}
                    onChange={() => { }}
                >
                    <MenuItem value={0}>Peso</MenuItem>
                    <MenuItem value={1}>Ripetizioni</MenuItem>
                    <MenuItem value={2}>Altro</MenuItem>
                    <MenuItem value={3}>No result ( for quality )</MenuItem>
                </Select>
            </Grid>

            <Grid item>
                { /* numero di serie fatte  */}
                <InputLabel id="strength-sets">Numero di serie eseguite</InputLabel>
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
                />
            </Grid>
        </>
    )
};

export default StrengthEdit;
