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

const ResultsPopUp = ({ open, data, onClose, onNewGame }) => {
    return (
        <Dialog open={open} onClose={onClose} disableBackdropClick disableEscapeKeyDown>
            <DialogTitle>Results</DialogTitle>
            <DialogContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" colSpan={5}>
                                Success
                                <Chip
                                    label="10"
                                    color="primary"
                                    variant="outlined"
                                    className="counter"
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(({ text, translation, pronunciation }) => (
                            <ResultCard
                                key={{ text } - { translation }}
                                text={text}
                                pronunciation={pronunciation}
                                translation={translation}
                            />
                        ))}
                    </TableBody>
                </Table>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" colSpan={6}>
                                Error
                                <Chip
                                    label="0"
                                    color="primary"
                                    variant="outlined"
                                    className="counter"
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableCell align="left" colSpan={6} />
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

ResultsPopUp.propTypes = {
    open: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            pronunciation: PropTypes.string,
            shuffled: PropTypes.shape({
                array: PropTypes.arrayOf(PropTypes.string),
                first: PropTypes.string,
                last: PropTypes.string,
            }),
            originalArray: PropTypes.arrayOf(PropTypes.string),
            guessedArray: PropTypes.arrayOf(PropTypes.string),
            wordsPerExampleSentence: PropTypes.number,
            translation: PropTypes.string,
        })
    ),
    onClose: PropTypes.func.isRequired,
    onNewGame: PropTypes.func.isRequired,
};

ResultsPopUp.defaultProps = {
    data: [],
};

export default ResultsPopUp;
