import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './storage/actions';
import selectors from './storage/selectors';

function Savannah({ words, fetchWords }) {
    useEffect(() => {
        fetchWords(false, 1, 1);
    }, []);

    console.log(words);
    return <div style={{ height: '100vh', paddingTop: '100px' }}>Savannah</div>;
}

const mapDispatchToProps = (dispatch) => ({
    fetchWords: (userWords, page, group) => {
        dispatch(actions.words.get({ userWords, page, group }));
    },
});

const mapStateToProps = (state) => ({
    words: selectors.words(state),
});

Savannah.defaultProps = {
    words: null,
};

Savannah.propTypes = {
    words: PropTypes.arrayOf({
        id: PropTypes.string.isRequired,
        word: PropTypes.string.isRequired,
        translation: PropTypes.arrayOf({
            word: PropTypes.string.isRequired,
            correct: PropTypes.bool.isRequired,
        }),
    }),
    fetchWords: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Savannah);
