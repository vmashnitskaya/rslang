import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './CardList.scss';

const CardsList = ({ cards, selectedCard, gameStarted, onCardSelected, guessedWords }) => {
    const handeCardSelected = (card) => {
        if (gameStarted) onCardSelected(card);
    };
    return (
        <div className="cards">
            {cards.map((card) => (
                <Card
                    key={card.word}
                    card={card}
                    onCardSelected={handeCardSelected}
                    isSelected={
                        !gameStarted && selectedCard ? card.word === selectedCard.word : false
                    }
                    isGuessed={guessedWords.includes(card.word)}
                />
            ))}
        </div>
    );
};

CardsList.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            word: PropTypes.string.isRequired,
            transcription: PropTypes.string.isRequired,
            audio: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedCard: PropTypes.shape({
        word: PropTypes.string.isRequired,
        transcription: PropTypes.string.isRequired,
        audio: PropTypes.string.isRequired,
    }),
    gameStarted: PropTypes.bool.isRequired,
    guessedWords: PropTypes.arrayOf(PropTypes.string).isRequired,
    onCardSelected: PropTypes.func.isRequired,
};

CardsList.defaultProps = {
    selectedCard: {},
};

export default CardsList;
