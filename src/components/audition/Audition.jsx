/*eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import wordsActions from '../router/storage/getWordsRedux/wordsActions';
import wordsSelectors from '../router/storage/getWordsRedux/wordsSelectors';
import { generateRandomNumber, createArrayOfUniqueNumbers } from './number';
import playAudio from './audio';
import './styles.scss';
import './assets/sound.svg';

const Audition = ({ words, fetchWords }) => {
    // const [gameData, setGameData] = useState({});
    let gameConfigs = {};
    let classesOfButtons = '';
    let rightWordOnPage = '';
    let stylesForPicture = {};
    let contentOfSkipButton = 'I don`t know';
    const newGameStats = {
        numberOfChosenRightWords: 0,
        numberOfChosenWrongWords: 0,
    };
    const [gameStats, setGameStats] = useState(newGameStats);
    const [contentOnTheState, setContentOnTheState] = useState(<div>Loading</div>);
    const numberOfQuestionsOnGame = 6;
    const numberOfAnswersOnGame = 6;
    const numberWordGroups = 5;
    const numberPagesInGroup = 30;
    const numberWordsOnThePage = 20;
    let gameData = {};
    let chosenRightWord = false;
    let skipButton = {};

    const playAudioOfWord = () => {
        const currentRightIdOfWord = gameConfigs.rightAnswerOfCurrentQuestion;
        const { audio } = gameData[`answer${currentRightIdOfWord}`];
        playAudio(audio);
    };

    const checkAnswer = (event) => {
        if (classesOfButtons !== 'audition__button_disabled') {
            const chosenWord = event.target.textContent;
            const currentRightIdOfWord = gameConfigs.rightAnswerOfCurrentQuestion;
            const rightWord = gameData[`answer${currentRightIdOfWord}`].word;
            const rightWordTranslation = gameData[`answer${currentRightIdOfWord}`].wordTranslate;
            const pictureOfWord = gameData[`answer${currentRightIdOfWord}`].image;
            const stylesForPictureObject = {
                background: `url('${pictureOfWord}') center no-repeat`,
            };
            const statsArray = gameStats;
            stylesForPicture = stylesForPictureObject;
            classesOfButtons = 'audition__button_disabled';
            rightWordOnPage = `${rightWord} - ${rightWordTranslation}`;
            contentOfSkipButton = '→';
            if (chosenWord.includes(rightWordTranslation)) {
                event.target.classList.add('audition__button_right');
                statsArray.numberOfChosenRightWords += 1;
                chosenRightWord = true;
            } else {
                statsArray.numberOfChosenWrongWords += 1;
            }
            console.log(statsArray);
            setGameStats(statsArray);
            console.log(gameData);
            createNewContentOfPage(gameData);
        }
    };

    const createNewContentOfPage = (currentWordsOfLevel) => {
        const content = (
            <>
                <div
                    className="audition__question"
                    style={stylesForPicture}
                    onClick={playAudioOfWord}
                />
                <div className="audition__right-word">{rightWordOnPage}</div>
                <div className="audition__variants">
                    {Object.keys(currentWordsOfLevel).map((word, index) => {
                        let classes = classesOfButtons;
                        const rightIdWord = gameConfigs.rightAnswerOfCurrentQuestion;
                        if (rightIdWord === index && chosenRightWord) {
                            classes = `${classesOfButtons} audition__button_right`;
                        }
                        return (
                            <Button
                                size="large"
                                className={`audition__variant ${classes}`}
                                key={currentWordsOfLevel[word].word}
                                onClick={checkAnswer}
                            >
                                {`${index + 1}. ${currentWordsOfLevel[word].wordTranslate}`}
                            </Button>
                        )
                    })}
                </div>
                <Button variant="outlined" size="large" onClick={skipButton}>
                    {contentOfSkipButton}
                </Button>
            </>
        );
        setContentOnTheState(content);
    };

    const createQuestionOnGame = () => {
        const wordsData = {};
        const answersId = createArrayOfUniqueNumbers(
            numberOfAnswersOnGame,
            0,
            numberWordsOnThePage
        );
        for (let i = 0; i < answersId.length; i += 1) {
            wordsData[`answer${i}`] = words[answersId[i]];
        }
        gameConfigs.rightAnswerOfCurrentQuestion = generateRandomNumber(
            0,
            numberOfAnswersOnGame - 1
        );
        gameConfigs.questionIndex += 1;
        gameData = wordsData;
        chosenRightWord = false;
        contentOfSkipButton = 'I don`t know';
        stylesForPicture = {};
        rightWordOnPage = '';
        classesOfButtons = '';
        playAudio(wordsData[`answer${gameConfigs.rightAnswerOfCurrentQuestion}`].audio);
        createNewContentOfPage(wordsData);
    };

    skipButton = () => {
        if (contentOfSkipButton === 'I don`t know') {
            checkAnswer();
        } else {
            const numberOfQuestion = gameConfigs.questionIndex;
            if (numberOfQuestion < numberOfQuestionsOnGame) {
                createQuestionOnGame();
            } else {
                console.log('Game end');
                console.log(gameStats);
            }
        }
    }

    useEffect(() => {
        const findGroup = generateRandomNumber(0, numberWordGroups);
        const findPage = generateRandomNumber(0, numberPagesInGroup);
        fetchWords(findPage, findGroup);
    }, []);

    useEffect(() => {
        if (words.length) {
            gameConfigs = {
                questionIndex: -1,
            };
            createQuestionOnGame();
        }
    }, [words]);

    const ContentOfThePage = () => {
        return(<>{contentOnTheState}</>)
    }

    return (
        <Container maxWidth="md" className="audition">
            <ContentOfThePage />
        </Container>
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetchWords: (page, group) => {
        dispatch(wordsActions.fetchWords(page, group));
    },
});

const mapStateToProps = (state) => ({
    words: wordsSelectors.getWords(state),
});

Audition.propTypes = {
    words: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchWords: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Audition);
