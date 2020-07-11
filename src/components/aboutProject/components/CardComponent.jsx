import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import * as txtx from './TextInformation';

const UserPhoto = () => {
    return <CardMedia component="img" image="" />;
};

const UserComment = () => {
    return (
        <Paper>
            <Typography>{txtx.slogan}</Typography>;
        </Paper>
    );
};

const commentBox = () => {
    return (
        <div>
            <UserPhoto />
            <UserComment />
        </div>
    );
};

export default commentBox;
