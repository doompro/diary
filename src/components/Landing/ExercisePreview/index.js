import React/*, { useState }*/ from "react";

import { makeStyles } from "@material-ui/core/styles";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

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
 */

const useStyles = makeStyles((theme) => ({
    exerciseRoot: {
        minHeight: 5,
        minWidth: "80%",
        padding: theme.spacing(2),

        margin: "5px",
    },

    editIcon: {
        marginRight: "10px",
        cursor: 'pointer',
    },

    deleteIcon: {
        cursor: 'pointer',
    }
}));

const ExercisePreview = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.exerciseRoot}>
            <Grid container direction="row" spacing={1} justify='space-between' >
                <Grid item>
                    {"Nuovo esercizio " + props.exercise.id}
                </Grid>
                <Grid item>
                    <CreateIcon onClick={() => props.onEdit()} className={classes.editIcon} />
                    <DeleteIcon onClick={() => props.onRemove(props.exercise.id)} className={classes.deleteIcon} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ExercisePreview;
