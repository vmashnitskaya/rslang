import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from '../rootReducer';
import theme from '../theme';
import Router from './router/index';

const App = () => {
    return (
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <Router />
            </MuiThemeProvider>
        </Provider>
    );
};

export default App;
