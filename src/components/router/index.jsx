import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageWrapper from './pageWrapper';
import Header from '../header/index';
import LoginPage from '../loginPage/index';
import PageNotFound from './pageNotFound';
import pages from './pages';

const Router = ({ token }) => {
    return (
        <BrowserRouter basename="/">
            <main>
                {token ? (
                    <>
                        <Header pages={pages} />
                        <Switch>
                            {pages.map((e) => (
                                <Route key={e.url} exact={e.exact} path={e.url}>
                                    <PageWrapper page={e} />
                                </Route>
                            ))}
                            <Route exact path="/404" component={PageNotFound} />
                            <Route>
                                <Redirect to="/404" />
                            </Route>
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

Router.defaultProps = {
    token: null,
};

Router.propTypes = {
    token: PropTypes.string,
};

const mapStateToProps = (state) => ({
    token: state.navigation.token,
});

export default connect(mapStateToProps)(Router);
