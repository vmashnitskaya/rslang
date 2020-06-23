import React from 'react';
import { Link } from 'react-router-dom';

const StartPage = () => {
    return (
        <div className="start-page">
            <h1>EnglishPuzzle</h1>
            <p>Click on words, collect phrases.</p>
            <p>Words can be drag-n-dropped.</p>
            <p>Select hints in menu.</p>
            <Link to="/game" className="start-page__button">
                Start
            </Link>
        </div>
    );
};

export default StartPage;
