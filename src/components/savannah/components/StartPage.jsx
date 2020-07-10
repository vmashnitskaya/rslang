import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@material-ui/core';
import actions from '../storage/actions';
import selectors from '../storage/selectors';

function StartPage({ settings, userHaveWords, fetchWords, setGroup, setUserWords }) {
    const buttons = [];
    for (let i = 0; i < 6; i += 1) {
        buttons.push(
            <Button
                onClick={() => setGroup(i)}
                key={`groupbtn_${i}`}
                variant={i === settings.group ? 'contained' : 'outlined'}
            >
                {i + 1}
            </Button>
        );
    }

    return (
        <div className="start_page">
            <div className="level">
                {userHaveWords ? (
                    <>
                        <div>
                            <p>You have enough words to repeat</p>
                            <Button
                                onClick={() => setUserWords()}
                                color="primary"
                                aria-label="contained primary button group"
                                variant={settings.userWords ? 'contained' : 'outlined'}
                            >
                                My Words
                            </Button>
                        </div>
                        <p>or</p>
                    </>
                ) : null}

                <div>
                    <p>You can choose your level</p>
                    <ButtonGroup
                        variant="outlined"
                        color="primary"
                        aria-label="contained primary button group"
                    >
                        {buttons.map((e) => e)};
                    </ButtonGroup>
                </div>
            </div>
            <h2>SAVANNAH</h2>
            <Button
                onClick={() => fetchWords(settings.userWords, settings.group)}
                color="primary"
                aria-label="contained primary button group"
                variant="contained"
                className="start_btn"
            >
                Start Game
            </Button>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    fetchWords: (userWords, group) => {
        dispatch(actions.words.get({ userWords, group }));
    },
    setGroup: (payload) => {
        dispatch(actions.gameSettings.setGroup(payload));
    },
    setUserWords: () => {
        dispatch(actions.gameSettings.setUserWords());
    },
});

const mapStateToProps = (state) => ({
    settings: selectors.gameSettings(state),
    userHaveWords: selectors.userHaveWords(state),
});

StartPage.propTypes = {
    settings: PropTypes.exact({
        userWords: PropTypes.bool.isRequired,
        group: PropTypes.number.isRequired,
    }).isRequired,
    userHaveWords: PropTypes.bool.isRequired,
    fetchWords: PropTypes.func.isRequired,
    setGroup: PropTypes.func.isRequired,
    setUserWords: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
