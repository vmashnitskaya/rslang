import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    title: {
        fontSize: 16,
        lineHeight: '20px',
        marginTop: '5px',
        fontWeight: 600,
    },
    translation: {
        fontSize: 14,
        lineHeight: '18px',
        fontWeight: 600,
    },
});

const TextMeaning = ({
    word,
    textMeaning,
    textMeaningTranslate,
    showTranslation,
    showFullSentence,
}) => {
    const classes = useStyles();

    const regExp = new RegExp(`${word}`, 'i');
    return (
        <>
            <Typography className={classes.title} component="p">
                {!showFullSentence && textMeaning.replace(regExp, ' ... ')}
                {showFullSentence && textMeaning}
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
    word: PropTypes.string.isRequired,
    textMeaning: PropTypes.string.isRequired,
    textMeaningTranslate: PropTypes.string.isRequired,
    showTranslation: PropTypes.bool.isRequired,
    showFullSentence: PropTypes.bool.isRequired,
};

export default TextMeaning;
