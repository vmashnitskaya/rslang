import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageWrapper from './pageWrapper';
import Header from '../header/index';
import LoginPage from '../loginPage/index';
import PageNotFound from './pageNotFound';
import pages from './pages';

const routes = pages.map((p) => ({ title: p.title, url: p.url, img: p.img }));

const Router = ({ token }) => {
    return (
        <BrowserRouter>
            {token ? (
                <>
                    <Header pages={pages} />
                    <main>
                        <Switch>
                            {pages.map((e) => (
                                <Route key={e.url} exact path={e.url}>
                                    <PageWrapper page={e} routes={routes} />
                                </Route>
                            ))}
                            <Route path="/" component={PageNotFound} />
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
