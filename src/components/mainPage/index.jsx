import React from 'react';
import Button from '@material-ui/core/Button';
import AcUnitSharpIcon from '@material-ui/icons/AcUnitSharp';

export default function MainPage() {
    return (
        <section>
            <p>Main Page</p>
            <Button variant="contained" color="primary">
                Test button!
                <AcUnitSharpIcon />
            </Button>
        </section>
    );
}
