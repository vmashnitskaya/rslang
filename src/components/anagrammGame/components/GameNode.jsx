import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FilledInput from '@material-ui/core/FilledInput';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import ButtonCheck from './ButtonCheck';
import useStyles from './style';

const GameNode = ({ gameStates }) => {
    const classes = useStyles();
    const {
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
    } = gameStates;

    const addLetter = (letter) => {
        setInputWord(inputWord + letter);
    };

    function checkEndGame(nextPlayerTurn) {
        if (nextPlayerTurn >= gameWordsCollection.length) {
            setIsStarted(false);
            setResultVisible(true);
            return true;
        }
        return false;
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

    const ButtonCollection = ({ word, handler }) => {
        const buttonBlock = [];
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

    return (
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
                <ButtonCheck funcNextTurn={nextTurn} />
            </Paper>
            <div className={classes.buttonBlock}>
                <ButtonCollection word={currentShuffledWord} handler={addLetter} />
            </div>
        </div>
    );
};

GameNode.propTypes = {
    gameStates: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.bool,
            PropTypes.array,
            PropTypes.string,
            PropTypes.func,
            PropTypes.object,
        ])
    ).isRequired,
};

export default GameNode;
