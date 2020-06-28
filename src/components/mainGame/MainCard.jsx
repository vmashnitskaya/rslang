import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardMedia, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputField from './InputField';
import Sound from './Sound';
import Translation from './Translation';
import Transcription from './Transcription';
import TextMeaning from './TextMeaning';
import TextExample from './TextExample';
import './MainCard.scss';

const useStyles = makeStyles({
    root: {
        maxWidth: 450,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        marginBottom: '15px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const MainCard = ({ wordObj, settings }) => {
    const {
        id,
        word,
        image,
        audio,
        textMeaning,
        textExample,
        transcription,
        wordTranslate,
        textMeaningTranslate,
        textExampleTranslate,
    } = wordObj;

    console.log(id);
    console.log(wordObj);

    const { optional } = settings;

    const classes = useStyles();

    return (
        <div className="card__wrapper">
            <Paper>
                <Card className={classes.root}>
                    <CardContent>
                        <div className={classes.header}>
                            {optional.isShowTranslate && (
                                <Translation wordTranslate={wordTranslate} />
                            )}

                            {optional.isShowTranscription && (
                                <Transcription transcription={transcription} />
                            )}
                            <Sound audion={audio} />
                        </div>
                        {optional.isShowImage && (
                            <CardMedia className={classes.media} title="image" image={image} />
                        )}

                        <InputField word={word} />

                        {optional.isShowTextMeaning && (
                            <TextMeaning
                                textMeaning={textMeaning}
                                textMeaningTranslate={textMeaningTranslate}
                                showTranslation={false}
                            />
                        )}

                        {optional.isShowTextExample && (
                            <TextExample
                                textExample={textExample}
                                textExampleTranslate={textExampleTranslate}
                                showTranslation={false}
                            />
                        )}
                    </CardContent>
                    <CardActions className="card__buttons">
                        {optional.isShowAnswer && (
                            <Button variant="contained" color="primary">
                                Answer
                            </Button>
                        )}
                        {optional.isShowDifficult && (
                            <Button variant="outlined" color="primary">
                                Difficult
                            </Button>
                        )}
                        {optional.isShowDelete && (
                            <Button variant="outlined" color="primary">
                                Delete
                            </Button>
                        )}
                    </CardActions>
                </Card>
            </Paper>
        </div>
    );
};

MainCard.propTypes = {
    wordObj: PropTypes.shape({
        id: PropTypes.string,
        word: PropTypes.string,
        image: PropTypes.string,
        audio: PropTypes.string,
        audioMeaning: PropTypes.string,
        audioExample: PropTypes.string,
        textMeaning: PropTypes.string,
        textExample: PropTypes.string,
        transcription: PropTypes.string,
        wordTranslate: PropTypes.string,
        textMeaningTranslate: PropTypes.string,
        textExampleTranslate: PropTypes.string,
    }),
    settings: PropTypes.shape({
        wordsPerDay: PropTypes.number,
        optional: PropTypes.shape({
            isShowImage: PropTypes.bool,
            isShowTranslate: PropTypes.bool,
            isShowTextMeaning: PropTypes.bool,
            isShowTextExample: PropTypes.bool,
            isShowTranscription: PropTypes.bool,
            isShowAnswer: PropTypes.bool,
            isShowDifficult: PropTypes.bool,
            isShowDelete: PropTypes.bool,
        }),
    }).isRequired,
};

MainCard.defaultProps = {
    wordObj: {
        id: '',
        word: '',
        image: '',
        audio: '',
        audioMeaning: '',
        audioExample: '',
        textMeaning: '',
        textExample: '',
        transcription: '',
        wordTranslate: '',
        textMeaningTranslate: '',
        textExampleTranslate: '',
    },
};

export default MainCard;
