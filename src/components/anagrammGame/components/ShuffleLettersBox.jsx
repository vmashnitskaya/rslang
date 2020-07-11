import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
// import { check } from 'prettier';
import Alert from '@material-ui/lab/Alert';

const _api = 'https://afternoon-falls-25894.herokuapp.com/words?page=1&group=0';
const linkImg = 'https://raw.githubusercontent.com/vmashnitskaya/rslang-data/master/data/';

export default function ShuffleLettersBox() {
    const [score, setScore] = useState(0);
    const [mistakes, setMistakes] = useState(0);

    const [turn, setTurn] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [resultVisible, setResultVisible] = useState(false);

    const [gameWordsCollection, setGameWordsCollection] = useState([]);
    const [inputWord, setInputWord] = useState('');
    const [currentShuffledWord, setCurrentShuffledWord] = useState([]);
    const [showedImage, setShowedImage] = useState('');
    const [alert, setAlert] = useState(false); //++++++

    function randomizer(number) {
        const randomIndex = Math.floor(Math.random() * (number + 1));
        return randomIndex;
    }

    function shuffleObjCollection(arrayObjects) {
        let mixArray = JSON.parse(JSON.stringify(arrayObjects));
        if (typeof arrayObjects === 'string') {
            mixArray = mixArray.split('');
        }
        for (let i = mixArray.length - 1; i >= 0; i -= 1) {
            const randomIndex = randomizer(i);
            const currentObj = mixArray[randomIndex];
            mixArray[randomIndex] = mixArray[i];
            mixArray[i] = currentObj;
        }
        if (typeof arrayObjects === 'string') {
            mixArray = mixArray.join('');
        }
        return mixArray;
    }

    // 1
    const checkWord = () => {
        if (gameWordsCollection[turn].word === inputWord) {
            setAlert(<Alert severity="success">Success</Alert>);
            return true;
        }
        setAlert(<Alert severity="error">Error</Alert>);
        return false;
    };

    // 2
    function updateScore() {
        const result = checkWord();
        if (result) {
            setScore(score + 100);
        } else {
            setMistakes(mistakes + 1);
        }
    }

    function updateWord(word) {
        const shuffleWord = shuffleObjCollection(word);
        setCurrentShuffledWord(shuffleWord);
        return shuffleWord;
    }

    // 3
    const ModalWindow = () => {
        return (
            <div>
                <Paper>Общее количество баллов: {score}</Paper>
                <Paper>Правильных ответов: {score / 100}</Paper>
                <Paper>Ошибок: {mistakes}</Paper>
            </div>
        );
    };

    // 4
    function checkEndGame(nextPlayerTurn) {
        if (nextPlayerTurn >= gameWordsCollection.length) {
            setIsStarted(false);
            setResultVisible(true);
            return true;
        }
        return false;
    }

    // 5
    function nextTurn() {
        updateScore();
        // setScore(score);
        setInputWord('');
        const nextTurnIndex = turn + 1;
        const isGameEnded = checkEndGame(nextTurnIndex);
        if (isGameEnded) {
            return;
        }
        setTurn(nextTurnIndex);
        updateWord(gameWordsCollection[nextTurnIndex].word);
        setShowedImage(gameWordsCollection[nextTurnIndex].image);
    }

    const ButtonCheck = () => {
        return (
            <IconButton
                onClick={() => {
                    nextTurn();
                }}
            >
                Дальше
            </IconButton>
        );
    };

    function setDefaultGameState() {
        setScore(0);
        setMistakes(0);
        setTurn(0);
        setGameWordsCollection([]);
        setInputWord('');
        setAlert(false);
        setCurrentShuffledWord([]);
    }

    async function startGame(url) {
        setDefaultGameState();
        setResultVisible(false);
        const response = await fetch(url);
        const wordsCollection = [];
        const responseCollection = await response.json();

        for (let i = 0; i < responseCollection.length; i += 1) {
            const collectionWords = {
                id: responseCollection[i].id,
                word: responseCollection[i].word,
                image: `${linkImg}${responseCollection[i].image.slice(6)}`,
                wordTranslate: responseCollection[i].wordTranslate,
            };
            wordsCollection.push(collectionWords);
        }

        const shuffleCollection = shuffleObjCollection(wordsCollection);
        setGameWordsCollection(shuffleCollection);
        setIsStarted(true);

        updateWord(shuffleCollection[turn].word);
        setShowedImage(shuffleCollection[turn].image);
    }

    const ButtonStartGame = () => {
        return (
            <IconButton
                onClick={() => {
                    startGame(_api);
                }}
            >
                Начать
            </IconButton>
        );
    };

    const ButtonCollection = (props) => {
        const buttonBlock = [];
        // eslint-disable-next-line
        const { word, handler } = props;
        // eslint-disable-next-line
        for (let i = 0; i < word.length; i += 1) {
            const key = 'yri';
            const currentButton = (
                <IconButton
                    key={i + key}
                    onClick={() => {
                        handler(word[i]);
                    }}
                >
                    {word[i]}
                </IconButton>
            );
            buttonBlock.push(currentButton);
        }
        return buttonBlock;
    };

    const addLetter = (letter) => {
        setInputWord(inputWord + letter);
    };

    return (
        <div>
            {!isStarted && (
                <Paper>
                    <img
                        src="https://cdn.dribbble.com/users/89254/screenshots/2712352/rate-star.gif"
                        alt=""
                    />
                    <ButtonStartGame />
                </Paper>
            )}

            {isStarted && (
                <div>
                    <Paper>
                        <img
                            src="https://cdn.dribbble.com/users/89254/screenshots/2712352/rate-star.gif"
                            alt=""
                        />
                        <span>{score}</span>
                    </Paper>
                    <Paper>{alert}</Paper>
                    <Paper>
                        <img src={showedImage} alt="" />
                    </Paper>
                    <Paper>
                        <input
                            type="text"
                            value={inputWord}
                            onChange={(el) => {
                                setInputWord(el.target.value);
                            }}
                        />
                    </Paper>
                    <Paper>
                        <ButtonCheck />
                    </Paper>
                    <Paper>
                        <ButtonCollection word={currentShuffledWord} handler={addLetter} />
                    </Paper>
                </div>
            )}
            {resultVisible && <ModalWindow />}
        </div>
    );
}
