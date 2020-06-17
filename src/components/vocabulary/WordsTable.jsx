import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PopUp from './PopUp';
import './WordsTable.scss';
import WordRow from './WordRow';
import vocabularyActions from './redux/vocabularyActions';
import vocabularySelectors from './redux/vocabularySelectors';

const WordsTable = ({ type, words, deleteByIndex }) => {
    const [currentIndex, setCurrentIndex] = useState(null);

    const handleClose = () => {
        setCurrentIndex(null);
    };

    const handleConfirm = () => {
        deleteByIndex(currentIndex);
        setCurrentIndex(null);
    };

    const handleRestore = (index) => {
        setCurrentIndex(Number(index));
    };

    return (
        <Paper>
            <TableContainer className="words-container" component={Paper}>
                <Table className="words-table" size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Word</TableCell>
                            <TableCell align="center">Translation</TableCell>

                            {(type === 'difficult' || type === 'deleted') && (
                                <TableCell align="center" />
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {words.map(({ word, wordTranslate }, index) => (
                            <WordRow
                                key={`${word}_${index + 1}`}
                                word={word}
                                translation={wordTranslate}
                                index={index}
                                onButtonClick={
                                    type === 'difficult' || type === 'deleted'
                                        ? handleRestore
                                        : undefined
                                }
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <PopUp
                currentIndex={currentIndex}
                onPopUpClose={handleClose}
                onPopUpConfirm={handleConfirm}
            />
        </Paper>
    );
};

const mapDispatchToProps = (dispatch, { type }) => ({
    deleteByIndex: (index) => {
        dispatch(vocabularyActions.words.deleteByIndex(type, index));
    },
});

const mapStateToProps = (state, { type }) => ({
    words: vocabularySelectors.getWords(state, type),
});

WordsTable.propTypes = {
    type: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(
        PropTypes.shape({
            word: PropTypes.string.isRequired,
            wordTranslate: PropTypes.string.isRequired,
        })
    ).isRequired,
    deleteByIndex: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WordsTable);
