import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PageWrapper from './pageWrapper';
import Header from '../header/index';
import LoginPage from '../loginPage/LoginPage';
import PageNotFound from './pageNotFound';
import pages from './pages';
import { getToken, getUserId } from './storage/selectors';
import Loading from './Loading';
import settingsSelectors from './storage/getSettingsRedux/settingsSelectors';
import statisticsSelectors from './storage/getPutStatisticsRedux/statisticsSelectors';

const Router = ({ token, loading, error, settingsError, settingsLoading }) => {
    const routes = pages.map((p) => ({ title: p.title, url: p.url, img: p.img }));

    return (
        <BrowserRouter>
            {token ? (
                <>
                    <Header pages={pages} />
                    <main>
                        {loading || error || settingsError || settingsLoading ? (
                            <Loading error={error} />
                        ) : (
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
                        )}
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
    token: getToken(state),
    userId: getUserId(state),
    loading: statisticsSelectors.getLoading(state),
    error: statisticsSelectors.getError(state),
    settingsError: settingsSelectors.getError(state),
    settingsLoading: settingsSelectors.getLoading(state),
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
};

export default connect(mapStateToProps)(Router);
