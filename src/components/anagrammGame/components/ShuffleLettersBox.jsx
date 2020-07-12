import React, { useState } from 'react';
// eslint-disable-next-line
import store from '../../../rootReducer';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FilledInput from '@material-ui/core/FilledInput';

const linkImg = 'https://raw.githubusercontent.com/vmashnitskaya/rslang-data/master/data/';

const useStyles = makeStyles({
    root: {
        maxWidth: 800,
        marginTop: 90,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        marginBottom: '5px',
    },
    media: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 350,
        height: 300,
        marginTop: 30,
    },

    button: {
        marginLeft: 'auto',
        marginRight: 'auto',

        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 13,
        paddingBottom: 13,
    },

    buttonBlock: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 13,
        paddingBottom: 13,
        marginBottom: 13,
    },
});

export default function ShuffleLettersBox() {
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

    const globalStore = store.getState();
    const { userId, token } = globalStore.navigation.auth;

    const _url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?id=${userId}&group=${
        levelDifficult - 1
    }&wordsPerPage=${wordsPerPage}`;

    function randomizer(number) {
        const randomIndex = Math.floor(Math.random() * (number + 1));
        return randomIndex;
    }

    function getLevel(event) {
        const numberLevel = event.target.innerText;
        setLevel(numberLevel);
        return numberLevel;
    }

    const LevelBlock = () => {
        const allLevels = 6;
        const arrayBuuttonsLevel = [];
        for (let i = 1; i <= allLevels; i += 1) {
            const key = 'lvlblck';
            const buttonLevel = (
                <Button key={key + i} color="secondary" size="large" onClick={getLevel}>
                    {i}
                </Button>
            );
            arrayBuuttonsLevel.push(buttonLevel);
        }
        return arrayBuuttonsLevel;
    };

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

    const checkWord = () => {
        if (gameWordsCollection[turn].word === inputWord) {
            setAlert(<Alert severity="success">Success</Alert>);
            return true;
        }
        setAlert(
            <Alert severity="error">
                Mistake! Сorrect answer &quot;{gameWordsCollection[turn].word}&quot;
            </Alert>
        );
        return false;
    };

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

    const ModalWindow = () => {
        return (
            <Typography variant="h4">
                <p>Total points: {score}</p>
                <p>Correct answers: {score / 100}</p>
                <p>Wrong answers: {mistakes}</p>
                <ButtonPlayAgain />
            </Typography>
        );
    };

    function checkEndGame(nextPlayerTurn) {
        if (nextPlayerTurn >= gameWordsCollection.length) {
            setIsStarted(false);
            setResultVisible(true);
            return true;
        }
        return false;
    }

    function nextTurn() {
        updateScore();
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
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                    nextTurn();
                }}
            >
                Next word
            </Button>
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

        const shuffleCollection = shuffleObjCollection(wordsCollection);
        setGameWordsCollection(shuffleCollection);
        setIsStarted(true);

        updateWord(shuffleCollection[turn].word);
        setShowedImage(shuffleCollection[turn].image);
    }

    const ButtonStartGame = () => {
        return (
            <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => {
                    startGame(_url);
                }}
            >
                Start the game
            </Button>
        );
    };

    function playAgainHandler() {
        setLevel(null);
        setIsStarted(false);
        setResultVisible(false);
    }

    const ButtonPlayAgain = () => {
        return (
            <Button variant="contained" size="large" color="primary" onClick={playAgainHandler}>
                Play again
            </Button>
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
                <Button
                    variant="outlined"
                    className={classes.button}
                    size="small"
                    color="primary"
                    key={i + key}
                    onClick={() => {
                        handler(word[i]);
                    }}
                >
                    {word[i]}
                </Button>
            );
            buttonBlock.push(currentButton);
        }
        return buttonBlock;
    };

    const addLetter = (letter) => {
        setInputWord(inputWord + letter);
    };

    return (
        <Card className={classes.root}>
            {!isStarted && !resultVisible && (
                <div>
                    <img
                        width="150"
                        height="110"
                        src="https://cdn.dribbble.com/users/89254/screenshots/2712352/rate-star.gif"
                        alt=""
                    />
                    <Typography variant="h4">
                        The rules of the game are simple: collect words from the letters presented
                        and get points.
                    </Typography>
                    <Typography variant="h6"> Please select a difficulty level</Typography>
                    <LevelBlock className={classes.root} />
                    {levelDifficult && (
                        <div>
                            <Typography variant="h6">
                                Level choosed: {levelDifficult}.To start the game, click start game
                            </Typography>
                            <ButtonStartGame className={classes.root} />
                        </div>
                    )}
                </div>
            )}
            {isStarted && (
                <div>
                    <Paper>
                        <img
                            width="150"
                            height="110"
                            src="https://cdn.dribbble.com/users/89254/screenshots/2712352/rate-star.gif"
                            alt=""
                        />
                        <Typography>{score}</Typography>
                    </Paper>
                    <Paper>{alert}</Paper>
                    <CardActionArea>
                        <CardMedia className={classes.media} image={showedImage} title="" />
                    </CardActionArea>
                    <Paper>
                        <CardContent>
                            <FilledInput
                                id="filled-basic"
                                label="Filled"
                                variant="filled"
                                type="text"
                                required
                                value={inputWord}
                                onChange={(el) => {
                                    setInputWord(el.target.value);
                                }}
                            />
                        </CardContent>
                        <ButtonCheck />
                    </Paper>
                    <div className={classes.buttonBlock}>
                        <ButtonCollection word={currentShuffledWord} handler={addLetter} />
                    </div>
                </div>
            )}
            {resultVisible && <ModalWindow />}
        </Card>
    );
}
