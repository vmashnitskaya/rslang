import React, { useState, useCallback } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import StartGame from './StartGame';

const Sprint = () => {
    const [started, setStart] = useState(false);
    const onStart = useCallback(() => setStart(true));
    const [complexity, setComplexity] = useState(0);
    const onComplexityChange = useCallback((c) => setComplexity(c));

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/sprint">
                    <StartGame onClose={onStart} onComplexityChange={onComplexityChange} />
                    {started && <App complexity={complexity} className="sprint-game" />}
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Sprint;
