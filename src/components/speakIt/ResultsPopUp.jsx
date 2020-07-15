import React from 'react';
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
import ResultCard from './ResultCard';
import './ResultsPopUp.scss';

const ResultsPopUp = ({ open, cards, guessedWords, onClose, onNewGame }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Results</DialogTitle>
            <DialogContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" colSpan={5}>
                                Success
                                <Chip
                                    label={
                                        cards.filter((card) => guessedWords.includes(card.word))
                                            .length
                                    }
                                    color="primary"
                                    variant="outlined"
                                    className="counter"
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards
                            .filter((card) => guessedWords.includes(card.word))
                            .map(({ word, translation, audio }) => (
                                <ResultCard
                                    key={word}
                                    word={word}
                                    translation={translation}
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
                                    label={
                                        cards.filter((card) => !guessedWords.includes(card.word))
                                            .length
                                    }
                                    color="primary"
                                    variant="outlined"
                                    className="counter"
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards
                            .filter((card) => !guessedWords.includes(card.word))
                            .map(({ word, translation, transcription, audio }) => (
                                <ResultCard
                                    key={word}
                                    word={word}
                                    translation={translation}
                                    transcription={transcription}
                                    audio={audio}
                                />
                            ))}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Resume game
                </Button>
                <Button onClick={onNewGame} color="primary" autoFocus>
                    New game
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ResultsPopUp.propTypes = {
    open: PropTypes.bool.isRequired,
    cards: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    guessedWords: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClose: PropTypes.func.isRequired,
    onNewGame: PropTypes.func.isRequired,
};

export default ResultsPopUp;
