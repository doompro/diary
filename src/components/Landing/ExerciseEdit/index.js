import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import ConditioningEdit from './ConditioningEdit';
import StrengthEdit from './StrengthEdit';
import MobilityEdit from './MobilityEdit';


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

function getFormContent(execiseType) {
    switch (execiseType) {
        case 0:
            return <ConditioningEdit />;
        case 1:
            return <StrengthEdit />;
        case 2:
            return <MobilityEdit />;
        default:
            return "";
    }
}

const ExerciseEdit = (props) => {
    const classes = useStyles();

    const [execiseType, setExeciseType] = useState(0);

    return (
        <Paper className={classes.exerciseRoot}>
            <Grid container direction="column" spacing={1} justify='space-between' >
                <Grid item>
                    {/*---- type: [ metcon, strength, mobility ]*/}
                    <InputLabel id="exercise-type-label">Tipologia</InputLabel>
                    <Select
                        labelId="exercise-type"
                        id="exercise-type"
                        value={execiseType}
                        onChange={(event) => setExeciseType(event.target.value)}
                    >
                        <MenuItem value={0}>Conditioning</MenuItem>
                        <MenuItem value={1}>Strength</MenuItem>
                        <MenuItem value={2}>Mobility</MenuItem>
                    </Select>
                </Grid>
                {getFormContent(execiseType)}
            </Grid>
        </Paper >
    );
};

export default ExerciseEdit;
