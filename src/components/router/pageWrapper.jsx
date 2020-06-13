import React, { useEffect } from 'react';
import { pagePropType } from './pages';

function PageWrapper({ page }) {
    useEffect(() => {
        document.title = page.title;
    }, []);

    return <page.component />;
}

PageWrapper.propTypes = {
    page: pagePropType.isRequired,
};

export default PageWrapper;
