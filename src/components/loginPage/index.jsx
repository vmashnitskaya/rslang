import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import navActions from '../router/storage/actions';

function LoginPage({ setToken }) {
    function login() {
        setToken('token');
    }
    return (
        <section>
            <p>LoginPage</p>
            <button onClick={login} type="button">
                Login
            </button>
        </section>
    );
}

const mapDispatchToProps = {
    setToken: navActions.token.set,
};

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(LoginPage);
