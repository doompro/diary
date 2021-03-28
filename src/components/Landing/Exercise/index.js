import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: "center",

        minHeight: 5,
        minWidth: "80%",
        padding: theme.spacing(2),

        margin: "5px",

        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
}));

const Exercise = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            {"Nuovo esercizio" + props.eleid}<RemoveCircleOutlineIcon onClick={() => props.onRemove(props.eleid)} />
        </Paper>
    );
};

export default Exercise;
