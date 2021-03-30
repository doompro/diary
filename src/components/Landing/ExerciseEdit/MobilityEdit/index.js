import React from "react";

import { makeStyles } from "@material-ui/core/styles";

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
                { /* ---- note: note generali  */}
                <TextField
                    id="mobility-note"
                    name="mobility-note"
                    label="Note"
                />
            </Grid>
        </>
    )
};

export default MobilityEdit;
