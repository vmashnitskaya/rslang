import React, { useMemo } from 'react';
import { Tabs, Tab, Paper } from '@material-ui/core';
import { Link, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import WordsTable from './WordsTable';
import './Vocabulary.scss';

const Vocabulary = () => {
    const links = useMemo(
        () => [
            {
                label: 'Learned words',
                pathname: '/vocabulary/learned',
            },
            {
                label: 'Difficult words',
                pathname: '/vocabulary/difficult',
            },
            {
                label: 'Easy & Deleted words',
                pathname: '/vocabulary/deleted',
            },
        ],
        []
    );

    const { pathname } = useLocation();

    return (
        <Paper className="vocabulary-container" component="section">
            <Tabs
                value={pathname === '/vocabulary' ? '/vocabulary/learned' : pathname}
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
                <Redirect exact from="/vocabulary" to="/vocabulary/learned" />
                <Route exact path="/vocabulary/learned">
                    <WordsTable type="learned" />
                </Route>
                <Route exact path="/vocabulary/difficult">
                    <WordsTable type="difficult" />
                </Route>
                <Route exact path="/vocabulary/deleted">
                    <WordsTable type="deleted" />
                </Route>
                <Route>
                    <Redirect to="/404" />
                </Route>
            </Switch>
        </Paper>
    );
};

export default Vocabulary;
