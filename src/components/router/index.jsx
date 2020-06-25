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
    const routes = pages.map((p) => ({ title: p.title, url: p.url, img: p.img }));
    return (
        <BrowserRouter>
            {token ? (
                <>
                    <Header pages={pages} />
                    <main>
                        <Switch>
                            {pages.map((e) => (
                                <Route key={e.url} exact={e.exact} path={e.url}>
                                    <PageWrapper page={e} routes={routes} />
                                </Route>
                            ))}
                            <Route exact path="/404" component={PageNotFound} />
                            <Route>
                                <Redirect to="/404" />
                            </Route>
                        </Switch>
                    </main>
                </>
            ) : (
                <main>
                    <Switch>
                        <Route path="/" component={LoginPage} />
                    </Switch>
                </main>
            )}
        </BrowserRouter>
    );
};

const mapStateToProps = (state) => ({
    token: state.navigation.token,
});

export default connect(mapStateToProps)(Router);
