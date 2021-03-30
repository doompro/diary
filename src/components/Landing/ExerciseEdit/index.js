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

function getFormContent(execiseType, exercise) {
    switch (execiseType) {
        case "Strength":
            return <StrengthEdit exercise={exercise} />;
        case "Conditioning":
            return <ConditioningEdit exercise={exercise} />;
        case "Mobility":
            return <MobilityEdit exercise={exercise} />;
        default:
            return "";
    }
}

const ExerciseEdit = (props) => {
    const classes = useStyles();
    const [execiseType, setExeciseType] = useState(props.exercise.type || "Strength");

    console.log("props.exercise: ", props.exercise);

    const handleTypeChange = (value) => {
        setExeciseType(value)
        props.exercise.type = value;
    };

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
                        onChange={(event) => handleTypeChange(event.target.value)}
                    >
                        <MenuItem value={"Strength"}>Strength</MenuItem>
                        <MenuItem value={"Conditioning"}>Conditioning</MenuItem>
                        <MenuItem value={"Mobility"}>Mobility</MenuItem>
                    </Select>
                </Grid>
                {getFormContent(execiseType, props.exercise)}
            </Grid>
        </Paper >
    );
};

export default ExerciseEdit;
