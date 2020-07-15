import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import store from '../../../rootReducer';
import useStyles from './style';
import ShuffleObjCollection from './ShuffleCollection';
import ModalWindow from './ModalWindow';
import GameNode from './GameNode';
import StartGameNode from './StartGameNode';

const linkImg = 'https://raw.githubusercontent.com/vmashnitskaya/rslang-data/master/data/';
const ShuffleLettersBox = () => {
    const classes = useStyles();

    const [isStarted, setIsStarted] = useState(false);
    const [resultVisible, setResultVisible] = useState(false);

    const [levelDifficult, setLevel] = useState(null);
    const [score, setScore] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [turn, setTurn] = useState(0);

    const [gameWordsCollection, setGameWordsCollection] = useState([]);
    const [inputWord, setInputWord] = useState('');
    const [currentShuffledWord, setCurrentShuffledWord] = useState([]);
    const [showedImage, setShowedImage] = useState('');
    const [alert, setAlert] = useState(false);
    const [wordsPerPage] = useState(20);

    function updateWord(word) {
        const shuffleWord = ShuffleObjCollection(word);
        setCurrentShuffledWord(shuffleWord);
        return shuffleWord;
    }

    const gameStates = {
        setIsStarted,
        setResultVisible,
        score,
        setScore,
        mistakes,
        setMistakes,
        turn,
        setTurn,
        inputWord,
        setInputWord,
        gameWordsCollection,
        currentShuffledWord,
        showedImage,
        setShowedImage,
        alert,
        setAlert,
        updateWord,
    };

    const globalStore = store.getState();
    const { userId, token } = globalStore.navigation.auth;

    const _url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?id=${userId}&group=${
        levelDifficult - 1
    }&wordsPerPage=${wordsPerPage}`;

    function setDefaultGameState() {
        setScore(0);
        setMistakes(0);
        setTurn(0);
        setGameWordsCollection([]);
        setInputWord('');
        setAlert(false);
        setCurrentShuffledWord([]);
    }

    function playAgainHandler() {
        setLevel(null);
        setIsStarted(false);
        setResultVisible(false);
    }

    const startGame = async (url) => {
        setDefaultGameState();
        setResultVisible(false);

        const response = await fetch(url, {
            method: 'GET',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });

        const wordsCollection = [];
        const responseJson = await response.json();
        const responseCollection = responseJson[0].paginatedResults;

        for (let i = 0; i < responseCollection.length; i += 1) {
            const { image } = responseCollection[i];
            const collectionWords = {
                id: responseCollection[i].id,
                word: responseCollection[i].word,
                image: image ? `${linkImg}${responseCollection[i].image.slice(6)}` : null,
                wordTranslate: responseCollection[i].wordTranslate,
            };
            wordsCollection.push(collectionWords);
        }

        const shuffleCollection = ShuffleObjCollection(wordsCollection);
        setGameWordsCollection(shuffleCollection);
        setIsStarted(true);

        updateWord(shuffleCollection[turn].word);
        setShowedImage(shuffleCollection[turn].image);
    };

    return (
        <div className={classes.wrapper}>
            <Card className={classes.root}>
                {!isStarted && !resultVisible && (
                    <StartGameNode
                        funcStartGame={() => {
                            startGame(_url);
                        }}
                        level={levelDifficult}
                        funcSetLevel={setLevel}
                    />
                )}
                {isStarted && <GameNode gameStates={gameStates} />}
                {resultVisible && (
                    <ModalWindow
                        score={score}
                        mistakes={mistakes}
                        funcPlayAgainHandler={playAgainHandler}
                    />
                )}
            </Card>
        </div>
    );
};

export default ShuffleLettersBox;
