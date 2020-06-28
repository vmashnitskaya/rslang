import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    title: {
        fontSize: 16,
        lineHeight: '20px',
        marginTop: '10px',
    },
    translation: {
        fontSize: 14,
        lineHeight: '18px',
        fontStyle: 'italic',
    },
});

const TextExample = ({ textExample, textExampleTranslate, showTranslation }) => {
    const classes = useStyles();
    return (
        <>
            <Typography className={classes.title} component="p">
                {textExample}
            </Typography>
            {showTranslation && (
                <Typography className={classes.translation} component="p">
                    {textExampleTranslate}
                </Typography>
            )}
        </>
    );
};

TextExample.propTypes = {
    textExample: PropTypes.string.isRequired,
    textExampleTranslate: PropTypes.string.isRequired,
    showTranslation: PropTypes.bool.isRequired,
};

export default TextExample;
