import { createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: lightBlue[700],
        },
        darken: {
            main: lightBlue[900],
        },
    },
});

export default theme;
