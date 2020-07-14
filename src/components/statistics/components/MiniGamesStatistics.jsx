import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';
import MiniGamesTableRows from './MiniGamesTableRows';
import selectors from '../selectors';

function MiniGamesStatistics({ data }) {
    return (
        <div>
            {data.length === 0 ? (
                <p>You didn&lsquo;t play yet</p>
            ) : (
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Game</TableCell>
                                <TableCell align="right">Total Games</TableCell>
                                <TableCell align="right">Right answers</TableCell>
                                <TableCell align="right">Wrong answers</TableCell>
                                <TableCell align="right">Percent of correct answers</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <MiniGamesTableRows key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    data: selectors.miniGameStats(state),
});

MiniGamesStatistics.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.exact({
            name: PropTypes.string.isRequired,
            totalGames: PropTypes.number.isRequired,
            totalWords: PropTypes.number.isRequired,
            correct: PropTypes.number.isRequired,
            wrong: PropTypes.number.isRequired,
            daysArr: PropTypes.arrayOf(
                PropTypes.exact({
                    date: PropTypes.instanceOf(Date).isRequired,
                    correct: PropTypes.number.isRequired,
                    totalWords: PropTypes.number.isRequired,
                    totalGames: PropTypes.number.isRequired,
                    wrong: PropTypes.number.isRequired,
                    games: PropTypes.arrayOf(
                        PropTypes.exact({
                            date: PropTypes.instanceOf(Date).isRequired,
                            correct: PropTypes.number.isRequired,
                            totalWords: PropTypes.number.isRequired,
                            wrong: PropTypes.number.isRequired,
                        })
                    ),
                })
            ),
        })
    ).isRequired,
};

export default connect(mapStateToProps)(MiniGamesStatistics);
