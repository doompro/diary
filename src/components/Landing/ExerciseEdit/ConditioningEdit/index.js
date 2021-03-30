import React/*, { useState }*/ from "react";

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
 * ---- exercise: [ nome esercizio / descrizione metcon ]
 * ---- sets: [ Array[ carico / time / reps, carico, carico ] ]
 * ---- resultType: [ time / amrap / weight / other /   \no result ( for quality ) ]
 * ---- note: [ note varie ]
 */

/*const useStyles = makeStyles((theme) => ({
}));*/

const ConditioningEdit = (props) => {
    //const classes = useStyles();

    return (
        <>
            <Grid item>
                { /* ---- exercise: [ nome esercizio / descrizione metcon ]  */}
                <TextField
                    id="metcon-name"
                    name="metcon-name"
                    label="Nome"
                />
            </Grid>

            <Grid item>
                { /* ---- resultType: [ time / amrap / weight / other /   \no result ( for quality ) ]  */}
                <InputLabel id="metcon-type-label">Tipo Risultato</InputLabel>
                <Select
                    labelId="metcon-type"
                    id="metcon-type"
                    value={0}
                    onChange={() => { }}
                >
                    <MenuItem value={0}>For time</MenuItem>
                    <MenuItem value={1}>Amrap</MenuItem>
                    <MenuItem value={2}>Weight</MenuItem>
                    <MenuItem value={2}>Other</MenuItem>
                    <MenuItem value={2}>No result ( for quality )</MenuItem>
                </Select>
            </Grid>

            <Grid item>
                { /* ---- exercise: [ nome esercizio / descrizione metcon ]  */}
                <TextField
                    id="metcon-result"
                    name="metcon-result"
                    label="Risultato"
                />
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

export default ConditioningEdit;
