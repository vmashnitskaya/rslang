/*eslint-disable */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import wordsActions from '../router/storage/getWordsRedux/wordsActions';
import wordsSelectors from '../router/storage/getWordsRedux/wordsSelectors';
// import getWords from '../router/storage/apiGetters/getWords';
import './styles.scss';
import './assets/sound.svg';

const Audition = ({ words, fetchWords }) => {
    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    useEffect(() => {
        fetchWords(1, 1);
      }, []);
    useEffect(() => {
        if(words.length){console.log(words)}
      }, [words]);

    // const loadWords = useCallback(async (findGroup, findPage) => {
    //     await fetchWords(findGroup, findPage);
    // }, []);

    // useEffect(() => {
    //     if(words){console.log(words)}
    //   }, [words]);

    const variants = ['qwe1', 'qwe2', 'qwe3', 'qwe4', 'qwe5'];
    const [answerOfGame, setAnswerOfGame] = useState({});
    const numberOfQuestionsOnGame = 6;
    const numberOfAnswersOnGame = 6;
    const numberWordGroups = 5;
    const numberPagesInGroup = 30;
    const numberWordsOnThePage = 20;
    // const words = [];

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
    // loadWords(1, 1);
    const cons = () => {
        console.log(words);
    }
    return (
        <Container maxWidth="md" className="audition">
            <div className="audition__question" />
            <div className="audition__variants">
                {variants.map((variant, index) => (
                    <Button size="large" className="audition__variant" key={variant} onClick={cons}>
                        <span>{index + 1}. </span>
                        <span>{variant}</span>
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
