import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignupPage from './SignupPage';
import SigninPage from './SigninPage';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <>
                    <Route exact path="/">
                        <SigninPage className="app" />
                    </Route>
                    <Route exact path="/sign-up">
                        <SignupPage />
                    </Route>
                    <Route>Page not found</Route>
                </>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
