import '../styles.scss';

import React, { useMemo, useState } from 'react';
import { Tabs, Tab, Paper } from '@material-ui/core';
import WordsStatistics from './WordsStatistics';
import MiniGamesStatistics from './MiniGamesStatistics';

const StatisticsPage = () => {
    const links = useMemo(
        () => [
            {
                label: 'Words Statistics',
                pathname: 'words',
            },
            {
                label: 'Mini-games Statistics',
                pathname: 'mini-games',
            },
        ],
        []
    );
    const [page, setPage] = useState('words');

    return (
        <Paper className="statistics_page" component="section">
            <Tabs value={page} indicatorColor="primary" textColor="primary" variant="fullWidth">
                {links.map((link) => {
                    return (
                        <Tab
                            key={`tab_${link.pathname}`}
                            value={link.pathname}
                            label={link.label}
                            onClick={() => setPage(link.pathname)}
                        />
                    );
                })}
            </Tabs>
            {page === 'words' ? <WordsStatistics /> : <MiniGamesStatistics />}
        </Paper>
    );
};

export default StatisticsPage;
