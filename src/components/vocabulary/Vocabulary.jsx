import React, { useMemo } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import TabTable from './TabTable';

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
                label: 'Deleted words',
                pathname: '/vocabulary/deleted',
            },
        ],
        []
    );

    const { pathname } = useLocation();
    const value = useMemo(() => links.findIndex((link) => pathname === link.pathname), [
        pathname,
        links,
    ]);

    return (
        <section>
            <Tabs value={value} centered>
                {links.map((link, index) => {
                    return (
                        <Tab
                            key={link.pathname}
                            value={index}
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
                    <TabTable words="learned" />
                </Route>
                <Route exact path="/vocabulary/difficult">
                    <TabTable words="difficult" />
                </Route>
                <Route exact path="/vocabulary/deleted">
                    <TabTable words="deleted" />
                </Route>
                <Route>
                    <Redirect to="/404" />
                </Route>
            </Switch>
        </section>
    );
};

export default Vocabulary;
