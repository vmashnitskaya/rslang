import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardMedia, Paper, Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import InputField from './InputField';
import Sound from './Sound';
import Translation from './Translation';
import Transcription from './Transcription';
import TextMeaning from './TextMeaning';
import TextExample from './TextExample';
import mainGameActions from './redux/mainGameActions';
import mainGameSelectors from './redux/mainGameSelectors';
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
        marginTop: '10px',
    },
});

const MainCard = ({
    wordObj,
    settings,
    newWord,
    wordStatus,
    setIncorrectWordProvided,
    setCorrectWordProvided,
    setInitialState,
    isAutoSoundEnabled,
    setAutoSoundEnabled,
    handleNewWord,
}) => {
    const {
        word,
        image,
        audio,
        textMeaning,
        audioMeaning,
        audioExample,
        textExample,
        transcription,
        wordTranslate,
        textMeaningTranslate,
        textExampleTranslate,
    } = wordObj;

    const { optional } = settings;

    const classes = useStyles();

    const [isSoundEnabled, setIsSoundEnabled] = useState(false);

    useEffect(() => {
        setInitialState('true');
    }, []);

    const handleGuessedWordProvided = (guessedWord) => {
        if (word === guessedWord) {
            setCorrectWordProvided(guessedWord);
            if (isAutoSoundEnabled) {
                setIsSoundEnabled(true);
            }
        } else {
            setIncorrectWordProvided(guessedWord);
        }
    };
    const handleAutoSoundEnabled = () => {
        setAutoSoundEnabled(!isAutoSoundEnabled);
    };

    const handleSoundPerformed = () => {
        setIsSoundEnabled(false);
        handleNewWord();
        setInitialState('true');
    };

    return (
        <div className="card__wrapper">
            <Paper>
                <Card className={classes.root}>
                    <CardContent>
                        {newWord && <div className="new-word">new word</div>}
                        <Divider />
                        <div className={classes.header}>
                            {optional.isShowTranslate && (
                                <Translation wordTranslate={wordTranslate} />
                            )}

                            {optional.isShowTranscription && (
                                <Transcription transcription={transcription} />
                            )}
                            <Sound
                                audio={audio}
                                audioExample={audioExample}
                                audioMeaning={audioMeaning}
                                handleAutoSoundEnabled={handleAutoSoundEnabled}
                                isAutoSoundEnabled={isAutoSoundEnabled}
                                isAudioEnabled={optional.isShowTranslate}
                                isAudioExampleEnabled={optional.isShowTextMeaning}
                                isAudioMeaningEnabled={optional.isShowTextExample}
                                isSoundEnabled={isSoundEnabled}
                                handleSoundPerformed={handleSoundPerformed}
                            />
                        </div>
                        {optional.isShowImage && (
                            <CardMedia className={classes.media} title="image" image={image} />
                        )}

                        <InputField
                            word={word}
                            onGuessedWordProvided={handleGuessedWordProvided}
                            isPlaceHolderShown={Boolean(wordStatus.incorrectWord)}
                            isCorrectPlaceholderShown={Boolean(wordStatus.correctWord)}
                            wordStatus={wordStatus}
                        />

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

const mapDispatchToProps = (dispatch) => ({
    setAutoSoundEnabled: (isAutoSoundEnabled) => {
        dispatch(mainGameActions.setAutoSoundEnabled(isAutoSoundEnabled));
    },
    setCorrectWordProvided: (isCorrectWordProvided) => {
        dispatch(mainGameActions.setCorrectWordProvided(isCorrectWordProvided));
    },
    setIncorrectWordProvided: (isIncorrectWordProvided) => {
        dispatch(mainGameActions.setIncorrectWordProvided(isIncorrectWordProvided));
    },
    setInitialState: (initialState) => {
        dispatch(mainGameActions.setInitialState(initialState));
    },
});

const mapStateToProps = (state) => ({
    isAutoSoundEnabled: mainGameSelectors.getIsAutoSoundEnabled(state),
    wordStatus: mainGameSelectors.getWordStatus(state),
});

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
    newWord: PropTypes.bool.isRequired,
    setCorrectWordProvided: PropTypes.func.isRequired,
    isAutoSoundEnabled: PropTypes.bool.isRequired,
    setAutoSoundEnabled: PropTypes.func.isRequired,
    setIncorrectWordProvided: PropTypes.func.isRequired,
    wordStatus: PropTypes.shape({
        initial: PropTypes.string,
        correctWord: PropTypes.string,
        incorrectWord: PropTypes.string,
    }).isRequired,
    setInitialState: PropTypes.func.isRequired,
    handleNewWord: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(MainCard);
