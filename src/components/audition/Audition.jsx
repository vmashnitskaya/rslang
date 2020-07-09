/*eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import wordsActions from '../router/storage/getWordsRedux/wordsActions';
import wordsSelectors from '../router/storage/getWordsRedux/wordsSelectors';
import { generateRandomNumber, createArrayOfUniqueNumbers } from './number';
import './styles.scss';
import './assets/sound.svg';

const Audition = ({ words, fetchWords }) => {
    const variants = ['qwe1', 'qwe2', 'qwe3', 'qwe4', 'qwe5'];
    const [gameData, setGameData] = useState({});
    const [gameConfigs, setGameConfigs] = useState({});
    const numberOfQuestionsOnGame = 6;
    const numberOfAnswersOnGame = 6;
    const numberWordGroups = 5;
    const numberPagesInGroup = 30;
    const numberWordsOnThePage = 20;

    const createQuestionOnGame = () => {
        const wordsData = {};
        const answersId = createArrayOfUniqueNumbers(numberOfAnswersOnGame, 0, numberWordsOnThePage);
        for (let i = 0; i < answersId.length; i += 1) {
            wordsData[`answer${i}`] = words[answersId[i]];
        };
        console.log(wordsData);
        setGameData(wordsData);
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
            }
            setGameConfigs(startConfigs);
            createQuestionOnGame();
        }
    }, [words]);

    // for (let i = 0; i < 1; i += 1) {
    //     const findGroup = generateRandomNumber(0, numberWordGroups);
    //     const findPage = generateRandomNumber(0, numberPagesInGroup);
    //     const ob = {};
    //     for (let i = 0; i < 1; i += 1) {
    //         const findWord = generateRandomNumber(0, numberWordsOnThePage);
    //         // ob[`answer${i}`] = wordsActions.fetchWords(findGroup, findPage);
    //         // console.log(ob);
    //         const response = loadWords(findPage, findGroup);
    //         ob[`answer${i}`] = response[findWord];
    //         console.log(response);
    //     }
    //     // words.push();
    // }
    const cons = () => {
        console.log(words);
    }
    return (
        <Container maxWidth="md" className="audition">
            <div className="audition__question" />
            <div className="audition__variants">
                {Object.keys(gameData).map((word, index) => (
                    <Button size="large" className="audition__variant" key={gameData[word].word} onClick={cons}>
                        <span>{index + 1}. </span>
                        <span>{gameData[word].wordTranslate}</span>
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
})

const mapStateToProps = (state) => ({
    words: wordsSelectors.getWords(state),
})

Audition.propTypes = {
    fetchWords: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Audition);
