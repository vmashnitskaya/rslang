import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[300],
        },
    },
    overrides: {
        MuiTable: {
            root: {
                tableLayout: 'fixed',
            },
        },
    },
    overrides: {
        MuiTable: {
            root: {
                tableLayout: 'fixed',
            },
        },
    },
});

export default theme;
