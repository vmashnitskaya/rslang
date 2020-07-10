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
    const [gameData, setGameData] = useState({});
    const [gameConfigs, setGameConfigs] = useState({});
    const numberOfQuestionsOnGame = 6;
    const numberOfAnswersOnGame = 6;
    const numberWordGroups = 5;
    const numberPagesInGroup = 30;
    const numberWordsOnThePage = 20;

    const createQuestionOnGame = () => {
        const wordsData = {};
        const gameConfigsArray = gameConfigs;
        const answersId = createArrayOfUniqueNumbers(
            numberOfAnswersOnGame,
            0,
            numberWordsOnThePage
        );
        for (let i = 0; i < answersId.length; i += 1) {
            wordsData[`answer${i}`] = words[answersId[i]];
        }
        gameConfigsArray.rightAnswerOfCurrentQuestion = generateRandomNumber(
            0, numberOfAnswersOnGame - 1
        );
        setGameData(wordsData);
        setGameConfigs(gameConfigsArray);
        playAudio(wordsData[`answer${gameConfigs.rightAnswerOfCurrentQuestion}`].audio);
    };

    useEffect(() => {
        const findGroup = generateRandomNumber(0, numberWordGroups);
        const findPage = generateRandomNumber(0, numberPagesInGroup);
        fetchWords(findPage, findGroup);
    }, []);

    useEffect(() => {
        if (words.length) {
            const startConfigs = {
                questionIndex: 0,
            };
            setGameConfigs(startConfigs);
            createQuestionOnGame();
        }
    }, [words]);
    const playAudioOfWord = () => {
        const currentRightIdOfWord = gameConfigs.rightAnswerOfCurrentQuestion;
        const audio = gameData[`answer${currentRightIdOfWord}`].audio;
        playAudio(audio);
    };
    return (
        <Container maxWidth="md" className="audition">
            <div className="audition__question" onClick={playAudioOfWord}/>
            <div className="audition__variants">
                {Object.keys(gameData).map((word, index) => (
                    <Button
                        size="large"
                        className="audition__variant"
                        key={gameData[word].word}
                    >
                        {`${index + 1}. ${gameData[word].wordTranslate}`}
                    </Button>
                ))}
            </div>
            <Button variant="outlined" size="large">
                I don`t know
            </Button>
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
