import './style.scss';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
