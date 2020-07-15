import React, { useMemo, useState } from 'react';
import { Tabs, Tab, Paper } from '@material-ui/core';
import WordsTable from './WordsTable';
import './Vocabulary.scss';

const Vocabulary = () => {
    const links = useMemo(
        () => [
            {
                label: 'Learned words',
                pathname: 'learned',
            },
            {
                label: 'Difficult words',
                pathname: 'difficult',
            },
            {
                label: 'Easy & Deleted words',
                pathname: 'deleted',
            },
        ],
        []
    );

    const [type, setType] = useState('learned');

    return (
        <Paper className="vocabulary-container" component="section">
            <Tabs value={type} indicatorColor="primary" textColor="primary" variant="fullWidth">
                {links.map((link) => {
                    return (
                        <Tab
                            className="tab"
                            key={link.pathname}
                            value={link.pathname}
                            label={link.label}
                            onClick={() => setType(link.pathname)}
                        />
                    );
                })}
            </Tabs>
            <WordsTable type={type} />
        </Paper>
    );
};

export default Vocabulary;
