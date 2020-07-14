import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import statisticsActions from '../router/storage/getPutStatisticsRedux/statisticsActions';
import ResultCard from './ResultCard';

const ResultGame = ({ open, unGuessedWords, guessedWords, onNewGame }) => {
    const dispatch = useDispatch();
    const totalWords = unGuessedWords.length + guessedWords.length;
    useEffect(() => {
        dispatch(
            statisticsActions.updateStaticsMiniGame('sprint', totalWords, guessedWords.length)
        );
    }, [dispatch]);
    return (
        <Dialog open={open}>
            <DialogTitle>Results</DialogTitle>
            <DialogContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" colSpan={5}>
                                Success
                                <Chip
                                    label={guessedWords.length}
                                    color="primary"
                                    variant="outlined"
                                    className="counter"
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {guessedWords.map(({ word, wordTranslate, audio }) => (
                            <ResultCard
                                key={word}
                                word={word}
                                translation={wordTranslate}
                                audio={audio}
                            />
                        ))}
                    </TableBody>
                </Table>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" colSpan={5}>
                                Error
                                <Chip
                                    label={unGuessedWords.length}
                                    color="primary"
                                    variant="outlined"
                                    className="counter"
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {unGuessedWords.map(({ word, wordTranslate, audio }) => (
                            <ResultCard
                                key={word}
                                word={word}
                                translation={wordTranslate}
                                audio={audio}
                            />
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button onClick={onNewGame} color="primary" autoFocus>
                    New game
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ResultGame.propTypes = {
    open: PropTypes.bool.isRequired,
    unGuessedWords: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    guessedWords: PropTypes.arrayOf(PropTypes.string).isRequired,
    onNewGame: PropTypes.func.isRequired,
};

export default ResultGame;
