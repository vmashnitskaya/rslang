/*eslint-disable */
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
// import getWords from '../router/storage/apiGetters/getWords';
import './styles.scss';
import './assets/sound.svg';

const Audition = () => {
    const variants = ['qwe', 'qwe', 'qwe', 'qwe', 'qwe'];
    const [answerOfGame, setAnswerOfGame] = useState('');
    const numberWordGroups = 5;
    const numberPagesInGroup = 30;
    const numberWordsOnThePage = 20;
    const numberOfAnswersOnGame = 6;
    return (
        <Container maxWith="md" className="audition">
            <div className="audition__question" />
            <div className="audition__variants">
                {variants.map((variant, index) => (
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
