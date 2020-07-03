import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        marginRight: 15,
    },
});

const Translation = ({ wordTranslate }) => {
    const classes = useStyles();
    return (
        <Typography gutterBottom variant="h5" component="h2" className={classes.root}>
            {wordTranslate}
        </Typography>
    );
};

Translation.propTypes = {
    wordTranslate: PropTypes.string.isRequired,
};

export default Translation;
