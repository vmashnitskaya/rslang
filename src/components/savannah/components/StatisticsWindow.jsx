import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Table,
    DialogTitle,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
} from '@material-ui/core';
import ResultCard from './ResultCard';
import actions from '../storage/actions';
import statisticsActions from '../../router/storage/getPutStatisticsRedux/statisticsActions';
import statisticsUtils from '../../router/storage/getPutStatisticsRedux/statisticsUtils';
import selectors from '../storage/selectors';
import utils from '../utils';

function StatisticsWindow({ results, clear, setStatistics }) {
    useEffect(() => {
        setStatistics(results.length, results.filter((e) => e.correct).length);
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = '/assets/audio/savannah/show_result.mp3';
        audio.play();
        return () => {
            clear();
        };
    }, []);
    return (
        <Dialog open onClose={clear}>
            <DialogTitle>Results</DialogTitle>
            <DialogContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" colSpan={5}>
                                Success
                                <Chip
                                    label={results.filter((e) => e.correct).length}
                                    color="primary"
                                    variant="outlined"
                                    className="counter"
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results
                            .filter((e) => e.correct)
                            .map((e) => (
                                <ResultCard
                                    key={e.word}
                                    word={e.word}
                                    translation={e.wordTranslate}
                                    audio={e.audio}
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
                                    label={results.filter((e) => !e.correct).length}
                                    color="primary"
                                    variant="outlined"
                                    className="counter"
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results
                            .filter((e) => !e.correct)
                            .map((e) => (
                                <ResultCard
                                    key={e.word}
                                    word={e.word}
                                    translation={e.wordTranslate}
                                    audio={e.audio}
                                />
                            ))}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button color="primary" autoFocus onClick={clear}>
                    New game
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const mapDispatchToProps = (dispatch) => ({
    clear: () => {
        dispatch(actions.words.clear());
        dispatch(actions.gameState.set(utils.gameState.NOT_STARTED));
        dispatch(actions.gameResults.clear());
    },
    setStatistics: (total, correct) =>
        dispatch(
            statisticsActions.updateStaticsMiniGame(
                statisticsUtils.miniGames.savannah.alias,
                total,
                correct
            )
        ),
});

const mapStateToProps = (state) => ({
    results: selectors.gameResults(state),
});

StatisticsWindow.defaultProps = {};

StatisticsWindow.propTypes = {
    results: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.string.isRequired,
            word: PropTypes.string.isRequired,
            wordTranslate: PropTypes.string.isRequired,
            audio: PropTypes.string.isRequired,
            correct: PropTypes.bool.isRequired,
        })
    ).isRequired,
    clear: PropTypes.func.isRequired,
    setStatistics: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsWindow);
