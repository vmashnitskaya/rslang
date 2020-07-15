import React from 'react';
import Typography from '@material-ui/core/Typography';

const StartWindow = () => {
    return (
        <div>
            <img
                width="150"
                height="110"
                src="https://cdn.dribbble.com/users/89254/screenshots/2712352/rate-star.gif"
                alt=""
            />
            <Typography variant="h4">
                The rules of the game are simple: collect words from the letters presented and get
                points.
            </Typography>
            <Typography variant="h6"> Please select a difficulty level</Typography>
        </div>
    );
};

export default StartWindow;
