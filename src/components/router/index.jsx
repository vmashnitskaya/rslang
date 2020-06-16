import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import PageWrapper from './pageWrapper';
import Header from '../header/index';
import LoginPage from '../loginPage/LoginPage';
import PageNotFound from './pageNotFound';
import pages from './pages';
import { getToken } from './storage/selectors';

const Router = () => {
    const token = useSelector(getToken);
    return (
        <BrowserRouter>
            <main>
                {token ? (
                    <>
                        <Header pages={pages} />
                        <Switch>
                            {pages.map((e) => (
                                <Route key={e.url} exact path={e.url}>
                                    <PageWrapper page={e} />
                                </Route>
                            ))}
                            <Route path="/" component={PageNotFound} />
                        </Switch>
                    </>
                ) : (
                    <Switch>
                        <Route path="/" component={LoginPage} />
                    </Switch>
                )}
            </main>
        </BrowserRouter>
    );
};

const mapStateToProps = (state) => ({
    token: state.navigation.token,
});

export default connect(mapStateToProps)(Router);
