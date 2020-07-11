import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
    <section>
        <p>Page Not Found</p>
        <Link to="/">Home</Link>
    </section>
);

export default PageNotFound;
