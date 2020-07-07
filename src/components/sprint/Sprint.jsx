import React, { useState, useCallback } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import StartGame from './StartGame';

const Sprint = () => {
    const [started, setStart] = useState(false);
    const onStart = useCallback(() => setStart(true));

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/sprint">
                    <StartGame onClose={onStart} />
                    {started && <App className="sprint-game" />}
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Sprint;
