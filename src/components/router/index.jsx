import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { connect } from 'react-redux';
// components
import PageWrapper from './pageWrapper';
import Header from '../header/index';
import LoginPage from '../loginPage/index';
import pages from './pages';

const Router = () => {
    // eslint-disable-next-line no-unused-vars
    const [hasToken, setHasToken] = useState('token');

    return (
        <BrowserRouter>
            <main>
                <Header pages={pages} />
                {hasToken ? (
                    <Switch>
                        {pages.map((e) => (
                            <Route key={e.url} exact={e.root} path={e.url}>
                                <PageWrapper page={e} />
                            </Route>
                        ))}
                    </Switch>
                ) : (
                    <Switch>
                        <Route path="/" component={LoginPage} />
                    </Switch>
                )}
            </main>
        </BrowserRouter>
    );
};

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(index);

export default Router;
