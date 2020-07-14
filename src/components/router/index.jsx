import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PageWrapper from './pageWrapper';
import Header from '../header/index';
import PageNotFound from './pageNotFound';
import pages from './pages';
import { getToken, getUserId } from './storage/selectors';
import Loading from './Loading';
import settingsSelectors from './storage/getSettingsRedux/settingsSelectors';
import statisticsSelectors from './storage/getPutStatisticsRedux/statisticsSelectors';
import action from './storage/actions';
import SigninPage from '../loginPage/SigninPage';
import SignupPage from '../loginPage/SignupPage';

const Router = ({ token, loading, error, settingsError, settingsLoading, auth }) => {
    const routes = pages.map((p) => ({ title: p.title, url: p.url, img: p.img }));
    const [authDone, setAuthDone] = useState(false);

    useEffect(() => {
        auth();
        setAuthDone(true);
    }, []);

    const router = (
        <Switch>
            {!token ? (
                <Route exact path="/">
                    <SigninPage className="app" />
                </Route>
            ) : null}
            {pages
                .filter((e) => !e.auth || (e.auth && token))
                .map((e) => (
                    <Route key={e.url} exact={e.exact} path={e.url}>
                        <PageWrapper page={e} routes={routes} />
                    </Route>
                ))}
            )
            {!token ? (
                <Route exact path="/sign-up">
                    <SignupPage />
                </Route>
            ) : null}
            {token ? (
                <Route exact path="/sign-up">
                    <Redirect to="/" />
                </Route>
            ) : null}
            <Route exact path="/404" component={PageNotFound} />
            <Route>
                <Redirect to="/404" />
            </Route>
        </Switch>
    );

    return (
        <BrowserRouter>
            <Header pages={pages} auth={!!token} />
            <main>
                {!authDone || loading || error || settingsError || settingsLoading ? (
                    <Loading error={error} />
                ) : (
                    router
                )}
            </main>
        </BrowserRouter>
    );
};

const mapStateToProps = (state) => ({
    token: getToken(state),
    userId: getUserId(state),
    loading: statisticsSelectors.getLoading(state),
    error: statisticsSelectors.getError(state),
    settingsError: settingsSelectors.getError(state),
    settingsLoading: settingsSelectors.getLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
    auth: () => {
        dispatch(action.user.auth());
    },
});

Router.defaultProps = {
    token: null,
};

Router.propTypes = {
    token: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    settingsError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    settingsLoading: PropTypes.bool.isRequired,
    auth: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
