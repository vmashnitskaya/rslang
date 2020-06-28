import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    title: {
        fontSize: 16,
        lineHeight: '20px',
        marginTop: '15px',
        fontWeight: 600,
    },
    translation: {
        fontSize: 14,
        lineHeight: '18px',
        fontStyle: 'italic',
        fontWeight: 600,
    },
});

const TextMeaning = ({ textMeaning, textMeaningTranslate, showTranslation }) => {
    const classes = useStyles();
    return (
        <>
            <Typography className={classes.title} component="p">
                {textMeaning}
            </Typography>
            {showTranslation && (
                <Typography className={classes.translation} component="p">
                    {textMeaningTranslate}
                </Typography>
            )}
        </>
    );
};

TextMeaning.propTypes = {
    textMeaning: PropTypes.string.isRequired,
    textMeaningTranslate: PropTypes.string.isRequired,
    showTranslation: PropTypes.bool.isRequired,
};

export default TextMeaning;
