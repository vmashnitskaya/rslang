import React from 'react';
import { Typography } from '@material-ui/core';

const LoginPhrase = () => {
    return (
        <div>
            <Typography variant="h4" color="primary" gutterBottom>
                Open the world with RS Lang!
            </Typography>
            <Typography color="textSecondary" className="page-phrase">
                Our service offers you the great opportunity to learn the English <br /> language
                with ease, without boring grammar books or tedious exercises.
                <br />
                <br />
                Do not hesitate and sign up!
            </Typography>
        </div>
    );
};

export default LoginPhrase;
