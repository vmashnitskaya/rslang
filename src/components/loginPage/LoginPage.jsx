import React from 'react';
import { connect } from 'react-redux';
import navActions from '../router/storage/actions';
import App from './App';
import './loginPage.scss';

function LoginPage() {
    return (
        <React.StrictMode>
            <App className="app" />
        </React.StrictMode>
    );
}

const mapDispatchToProps = {
    setToken: navActions.token.set,
};

export default connect(null, mapDispatchToProps)(LoginPage);
