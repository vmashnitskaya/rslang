import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <section>
            <p>Page Not Found</p>
            <Link to="/">Home</Link>
        </section>
    );
}
