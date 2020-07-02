import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardMedia, Paper, Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import TranslateIcon from '@material-ui/icons/Translate';
import LinearProgressWithLabel from './LinearProgressWithLabel';
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
        minWidth: 310,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        marginBottom: '10px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    chart: {
        width: '100%',
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
    isTranslationEnabled,
    setIsTranslationEnabled,
    statistics,
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

    const { wordsPerDay, optional } = settings;

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

    const handleSoundPerformed = useCallback(() => {
        setIsSoundEnabled(false);
        handleNewWord();
        setInitialState('true');
    }, [handleNewWord, setInitialState]);

    const handleTranslationDisabled = () => {
        setIsTranslationEnabled(!isTranslationEnabled);
    };

    const handleAnswerShow = () => {
        handleGuessedWordProvided(word);
    };
    return (
        <div className="card__wrapper">
            <div className={classes.root}>
                <LinearProgressWithLabel
                    className={classes.chart}
                    learned={
                        statistics.optional[new Date().toISOString().slice(0, 10).replace(/-/g, '')]
                            ? statistics.optional[
                                  new Date().toISOString().slice(0, 10).replace(/-/g, '')
                              ]
                            : 0
                    }
                    toLearn={wordsPerDay}
                />
            </div>
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
                                isAudioExampleEnabled={optional.isShowTextMeaning}
                                isAudioMeaningEnabled={optional.isShowTextExample}
                                isSoundEnabled={isSoundEnabled}
                                handleSoundPerformed={handleSoundPerformed}
                            />
                            <TranslateIcon
                                className="translate-icon"
                                color={isTranslationEnabled ? 'primary' : undefined}
                                fontSize="large"
                                onClick={handleTranslationDisabled}
                            />
                        </div>
                        {optional.isShowImage && (
                            <CardMedia className={classes.media} title="image" image={image} />
                        )}

                        <InputField
                            word={word}
                            onGuessedWordProvided={handleGuessedWordProvided}
                            isIncorrectPlaceHolderShown={Boolean(wordStatus.incorrectWord)}
                            isCorrectPlaceholderShown={Boolean(wordStatus.correctWord)}
                            wordStatus={wordStatus}
                        />

                        {optional.isShowTextMeaning && (
                            <TextMeaning
                                word={word}
                                textMeaning={textMeaning}
                                textMeaningTranslate={textMeaningTranslate}
                                showFullSentence={Boolean(wordStatus.correctWord)}
                                showTranslation={
                                    Boolean(wordStatus.correctWord) && isTranslationEnabled
                                }
                            />
                        )}

                        {optional.isShowTextExample && (
                            <TextExample
                                word={word}
                                textExample={textExample}
                                textExampleTranslate={textExampleTranslate}
                                showFullSentence={Boolean(wordStatus.correctWord)}
                                showTranslation={
                                    Boolean(wordStatus.correctWord) && isTranslationEnabled
                                }
                            />
                        )}
                    </CardContent>
                    <CardActions className="card__buttons">
                        {optional.isShowAnswer && (
                            <Button variant="contained" color="primary" onClick={handleAnswerShow}>
                                I don&apos;t know
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
    setIsTranslationEnabled: (isTranslationEnabled) => {
        dispatch(mainGameActions.setIsTranslationEnabled(isTranslationEnabled));
    },
});

const mapStateToProps = (state) => ({
    isAutoSoundEnabled: mainGameSelectors.getIsAutoSoundEnabled(state),
    wordStatus: mainGameSelectors.getWordStatus(state),
    isTranslationEnabled: mainGameSelectors.getIsTranslationEnabled(state),
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
    setIsTranslationEnabled: PropTypes.func.isRequired,
    isTranslationEnabled: PropTypes.bool.isRequired,
    statistics: PropTypes.shape({
        learnedWords: PropTypes.number,
        optional: PropTypes.number,
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

export default connect(mapStateToProps, mapDispatchToProps)(MainCard);
