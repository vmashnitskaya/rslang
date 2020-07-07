/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@material-ui/core';
import actions from '../storage/actions';
import selectors from '../storage/selectors';

function StatisticsWindow() {
    return (
        <div>
            <h2>The end</h2>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({});

StatisticsWindow.defaultProps = {};

StatisticsWindow.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsWindow);
