import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    title: {
        fontSize: 16,
        lineHeight: '20px',
        marginTop: '10px',
        fontStyle: 'italic',
    },
    translation: {
        fontSize: 14,
        lineHeight: '18px',
        fontStyle: 'italic',
    },
});

const TextExample = ({
    word,
    textExample,
    textExampleTranslate,
    showTranslation,
    showFullSentence,
}) => {
    const classes = useStyles();
    const regExp = new RegExp(`${word}`, 'i');
    return (
        <>
            <Typography className={classes.title} component="p">
                {!showFullSentence && textExample.replace(regExp, ' ... ')}
                {showFullSentence && textExample}
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
    word: PropTypes.string.isRequired,
    textExample: PropTypes.string.isRequired,
    textExampleTranslate: PropTypes.string.isRequired,
    showTranslation: PropTypes.bool.isRequired,
    showFullSentence: PropTypes.bool.isRequired,
};

export default TextExample;
