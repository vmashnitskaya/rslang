import React from 'react';
import Button from '@material-ui/core/Button';
import AcUnitSharpIcon from '@material-ui/icons/AcUnitSharp';
import AcUnitSharpIcon1 from '@material-ui/icons/AcUnitSharp';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Button variant="contained" color="primary">
                Test button!
                <AcUnitSharpIcon />
            </Button>
        </MuiThemeProvider>
    );
};

export default App;
