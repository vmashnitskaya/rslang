import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function EnglishWord({ name, roundResult }) {
    const [divClass, setDivClass] = useState('question start');
    const [wordClass, setWordClass] = useState('word');
    const timeoutIdDiv = React.useRef();
    const timeoutIdWord = React.useRef();

    useEffect(() => {
        timeoutIdDiv.current = setTimeout(() => setDivClass('question fall'), 100);
        return () => {
            clearTimeout(timeoutIdDiv.current);
            clearTimeout(timeoutIdWord.current);
        };
    }, []);

    useEffect(() => {
        if (roundResult === false) {
            timeoutIdWord.current = setTimeout(() => {
                setWordClass('word fail');
                setDivClass('question start');
            }, 100);
        } else if (roundResult === true) {
            timeoutIdWord.current = setTimeout(() => {
                setWordClass('word success');
                setDivClass('question success_fall');
                timeoutIdDiv.current = setTimeout(() => {
                    setDivClass('question success_hide');
                }, 500);
            }, 100);
        }
        return () => clearTimeout(timeoutIdWord.current);
    }, [roundResult]);

    return (
        <div className={divClass}>
            <div className={wordClass}>{name}</div>
        </div>
    );
}

EnglishWord.defaultProps = {
    roundResult: null,
};

EnglishWord.propTypes = {
    name: PropTypes.string.isRequired,
    roundResult: PropTypes.bool,
};

export default EnglishWord;
