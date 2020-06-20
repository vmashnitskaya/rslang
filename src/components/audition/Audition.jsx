// import React, { useState } from 'react';
import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import getWords from '../router/storage/apiGetters/getWords';
import './styles.scss';
import './assets/sound.svg';

const Audition = () => {
    // const variants = ['qwe', 'qwe', 'qwe', 'qwe', 'qwe'];
    // const [answerOfGame, setAnswerOfGame] = useState('');
    // const [answerOfGame] = useState('');
    const getWordsForGame = async () => {
        const numberWordGroups = 5;
        const numberPagesInGroup = 30;
        const numberWordsOnThePage = 20;
        const numberOfAnswersOnGame = 6;
        const words = [];

        const idGroup = Math.round(Math.random() * numberWordGroups);
        const idPageForRequest = Math.round(Math.random() * numberPagesInGroup);
        const wordsInGroup = await getWords(idPageForRequest, idGroup);

        for (let i = 0; i < numberOfAnswersOnGame; i += 1) {
            const word = {};
            const randomIdOfWord = Math.round(Math.random() * numberWordsOnThePage);
            word.word = wordsInGroup.data[randomIdOfWord].word;
            word.image = wordsInGroup.data[randomIdOfWord].image;
            word.audio = wordsInGroup.data[randomIdOfWord].audio;
            word.translation = wordsInGroup.data[randomIdOfWord].wordTranslate;
            words.push(word);
        }
        // console.log(wordsInGroup);
        return words;
    };
    const words = getWordsForGame();
    console.log(words);

    // <div className="audition__answer">{answerOfGame}</div>
    return (
        <Container maxWith="md" className="audition">
            <div className="audition__question" />
            <div className="audition__variants">
                {words.map((variant, index) => (
                    <Button size="large" className="audition__variant" key={variant}>
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

export default Audition;
