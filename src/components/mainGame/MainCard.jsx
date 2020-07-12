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
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
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

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 450,
        minWidth: 290,
    },
    rootRadio: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rootRadioOption: {
        display: 'none',
    },

    label: {
        color: theme.palette.primary.main,
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
        flexWrap: 'wrap',
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
}));

const MainCard = ({
    wordObj,
    settings,
    wordStatus,
    setIncorrectWordProvided,
    setCorrectWordProvided,
    isAutoSoundEnabled,
    setAutoSoundEnabled,
    handleNewWord,
    isTranslationEnabled,
    setIsTranslationEnabled,
    statistics,
    userId,
    token,
    addNewWord,
    currentWordNumber,
    handleWordsTypeChanged,
    wordsType,
    handleSuccessAndErrors,
    handleCountNewWords,
    setInitialState,
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
    const [isDifficultDisabled, setIsDifficultDisabled] = useState(
        wordObj.userWord ? wordObj.userWord.optional.difficult : false
    );
    const [isDeletedDisabled, setIsDeletedDisabled] = useState(
        wordObj.userWord ? wordObj.userWord.optional.deleted : false
    );
    const [isRepeatDisabled, setIsRepeatDisabled] = useState(
        wordObj.userWord ? wordObj.userWord.optional.repeat : false
    );
    const [isNewWord, setIsNewWord] = useState(!wordObj.userWord);
    const [isAnswerDisabled, setIsAnswerDisabled] = useState(false);
    const [isEasyDisabled, setIsEasyDisabled] = useState(false);
    const [answerShown, setAnswerShown] = useState(false);

    useEffect(() => {
        setIsDeletedDisabled(wordObj.userWord ? wordObj.userWord.optional.deleted : false);
        setIsDifficultDisabled(wordObj.userWord ? wordObj.userWord.optional.difficult : false);
        setIsNewWord(!wordObj.userWord);
        if (!wordObj.userWord) {
            handleCountNewWords();
        }
        setIsRepeatDisabled(wordObj.userWord ? wordObj.userWord.optional.repeat : false);

        setIsSoundEnabled(false);
        setIsAnswerDisabled(false);
        setIsEasyDisabled(false);
        setAnswerShown(false);
        setInitialState('true');
    }, [word, currentWordNumber]);

    const handleGuessedWordProvided = async (guessedWord) => {
        if (word === guessedWord.trim()) {
            setCorrectWordProvided(guessedWord);
            if (isAutoSoundEnabled && !isSoundEnabled) {
                setIsSoundEnabled(true);
            }
            handleSuccessAndErrors('correct');
            setAnswerShown(true);
            if (
                isDifficultDisabled ||
                isDeletedDisabled ||
                wordObj.userWord ||
                isRepeatDisabled ||
                isEasyDisabled
            ) {
                await passedWordsApi.putPassedWords(userId, token, _id, {
                    difficulty: 'default',
                    optional: {
                        difficult: isDifficultDisabled,
                        deleted: isDeletedDisabled,
                        repeat: isRepeatDisabled,
                        easy: isEasyDisabled,
                        learned: true,
                    },
                });
            } else {
                await passedWordsApi.postPassedWords(userId, token, _id, {
                    difficulty: 'default',
                    optional: {
                        learned: true,
                    },
                });
            }
        } else {
            setIncorrectWordProvided(guessedWord);
            handleSuccessAndErrors('incorrect');
            addNewWord(
                {
                    ...wordObj,
                    userWord: {
                        optional: {
                            learned: true,
                            difficult: isDifficultDisabled,
                            deleted: isDeletedDisabled,
                            repeat: true,
                        },
                    },
                },
                currentWordNumber + 2
            );
        }
    };
    const handleAutoSoundEnabled = () => {
        setAutoSoundEnabled(!isAutoSoundEnabled);
    };

    const handleSoundPerformed = useCallback(() => {
        setIsSoundEnabled(false);
    }, [setIsSoundEnabled]);

    const handleTranslationDisabled = () => {
        setIsTranslationEnabled(!isTranslationEnabled);
    };

    const handleAnswerShow = async () => {
        setIsAnswerDisabled(true);
        await handleGuessedWordProvided(word);
    };
    const handleDeleteClick = async () => {
        setIsDeletedDisabled(true);
        setAlertShown('deleted');

        if (
            isDifficultDisabled ||
            wordObj.userWord ||
            isRepeatDisabled ||
            isEasyDisabled ||
            answerShown
        ) {
            await passedWordsApi.putPassedWords(userId, token, _id, {
                difficulty: 'default',
                optional: {
                    deleted: true,
                    difficult: isDifficultDisabled,
                    repeat: isRepeatDisabled,
                    learned: !!(Boolean(wordObj.userWord) || answerShown),
                    easy: isEasyDisabled,
                },
            });
        } else {
            await passedWordsApi.postPassedWords(userId, token, _id, {
                difficulty: 'default',
                optional: {
                    deleted: true,
                },
            });
        }
    };

    const handleDifficultClick = async () => {
        setIsDifficultDisabled(true);
        setAlertShown('difficult');

        if (
            isDeletedDisabled ||
            wordObj.userWord ||
            isRepeatDisabled ||
            isEasyDisabled ||
            answerShown
        ) {
            await passedWordsApi.putPassedWords(userId, token, _id, {
                difficulty: 'default',
                optional: {
                    difficult: true,
                    deleted: isDeletedDisabled,
                    repeat: isRepeatDisabled,
                    learned: !!(Boolean(wordObj.userWord) || answerShown),
                    easy: isEasyDisabled,
                },
            });
        } else {
            await passedWordsApi.postPassedWords(userId, token, _id, {
                difficulty: 'default',
                optional: {
                    difficult: true,
                },
            });
        }
    };

    const handleRepeatClick = async () => {
        setAlertShown('repeat');
        setIsRepeatDisabled(true);
        addNewWord(
            {
                ...wordObj,
                userWord: {
                    optional: {
                        learned: true,
                        difficult: isDifficultDisabled,
                        deleted: isDeletedDisabled,
                        repeat: true,
                        easy: isEasyDisabled,
                    },
                },
            },
            currentWordNumber + 2
        );
        if (
            isDifficultDisabled ||
            isDeletedDisabled ||
            wordObj.userWord ||
            isRepeatDisabled ||
            isEasyDisabled ||
            answerShown
        ) {
            await passedWordsApi.putPassedWords(userId, token, _id, {
                difficulty: 'default',
                optional: {
                    difficult: isDifficultDisabled,
                    deleted: isDeletedDisabled,
                    repeat: true,
                    learned: !!(Boolean(wordObj.userWord) || answerShown),
                },
            });
        } else {
            await passedWordsApi.postPassedWords(userId, token, _id, {
                difficulty: 'default',
                optional: {
                    repeat: true,
                },
            });
        }
    };

    const handleEasyClick = async () => {
        setIsEasyDisabled(true);
        setAlertShown('easy');

        if (
            isDifficultDisabled ||
            wordObj.userWord ||
            isRepeatDisabled ||
            isDeletedDisabled ||
            answerShown
        ) {
            await passedWordsApi.putPassedWords(userId, token, _id, {
                difficulty: 'default',
                optional: {
                    easy: true,
                    difficult: isDifficultDisabled,
                    repeat: isRepeatDisabled,
                    learned: !!(Boolean(wordObj.userWord) || answerShown),
                    deleted: isDeletedDisabled,
                },
            });
        } else {
            await passedWordsApi.postPassedWords(userId, token, _id, {
                difficulty: 'default',
                optional: {
                    easy: true,
                },
            });
        }
    };

    const handleAlertClose = () => {
        setAlertShown('');
    };
    const handleRadioChange = (event) => {
        if (wordsType && wordsType !== event.target.value) {
            handleWordsTypeChanged(event.target.value);
        }
    };
    return (
        <>
            <div className="card__wrapper">
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="words"
                        name="words"
                        value={wordsType}
                        onChange={handleRadioChange}
                        className={classes.rootRadio}
                    >
                        <FormControlLabel
                            value="new"
                            control={<Radio className={classes.rootRadioOption} />}
                            label="New"
                            labelPlacement="top"
                            className={wordsType === 'new' ? classes.label : undefined}
                        />
                        <FormControlLabel
                            value="mixed"
                            control={<Radio className={classes.rootRadioOption} />}
                            label="Mixed"
                            labelPlacement="top"
                            className={wordsType === 'mixed' ? classes.label : undefined}
                        />
                        <FormControlLabel
                            value="repeat"
                            control={<Radio className={classes.rootRadioOption} />}
                            label="Repeat words"
                            labelPlacement="top"
                            className={wordsType === 'repeat' ? classes.label : undefined}
                        />
                    </RadioGroup>
                </FormControl>
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
                                {isNewWord ? (
                                    <div className="new-word">new word</div>
                                ) : (
                                    <div className="new-word">word to repeat</div>
                                )}
                                {settings.optional.isShowDifficult && (
                                    <div className="difficulty">
                                        <Tooltip
                                            title="Easy"
                                            placement="top"
                                            TransitionComponent={Zoom}
                                        >
                                            <span>
                                                <IconButton
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.icons}
                                                    disabled={
                                                        isEasyDisabled ||
                                                        isDifficultDisabled ||
                                                        isRepeatDisabled
                                                    }
                                                    onClick={handleEasyClick}
                                                >
                                                    <MoodIcon fontSize="small" />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        <Tooltip
                                            title="Difficult"
                                            placement="top"
                                            TransitionComponent={Zoom}
                                        >
                                            <span>
                                                <IconButton
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.icons}
                                                    disabled={
                                                        isEasyDisabled ||
                                                        isDifficultDisabled ||
                                                        isRepeatDisabled
                                                    }
                                                    onClick={handleDifficultClick}
                                                >
                                                    <MoodBadIcon fontSize="small" />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        <Tooltip
                                            title="Repeat in this round"
                                            placement="top"
                                            TransitionComponent={Zoom}
                                        >
                                            <IconButton
                                                variant="contained"
                                                color="primary"
                                                className={classes.icons}
                                                disabled={
                                                    isEasyDisabled ||
                                                    isDifficultDisabled ||
                                                    isRepeatDisabled ||
                                                    isDeletedDisabled
                                                }
                                                onClick={handleRepeatClick}
                                            >
                                                <LoopIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                )}
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
                                currentWordNumber={currentWordNumber}
                                wordsType={wordsType}
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
                                    disabled={isAnswerDisabled || answerShown}
                                >
                                    Answer
                                </Button>
                            )}
                            {optional.isShowDelete && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleDeleteClick}
                                    disabled={isDeletedDisabled || isRepeatDisabled}
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
                autoHideDuration={5000}
                onClose={handleAlertClose}
                color="primary"
            >
                <Alert onClose={handleAlertClose} alertShown={alertShown} />
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
    setIsTranslationEnabled: (isTranslationEnabled) => {
        dispatch(mainGameActions.setIsTranslationEnabled(isTranslationEnabled));
    },
    addNewWord: (newWord, currentNumber) => {
        dispatch(mainGameActions.addNewWord(newWord, currentNumber));
    },
    setInitialState: (initialState) => {
        dispatch(mainGameActions.setInitialState(initialState));
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
        userWord: PropTypes.shape({
            difficulty: PropTypes.string,
            optional: PropTypes.shape({
                difficult: PropTypes.bool,
                repeat: PropTypes.bool,
                learned: PropTypes.bool,
                deleted: PropTypes.bool,
            }),
        }),
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
    setCorrectWordProvided: PropTypes.func.isRequired,
    isAutoSoundEnabled: PropTypes.bool.isRequired,
    setAutoSoundEnabled: PropTypes.func.isRequired,
    setIncorrectWordProvided: PropTypes.func.isRequired,
    wordStatus: PropTypes.shape({
        initial: PropTypes.string,
        correctWord: PropTypes.string,
        incorrectWord: PropTypes.string,
    }).isRequired,
    handleNewWord: PropTypes.func.isRequired,
    setIsTranslationEnabled: PropTypes.func.isRequired,
    isTranslationEnabled: PropTypes.bool.isRequired,
    statistics: PropTypes.shape({
        learnedWords: PropTypes.number,
        optional: PropTypes.shape({
            learnedWords: PropTypes.number,
            optional: PropTypes.objectOf(PropTypes.string),
        }),
    }).isRequired,
    userId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    addNewWord: PropTypes.func.isRequired,
    currentWordNumber: PropTypes.number,
    handleWordsTypeChanged: PropTypes.func.isRequired,
    wordsType: PropTypes.string.isRequired,
    handleSuccessAndErrors: PropTypes.func.isRequired,
    handleCountNewWords: PropTypes.func.isRequired,
    setInitialState: PropTypes.func.isRequired,
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
    currentWordNumber: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainCard);
