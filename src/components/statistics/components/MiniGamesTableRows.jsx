import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    makeStyles,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});
const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

function MiniGamesTableRows({ row }) {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    return (
        <>
            <TableRow className={classes.root} key={row.name}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.totalGames}</TableCell>
                <TableCell align="right">{row.correct}</TableCell>
                <TableCell align="right">{row.wrong}</TableCell>
                <TableCell align="right">{`${
                    !Number.isNaN(Math.round(row.correct / row.totalWords))
                        ? Math.round((row.correct / row.totalWords) * 100)
                        : 0
                }%`}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Total games</TableCell>
                                        <TableCell>Right answers</TableCell>
                                        <TableCell align="right">Wrong answers</TableCell>
                                        <TableCell align="right">
                                            Percent of correct answers
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.daysArr.map((e, i) => {
                                        const key = `mgtmr_${i}`;
                                        return (
                                            <TableRow key={key}>
                                                <TableCell component="th" scope="row">
                                                    {`${
                                                        monthNames[e.date.getMonth()]
                                                    } ${e.date.getDate()}`}
                                                </TableCell>
                                                <TableCell>{e.totalGames}</TableCell>
                                                <TableCell>{e.totalWords - e.wrong}</TableCell>
                                                <TableCell align="right">{e.wrong}</TableCell>
                                                <TableCell align="right">
                                                    {`${Math.round(
                                                        (e.correct / e.totalWords) * 100
                                                    )}%`}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

MiniGamesTableRows.propTypes = {
    row: PropTypes.exact({
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
    }).isRequired,
};

export default MiniGamesTableRows;
