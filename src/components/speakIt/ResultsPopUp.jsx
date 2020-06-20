import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import PopUp from './PopUp';
import ResultCard from './ResultCard';

const ResultsPopUp = ({ open, cards, guessedCards, onClose, onNewGame }) => {
    return (
        <PopUp open={open}>
            <div className="results">
                <div className="results-title">Successfull:</div>
                <div className="results-list successfull-results">
                    {cards
                        .filter((card) => guessedCards.includes(card.word))
                        .map(({ word, translation, transcription, audio }) => (
                            <ResultCard
                                key={word}
                                word={word}
                                translation={translation}
                                transcription={transcription}
                                audio={audio}
                            />
                        ))}
                </div>
                <div className="results-title">Errors:</div>
                <div className="results-list error-results">
                    {cards
                        .filter((card) => !guessedCards.includes(card.word))
                        .map(({ word, translation, transcription, audio }) => (
                            <ResultCard
                                key={word}
                                word={word}
                                translation={translation}
                                transcription={transcription}
                                audio={audio}
                            />
                        ))}
                </div>
                <div className="results-actions">
                    {guessedCards.length !== 10 && (
                        <Button className="resume-button" onClick={onClose} size="medium">
                            Resume game
                        </Button>
                    )}
                    <Button className="new-game" onClick={onNewGame} size="medium">
                        New game
                    </Button>
                </div>
            </div>
        </PopUp>
    );
};

ResultsPopUp.propTypes = {
    open: PropTypes.bool.isRequired,
    cards: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    guessedCards: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClose: PropTypes.func.isRequired,
    onNewGame: PropTypes.func.isRequired,
};

export default ResultsPopUp;
