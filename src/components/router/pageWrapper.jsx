import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { pagePropType } from './pages';

const PageWrapper = ({ page, routes }) => {
    useEffect(() => {
        document.title = page.title;
    }, []);

    return <page.component routes={routes} />;
};

PageWrapper.propTypes = {
    page: pagePropType.isRequired,
    routes: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
            mainPage: PropTypes.bool.isRequired,
        })
    ).isRequired,
};

export default PageWrapper;
