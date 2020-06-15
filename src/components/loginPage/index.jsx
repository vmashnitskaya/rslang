import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import navActions from '../router/storage/actions';
import App from './App';
import './loginPage.scss';

function LoginPage({ setToken }) {
    function login() {
        setToken('token');
    }
    return (
        <React.StrictMode>
            <App className="app" />
            <Button color="primary" onClick={login} type="button">
                Login
            </Button>
        </React.StrictMode>
    );
}

const mapDispatchToProps = {
    setToken: navActions.token.set,
};

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(LoginPage);
