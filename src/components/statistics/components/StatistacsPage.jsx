import '../styles.scss';

import React, { useMemo } from 'react';
import { Tabs, Tab, Paper } from '@material-ui/core';
import { Link, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import WordsStatistics from './WordsStatistics';
import MiniGamesStatistics from './MiniGamesStatistics';

const StatisticsPage = () => {
    const links = useMemo(
        () => [
            {
                label: 'Words Statistics',
                pathname: '/statistics/words',
            },
            {
                label: 'Mini-games Statistics',
                pathname: '/statistics/mini-games',
            },
        ],
        []
    );

    const { pathname } = useLocation();

    return (
        <Paper className="statistics_page" component="section">
            <Tabs
                value={pathname === '/statistics' ? '/statistics/words' : pathname}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                {links.map((link) => {
                    return (
                        <Tab
                            className="tab"
                            key={link.pathname}
                            value={link.pathname}
                            label={link.label}
                            component={Link}
                            to={link.pathname}
                        />
                    );
                })}
            </Tabs>
            <Switch>
                <Redirect exact from="/statistics" to="/statistics/words" />
                <Route exact path="/statistics/words">
                    <WordsStatistics />
                </Route>
                <Route exact path="/statistics/mini-games">
                    <MiniGamesStatistics />
                </Route>
                <Route>
                    <Redirect to="/404" />
                </Route>
            </Switch>
        </Paper>
    );
};

export default StatisticsPage;
