import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableContainer, Paper, TableCell, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PopUp from './PopUp';
import './WordsTable.scss';
import WordRow from './WordRow';
import Loading from './Loading';
import vocabularyActions from './redux/vocabularyActions';
import vocabularySelectors from './redux/vocabularySelectors';
import aggregatedWordsActions from '../router/storage/getAggregatedWordsRedux/aggregatedWordsActions';
import aggregatedWordsSelectors from '../router/storage/getAggregatedWordsRedux/aggregatedWordsSelectors';
import settingsSelectors from '../router/storage/getSettingsRedux/settingsSelectors';
import { getToken, getUserId } from '../router/storage/selectors';

const filterForDifficultWords = { 'userWord.optional.difficult': true };
const filterForLearnedWords = { 'userWord.optional.learned': true };
const filterForDeletedWords = {
    $or: [
        {
            'userWord.optional.deleted': true,
        },

        {
            'userWord.optional.easy': true,
        },
    ],
};

const WordsTable = ({
    type,
    words,
    updateUserWord,
    loading,
    error,
    fetchAggregatedWords,
    aggregatedWords,
    setWords,
    userId,
    token,
    settings,
}) => {
    const [currentIndex, setCurrentIndex] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        setWords([]);
        setIsButtonDisabled(false);
        if (type === 'learned') {
            fetchAggregatedWords(userId, token, 500, filterForLearnedWords);
        } else if (type === 'difficult') {
            fetchAggregatedWords(userId, token, 500, filterForDifficultWords);
        } else {
            fetchAggregatedWords(userId, token, 500, filterForDeletedWords);
        }
    }, [type]);

    useEffect(() => {
        if (aggregatedWords === null) {
            setWords([]);
        } else {
            setWords(aggregatedWords);
        }
    }, [aggregatedWords]);

    const handleClose = () => {
        setCurrentIndex(null);
    };

    const handleConfirm = () => {
        setIsButtonDisabled(currentIndex);
        updateUserWord(currentIndex, type);
        setCurrentIndex(null);
    };

    const handleRestore = (element) => {
        setCurrentIndex(element);
    };

    return loading || error ? (
        <Loading error={error} />
    ) : (
        <Paper>
            <TableContainer className="words-container" component={Paper}>
                <Table className="words-table" size="small" aria-label="a dense table">
                    <TableBody>
                        {words.length ? (
                            words.map((element, index) => (
                                <WordRow
                                    key={`${element.word}_${index + 1}`}
                                    element={element}
                                    index={index}
                                    settings={settings}
                                    isButtonDisabled={isButtonDisabled._id === element._id}
                                    onButtonClick={
                                        type === 'difficult' || type === 'deleted'
                                            ? handleRestore
                                            : undefined
                                    }
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell align="center">No words to display</TableCell>
                            </TableRow>
                        )}
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

const mapDispatchToProps = (dispatch) => ({
    updateUserWord: (word, type) => {
        dispatch(vocabularyActions.updateUserWord(word, type));
    },
    fetchAggregatedWords: (userId, token, wordsPerDay, filter) => {
        dispatch(aggregatedWordsActions.fetchAggregatedWords(userId, token, wordsPerDay, filter));
    },
    setWords: (words) => {
        dispatch(vocabularyActions.wordsActions.set(words));
    },
});

const mapStateToProps = (state) => ({
    words: vocabularySelectors.getWords(state),
    aggregatedWords: aggregatedWordsSelectors.getAggregatedWords(state),
    loading: aggregatedWordsSelectors.getLoading(state),
    error: aggregatedWordsSelectors.getError(state),
    userId: getUserId(state),
    token: getToken(state),
    settings: settingsSelectors.getSettings(state),
});

WordsTable.propTypes = {
    type: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            word: PropTypes.string,
            audio: PropTypes.string,
            image: PropTypes.string,
            transcription: PropTypes.string,
            wordTranslate: PropTypes.string,
            userWord: PropTypes.shape({
                difficulty: PropTypes.string,
                optional: PropTypes.shape({
                    learned: PropTypes.bool,
                    difficult: PropTypes.bool,
                    deleted: PropTypes.bool,
                    repeat: PropTypes.bool,
                }),
            }),
        })
    ).isRequired,
    updateUserWord: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAggregatedWords: PropTypes.func.isRequired,
    aggregatedWords: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            word: PropTypes.string,
            audio: PropTypes.string,
            image: PropTypes.string,
            transcription: PropTypes.string,
            wordTranslate: PropTypes.string,
            userWord: PropTypes.shape({
                difficulty: PropTypes.string,
                optional: PropTypes.shape({
                    learned: PropTypes.bool,
                    difficult: PropTypes.bool,
                    deleted: PropTypes.bool,
                    repeat: PropTypes.bool,
                }),
            }),
        })
    ).isRequired,
    userId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    setWords: PropTypes.func.isRequired,
    settings: PropTypes.shape({
        wordsPerDay: PropTypes.number,
        optional: PropTypes.objectOf(PropTypes.bool),
    }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WordsTable);
