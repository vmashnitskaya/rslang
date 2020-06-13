import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageWrapper from './pageWrapper';
import Header from '../header/index';
import LoginPage from '../loginPage/index';
import PageNotFound from './pageNotFound';
import pages from './pages';

const Router = ({ token }) => {
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
