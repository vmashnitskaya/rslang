import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    phrase: {
        fontSize: '18px',
        [theme.breakpoints.down('md')]: {
            fontSize: '18px',
        },
    },
}));

const LoginPhrase = () => {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h4" color="primary" gutterBottom>
                Open the world with RS Lang!
            </Typography>
            <Typography color="textSecondary" className={classes.phrase}>
                Our service offers you the great opportunity to learn the English language with
                ease, without boring grammar books or tedious exercises.
                <br />
                <br />
                Do not hesitate and sign up!
            </Typography>
        </div>
    );
};

export default LoginPhrase;
