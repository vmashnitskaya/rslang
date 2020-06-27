import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';

const Sprint = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/sprint">
                    <App className="sprint-game" />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Sprint;
