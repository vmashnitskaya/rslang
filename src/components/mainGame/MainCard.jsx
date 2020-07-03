import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Paper,
    Divider,
    IconButton,
    Tooltip,
    Zoom,
    Snackbar,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import TranslateIcon from '@material-ui/icons/Translate';
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import LoopIcon from '@material-ui/icons/Loop';
import LinearProgressWithLabel from './LinearProgressWithLabel';
import InputField from './InputField';
import Sound from './Sound';
import Translation from './Translation';
import Transcription from './Transcription';
import TextMeaning from './TextMeaning';
import TextExample from './TextExample';
import mainGameActions from './redux/mainGameActions';
import passedWordsApi from '../router/storage/getPostPassedWordsRedux/passedWordsApi';
import { getToken, getUserId } from '../router/storage/selectors';
import Alert from './Alert';
import mainGameSelectors from './redux/mainGameSelectors';

import './MainCard.scss';

const useStyles = makeStyles({
    root: {
        maxWidth: 450,
        minWidth: 300,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        marginBottom: '10px',
    },
    word: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    chartWrapper: {
        maxWidth: 450,
        minWidth: 290,
    },
    chart: {
        width: '100%',
    },
    icons: {
        padding: 4,
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
    userId,
    token,
}) => {
    const {
        _id,
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
    const [alertShown, setAlertShown] = useState('');
    const [isDifficultDisabled, setIsDifficultDisabled] = useState(false);
    const [isDeletedDisabled, setisDeletedDisabled] = useState(false);

    useEffect(() => {
        if (isSoundEnabled) {
            setIsSoundEnabled(false);
        }
        setInitialState('true');
    }, [isSoundEnabled]);

    const handleGuessedWordProvided = async (guessedWord) => {
        if (word === guessedWord.trim()) {
            setCorrectWordProvided(guessedWord);
            if (isAutoSoundEnabled) {
                setIsSoundEnabled(true);
            }

            await passedWordsApi.postPassedWords(userId, token, _id, {
                difficulty: 'default',
                optional: {
                    learned: true,
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
                },
            });
        } else {
            setIncorrectWordProvided(guessedWord);
        }
    };
    const handleAutoSoundEnabled = () => {
        setAutoSoundEnabled(!isAutoSoundEnabled);
    };

    const handleSoundPerformed = useCallback(() => {
        setIsSoundEnabled(false);
        setInitialState('true');
    }, [setInitialState]);

    const handleTranslationDisabled = () => {
        setIsTranslationEnabled(!isTranslationEnabled);
    };

    const handleAnswerShow = () => {
        handleGuessedWordProvided(word);
    };
    const handleDeleteClick = async () => {
        setisDeletedDisabled(true);
        setAlertShown('deleted');
        await passedWordsApi.postPassedWords(userId, token, _id, {
            difficulty: 'default',
            optional: {
                deleted: true,
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
            },
        });
    };

    const handleDifficultClick = async () => {
        setIsDifficultDisabled(true);
        setAlertShown('difficult');

        await passedWordsApi.postPassedWords(userId, token, _id, {
            difficulty: 'default',
            optional: {
                difficult: true,
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
            },
        });
    };

    const handleRepeatClick = () => {
        setAlertShown('repeat');
    };

    const handleEasyClick = () => {
        setAlertShown('easy');
    };

    const handleAlertClose = () => {
        setAlertShown('');
    };
    return (
        <>
            <div className="card__wrapper">
                <div className={classes.chartWrapper}>
                    <LinearProgressWithLabel
                        className={classes.chart}
                        learned={
                            statistics.optional[
                                new Date().toISOString().slice(0, 10).replace(/-/g, '')
                            ]
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
                            <div className="header">
                                {newWord && <div className="new-word">new word</div>}
                                <div className="difficulty">
                                    <Tooltip
                                        title="Easy"
                                        placement="top"
                                        TransitionComponent={Zoom}
                                        onClick={handleEasyClick}
                                    >
                                        <IconButton
                                            variant="contained"
                                            color="primary"
                                            className={classes.icons}
                                        >
                                            <MoodIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip
                                        title="Difficult"
                                        placement="top"
                                        TransitionComponent={Zoom}
                                        onClick={handleDifficultClick}
                                    >
                                        <IconButton
                                            variant="contained"
                                            color="primary"
                                            className={classes.icons}
                                            disabled={isDifficultDisabled}
                                        >
                                            <MoodBadIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip
                                        title="Repeat in this round"
                                        placement="top"
                                        TransitionComponent={Zoom}
                                        onClick={handleRepeatClick}
                                    >
                                        <IconButton
                                            variant="contained"
                                            color="primary"
                                            className={classes.icons}
                                        >
                                            <LoopIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                            <Divider />
                            <div className={classes.word}>
                                {optional.isShowTranslate && (
                                    <Translation
                                        className="translation"
                                        wordTranslate={wordTranslate}
                                    />
                                )}

                                {optional.isShowTranscription && (
                                    <Transcription
                                        className="transcription"
                                        transcription={transcription}
                                    />
                                )}
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
                                handleNewWord={handleNewWord}
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
                        <Divider />
                        <CardActions className="card__buttons">
                            {optional.isShowAnswer && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAnswerShow}
                                >
                                    I don&apos;t know
                                </Button>
                            )}
                            {optional.isShowDelete && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleDeleteClick}
                                    disabled={isDeletedDisabled}
                                >
                                    Delete
                                </Button>
                            )}
                            <div className="action-buttons">
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
                                {(optional.isShowTextMeaning || optional.isShowTextExample) && (
                                    <Tooltip
                                        title="Translation"
                                        placement="bottom"
                                        TransitionComponent={Zoom}
                                    >
                                        <TranslateIcon
                                            className="translate-icon"
                                            color={isTranslationEnabled ? 'primary' : undefined}
                                            fontSize="large"
                                            onClick={handleTranslationDisabled}
                                        />
                                    </Tooltip>
                                )}
                            </div>
                        </CardActions>
                    </Card>
                </Paper>
            </div>
            <Snackbar
                open={Boolean(alertShown)}
                autoHideDuration={3000}
                onClose={handleAlertClose}
                color="primary"
            >
                <Alert onClose={handleAlertClose}>
                    {alertShown === 'deleted' &&
                        'The word is added to deleted words. It will not appear again in training.'}
                    {alertShown === 'difficult' &&
                        'The word is added to difficult words. It will appear again in further trainings.'}
                    {alertShown === 'repeat' && 'The word will appear again in this training.'}
                    {alertShown === 'easy' && 'Easy? We will not show it again for you.'}
                </Alert>
            </Snackbar>
        </>
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
    userId: getUserId(state),
    token: getToken(state),
});

MainCard.propTypes = {
    wordObj: PropTypes.shape({
        _id: PropTypes.string,
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
    userId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
};

MainCard.defaultProps = {
    wordObj: {
        _id: '',
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
