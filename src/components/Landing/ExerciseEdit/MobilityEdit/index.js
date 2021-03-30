import React from "react";

//import { makeStyles } from "@material-ui/core/styles";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


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

const MobilityEdit = (props) => {
    //const classes = useStyles();

    return (
        <>
            <Grid item>
                { /* ---- title: nome esercizio  */}
                <TextField
                    id="mobility-title"
                    name="mobility-title"
                    label="Note"
                    onChange={(event) => props.exercise.title = event.target.value}
                    defaultValue={props.exercise.title}
                />
            </Grid>
            <Grid item>
                { /* ---- note: note generali  */}
                <TextField
                    id="mobility-note"
                    name="mobility-note"
                    label="Note"
                    onChange={(event) => props.exercise.note = event.target.value}
                    defaultValue={props.exercise.note}
                />
            </Grid>
        </>
    )
};

export default MobilityEdit;
